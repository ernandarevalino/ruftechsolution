/**
 * Pembaca konten Markdown (hanya berjalan saat build, di server).
 * Empat jenis konten yang bisa ditambah lewat panel admin (/admin):
 * - karya     : studi kasus klien   -> src/content/karya/*.md
 * - produk    : produk siap pakai   -> src/content/produk/*.md
 * - artikel   : blog / artikel      -> src/content/artikel/*.md
 * - testimoni : testimoni klien     -> src/content/testimoni/*.md
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

const ROOT = path.join(process.cwd(), 'src', 'content');

export type Mockup = 'meja' | 'titip' | 'piutang' | 'kasir' | 'laporan' | 'distribusi' | 'umum';
export type Warna = 'hijau' | 'cokelat' | 'biru' | 'magenta' | 'emas' | 'zaitun';
const MOCKUP: Mockup[] = ['meja', 'titip', 'piutang', 'kasir', 'laporan', 'distribusi', 'umum'];
const WARNA: Warna[] = ['hijau', 'cokelat', 'biru', 'magenta', 'emas', 'zaitun'];

export interface Karya {
  id: string; body: string;
  title: string; industri: string; ringkasan: string; modul: string[];
  platform?: string; pengguna?: string; cover?: string;
  mockup: Mockup; warna: Warna; galeri: string[]; unggulan: boolean; urutan: number;
}
export interface Produk {
  id: string; body: string;
  title: string; tagline: string; untuk: string; harga: string; catatanHarga?: string;
  fitur: string[]; status: 'Tersedia' | 'Segera hadir'; cover?: string;
  mockup: Mockup; warna: Warna; urutan: number;
}
export interface Artikel {
  id: string; body: string;
  title: string; deskripsi: string; tanggal: Date; kategori: string;
  cover?: string; penulis: string; draft: boolean;
}
export interface Testimoni {
  id: string;
  nama: string; usaha: string; kutipan: string; foto?: string; bukti?: string;
  karya?: string; tampil: boolean; urutan: number;
}

type Raw = Record<string, unknown>;
const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v : undefined);
const req = (v: unknown, field: string, file: string) => {
  if (v === undefined || v === null || v === '') throw new Error(`Kolom "${field}" wajib diisi di ${file}`);
  return String(v);
};
const list = (v: unknown) => (Array.isArray(v) ? v.map(String).filter(Boolean) : []);
const num = (v: unknown, d: number) => (typeof v === 'number' ? v : v !== undefined && v !== '' && !isNaN(Number(v)) ? Number(v) : d);
const bool = (v: unknown, d: boolean) => (typeof v === 'boolean' ? v : d);
const pick = <T extends string>(v: unknown, opts: T[], d: T) => (opts.includes(v as T) ? (v as T) : d);

function read(folder: string): { id: string; file: string; data: Raw; body: string }[] {
  const dir = path.join(ROOT, folder);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
      return { id: f.replace(/\.md$/, '').toLowerCase(), file: `${folder}/${f}`, data, body: content };
    });
}

const byUrutan = <T extends { urutan: number }>(a: T, b: T) => a.urutan - b.urutan;

export function getKarya(): Karya[] {
  return read('karya').map(({ id, file, data: d, body }) => ({
    id, body,
    title: req(d.title, 'title', file),
    industri: req(d.industri, 'industri', file),
    ringkasan: req(d.ringkasan, 'ringkasan', file),
    modul: list(d.modul),
    platform: str(d.platform), pengguna: str(d.pengguna), cover: str(d.cover),
    mockup: pick(d.mockup, MOCKUP, 'umum'),
    warna: pick(d.warna, WARNA, 'biru'),
    galeri: list(d.galeri),
    unggulan: bool(d.unggulan, true),
    urutan: num(d.urutan, 99),
  })).sort(byUrutan);
}

export function getProduk(): Produk[] {
  return read('produk').map(({ id, file, data: d, body }) => ({
    id, body,
    title: req(d.title, 'title', file),
    tagline: req(d.tagline, 'tagline', file),
    untuk: req(d.untuk, 'untuk', file),
    harga: req(d.harga, 'harga', file),
    catatanHarga: str(d.catatanHarga),
    fitur: list(d.fitur),
    status: pick(d.status, ['Tersedia', 'Segera hadir'], 'Tersedia'),
    cover: str(d.cover),
    mockup: pick(d.mockup, MOCKUP, 'kasir'),
    warna: pick(d.warna, WARNA, 'biru'),
    urutan: num(d.urutan, 99),
  })).sort(byUrutan);
}

/** Artikel yang sudah terbit (bukan draft), terbaru lebih dulu. */
export function getArtikel(): Artikel[] {
  return read('artikel').map(({ id, file, data: d, body }) => {
    const tanggal = d.tanggal instanceof Date ? d.tanggal : new Date(req(d.tanggal, 'tanggal', file));
    if (isNaN(+tanggal)) throw new Error(`Tanggal tidak valid di ${file}`);
    return {
      id, body,
      title: req(d.title, 'title', file),
      deskripsi: req(d.deskripsi, 'deskripsi', file),
      tanggal,
      kategori: str(d.kategori) || 'Tips UMKM',
      cover: str(d.cover),
      penulis: str(d.penulis) || 'Tim Ruftech',
      draft: bool(d.draft, false),
    };
  }).filter((a) => !a.draft).sort((a, b) => +b.tanggal - +a.tanggal);
}

/** Testimoni yang ditampilkan. `karya` (opsional): hanya untuk karya tertentu. */
export function getTestimoni(karya?: string): Testimoni[] {
  return read('testimoni').map(({ id, file, data: d }) => ({
    id,
    nama: req(d.nama, 'nama', file),
    usaha: req(d.usaha, 'usaha', file),
    kutipan: req(d.kutipan, 'kutipan', file),
    foto: str(d.foto), bukti: str(d.bukti), karya: str(d.karya),
    tampil: bool(d.tampil, true),
    urutan: num(d.urutan, 99),
  })).filter((t) => t.tampil && (!karya || t.karya === karya)).sort(byUrutan);
}

export interface Heading { depth: number; slug: string; text: string }

/** Markdown -> HTML, plus daftar subjudul untuk daftar isi. */
export async function renderMarkdown(md: string): Promise<{ html: string; headings: Heading[] }> {
  const headings: Heading[] = [];
  type HNode = { type: string; tagName?: string; value?: string; properties?: { id?: string }; children?: HNode[] };
  const text = (n: HNode): string => (n.type === 'text' ? n.value || '' : (n.children || []).map(text).join(''));
  const collect = () => (tree: HNode) => {
    const walk = (n: HNode) => {
      if (n.type === 'element' && /^h[1-6]$/.test(n.tagName || '')) {
        headings.push({ depth: Number(n.tagName!.slice(1)), slug: String(n.properties?.id || ''), text: text(n) });
      }
      (n.children || []).forEach(walk);
    };
    walk(tree);
  };
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkSmartypants)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(collect)
    .use(rehypeStringify)
    .process(md);
  return { html: String(file), headings };
}
