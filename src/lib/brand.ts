export const BRAND = {
  emailPrimary: "info@munisusman.com",
  emailSecondary: "info@munisusman.uz",
  instagram: "https://www.instagram.com/munisusman/",
  instagramHandle: "@munisusman",
  location: "Tashkent, Uzbekistan",
};

export function mailtoLink(subject: string, body: string) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${BRAND.emailPrimary}?${params.toString()}`;
}
