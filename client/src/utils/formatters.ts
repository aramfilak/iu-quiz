function convertToGermanDate(timestamp: Date): string | null {
  if (!timestamp) return null;
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

  return date.toLocaleDateString('de-DE', options);
}

export { convertToGermanDate };
