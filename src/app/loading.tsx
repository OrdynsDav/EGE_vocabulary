import { BookLoader } from "@/components/Loaders/BookLoader/BookLoader";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <BookLoader />
    </div>
  );
}

