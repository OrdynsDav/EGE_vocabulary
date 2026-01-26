"use client";

import { CardProps } from "@/interfaces";
import { Card } from "../Card/Card";
import { fetchWords } from "@/api/fetches";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "../LanguageProvider/LanguageProvider";
import { LoaderDots } from "../Loaders/Dots";

export function CardList() {
  const { language } = useLanguage();
  const [data, setData] = useState<CardProps[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);

  const loader = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!language) return;

    setLoading(true);
    setVisibleCount(4);
    setData([]);

    fetchWords(language)
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((err) => {
        console.error("Error fetching words:", err);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [language]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !fetchingMore &&
          visibleCount < data.length
        ) {
          setFetchingMore(true);

          setTimeout(() => {
            setVisibleCount((prev) => {
              const next = prev + 4;
              return next > data.length ? data.length : next;
            });
            setFetchingMore(false);
          }, 300);
        }
      },
      { threshold: 0.1 },
    );

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [data, visibleCount, fetchingMore]);

  if (loading) {
    return (
      <div className="flex justify-center items-center-safe">
        <LoaderDots />
      </div>
    );
  }

  return (
    <ul className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data.slice(0, visibleCount).map((card, index) => (
        <li key={index} className="card">
          <Card accent={card.accent} meaning={card.meaning} />
        </li>
      ))}

      {visibleCount < data.length && (
        <li
          ref={loader}
          className="text-center col-span-full text-gray-500 py-4"
        >
          <div className="flex justify-center items-center-safe">
            <LoaderDots />
          </div>
          ;
        </li>
      )}
    </ul>
  );
}
