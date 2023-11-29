function convertToGermanDate(timestamp: Date): string | null {
  if (!timestamp) return null;
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const germanDate: string = date.toLocaleDateString('de-DE', options);

  return germanDate;
}

export { convertToGermanDate };
