export function getInitialLanguage(cookies: any): 'russian' | 'english' {
  if (cookies && cookies['app-language']) {
    const lang = cookies['app-language'];
    if (lang === 'english') return 'english';
  }

  return 'russian';
}