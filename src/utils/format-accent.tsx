import { ReactNode } from 'react';

export function formatAccent(accent: string): ReactNode {
  const match = accent.match(/[A-ZА-ЯЁ]/);
  if (!match) return accent;

  const idx = accent.indexOf(match[0]);
  const upperLetter = match[0];
  const lowerLetter = upperLetter.toLowerCase();
  const accentedLetter = lowerLetter + '\u0301'; // e.g. а + ◌́ = а́

  const before = accent.slice(0, idx);
  const after = accent.slice(idx + 1);

  return (
    <>
      {before}
      <span className="text-blue-500 font-bold decoration-cyan-500 underline-offset-2 decoration-[1.5px] underline uppercase">{accentedLetter}</span>
      {after}
    </>
  );
}