export function formatUzs(amount: number, lang: "ru" | "en" = "ru"): string {
  const grouped = new Intl.NumberFormat("ru-RU").format(Math.round(amount));
  return lang === "ru" ? `${grouped} сум` : `${grouped} UZS`;
}
