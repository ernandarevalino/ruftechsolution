import type { ReactNode } from 'react';
import { splitWords } from '@/lib/split';

/** Judul yang menyala kata per kata saat di-scroll (lihat Effects.tsx). */
export default function Rv({ as: Tag = 'h2', className, children }: { as?: 'h1' | 'h2' | 'h3'; className?: string; children: ReactNode }) {
  return <Tag className={['rv', className].filter(Boolean).join(' ')}>{splitWords(children)}</Tag>;
}
