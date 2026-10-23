import type { Mockup as Jenis, Warna } from '@/lib/content';
import Mockup from './Mockup';
import Tilt from './Tilt';
import './Device.css';

interface Props { cover?: string; mockup?: Jenis; warna?: Warna | string; alt?: string; judul?: string; tilt?: boolean }

/** Laptop berisi screenshot asli, atau mockup bawaan kalau screenshot belum ada. */
export default function Device({ cover, mockup = 'umum', warna = 'biru', alt = '', judul, tilt = true }: Props) {
  const cls = ['c-device', 'stage', `t-${warna}`, tilt && 'tilt'].filter(Boolean).join(' ');
  const isi = (
    <div className="laptop">
      <div className="lid">
        {cover ? <img className="shot" src={cover} alt={alt} loading="lazy" /> : <Mockup jenis={mockup} judul={judul} />}
      </div>
      <div className="base"></div>
    </div>
  );
  return tilt ? <Tilt className={cls}>{isi}</Tilt> : <div className={cls}>{isi}</div>;
}
