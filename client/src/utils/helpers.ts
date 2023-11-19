function convertToGermanDate(timestamp: string): string {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const germanDate: string = date.toLocaleDateString('de-DE', options);

  return germanDate;
}

export { convertToGermanDate };
