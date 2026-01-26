import { CardProps } from "@/interfaces";
import { formatAccent } from "@/utils/format-accent";

export function Card({ accent, meaning }: CardProps) {
    const formattedAccend = formatAccent(accent);
    return (
        <div className="flex flex-col h-full">
            <h2 className="card__title mb-5">{formattedAccend}</h2>
            <p className="text-sm text-gray-600 mt-auto">{meaning.toLocaleLowerCase()}</p>
        </div>
    )
}