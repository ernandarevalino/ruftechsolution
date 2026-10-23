import { Children, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from 'react';

/**
 * Memecah teks judul menjadi <span class="w"> per kata (dirender di server),
 * dipakai untuk animasi judul yang menyala kata per kata.
 * keepEm: elemen <em> diperlakukan sebagai satu "kata".
 */
export function splitWords(children: ReactNode, keepEm = false): ReactNode {
  let n = 0;
  const walk = (node: ReactNode): ReactNode =>
    Children.map(node, (c) => {
      if (typeof c === 'string' || typeof c === 'number') {
        return String(c).split(/(\s+)/).filter(Boolean).map((p, k) =>
          /^\s+$/.test(p) ? p : <span key={k} className="w" style={{ '--i': n++ } as CSSProperties}>{p}</span>,
        );
      }
      if (isValidElement(c)) {
        const el = c as ReactElement<{ className?: string; style?: CSSProperties; children?: ReactNode }>;
        if (keepEm && el.type === 'em') {
          return cloneElement(el, {
            className: [el.props.className, 'w'].filter(Boolean).join(' '),
            style: { ...el.props.style, '--i': n++ } as CSSProperties,
          });
        }
        return cloneElement(el, {}, walk(el.props.children));
      }
      return c;
    });
  return walk(children);
}
