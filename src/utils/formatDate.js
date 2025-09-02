export function formatDate(iso) {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit", month: "long", year: "numeric"
    }).format(new Date(iso));
  } catch { return iso; }
}