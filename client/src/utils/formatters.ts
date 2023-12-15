function convertToGermanDate(timestamp: Date): string | null {
  if (!timestamp) return null;
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };

  return date.toLocaleDateString('de-DE', options);
}

function convertSecondsToMin(seconds: number) {
  if (seconds < 0) {
    return '00:00';
  }

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  const formattedMin = String(min).padStart(2, '0');
  const formattedSec = String(sec).padStart(2, '0');

  return `${formattedMin}:${formattedSec} ${min < 1 ? 's' : 'min'}`;
}

export { convertToGermanDate, convertSecondsToMin };
