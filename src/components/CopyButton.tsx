'use client';
import { useState } from 'react';

export default function CopyButton({ text, label, className }: { text: string; label: string; className?: string }) {
  const [done, setDone] = useState(false);
  const copy = () => {
    try {
      navigator.clipboard.writeText(text).then(() => { setDone(true); setTimeout(() => setDone(false), 1800); }, () => {});
    } catch { /* abaikan */ }
  };
  return <button className={className} type="button" onClick={copy}>{done ? 'Tersalin' : label}</button>;
}
