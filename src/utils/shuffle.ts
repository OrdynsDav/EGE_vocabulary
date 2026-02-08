import { CardProps } from "@/interfaces";

/**
 * Возвращает случайное слово из массива.
 * Если передан exclude — не возвращает его (чтобы не было повторов подряд).
 */
export function shuffle(array: CardProps[], exclude?: CardProps): CardProps {
  const pool =
    exclude && array.length > 1
      ? array.filter(
          (w) =>
            w.accent !== exclude.accent || w.stress_index !== exclude.stress_index
        )
      : [...array];

  if (pool.length === 0) return array[0];
  return pool[Math.floor(Math.random() * pool.length)];
}
