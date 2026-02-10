import { Header } from "@/components/Header/Header";
import { RootProviders } from "@/components/Providers/RootProviders";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Справочник по ЕГЭ</title>
        {/* SEO meta tags */}
        <meta
          name="description"
          content="Справочник по ЕГЭ — словарь терминов, примеров и кратких объяснений для подготовки к Единому государственному экзамену."
        />
        <meta
          name="keywords"
          content="ЕГЭ, словарь ЕГЭ, подготовка к ЕГЭ, термины, справочник, экзамен"
        />
        <meta name="author" content="Название автора или команды" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ege-vocabulary.vercel.app" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Справочник по ЕГЭ — словарь и материалы для подготовки"
        />
        <meta
          property="og:description"
          content="Быстрый и удобный справочник терминов и примеров для подготовки к ЕГЭ. Наглядные объяснения, примеры и советы."
        />
        <meta property="og:url" content="https://ege-vocabulary.vercel.app" />
        <meta property="og:site_name" content="Справочник по ЕГЭ" />
        <meta
          property="og:image"
          content="https://ege-vocabulary.vercel.app/og-image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Справочник по ЕГЭ — словарь и материалы для подготовки"
        />
        <meta
          name="twitter:description"
          content="Быстрый и удобный справочник терминов и примеров для подготовки к ЕГЭ."
        />
        <meta
          name="twitter:image"
          content="https://ege-vocabulary.vercel.app/og-image.png"
        />
        <meta name="theme-color" content="#0ea5a4" />
        <meta
          name="telegram:title"
          content="Справочник по ЕГЭ — словарь и материалы для подготовки"
        />
        <meta
          name="telegram:description"
          content="Быстрый и удобный справочник терминов и примеров для подготовки к ЕГЭ. Более 300 слов"
        />
        <meta
          name="telegram:image"
          content="https://ege-vocabulary.vercel.app/og-image.png"
        />
        {/* VKontakte (VK) tags */}
        <meta property="vk:site" content="ege-vocabulary" />
        <meta
          property="vk:title"
          content="Справочник по ЕГЭ — словарь и материалы для подготовки"
        />
        <meta
          property="vk:description"
          content="Быстрый и удобный справочник терминов и примеров для подготовки к ЕГЭ."
        />
        <meta
          property="vk:image"
          content="https://ege-vocabulary.vercel.app/og-image.png"
        />
        {/* Preconnect and fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD structured data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Справочник по ЕГЭ",
              url: "https://ege-vocabulary.vercel.app",
              description:
                "Справочник по ЕГЭ — словарь терминов, примеров и кратких объяснений для подготовки к экзамену.",
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <RootProviders>
          <Header />
          <main className="flex-1">{children}</main>
        </RootProviders>
      </body>
    </html>
  );
}
