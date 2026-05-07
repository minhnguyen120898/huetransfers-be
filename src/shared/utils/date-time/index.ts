/**
 * Convert time string to milliseconds
 * Supports: s (seconds), m (minutes), h (hours), d (days)
 *
 * @param timeString - Time string (e.g., '15m', '7d', '1h')
 * @returns Time in milliseconds
 */
export const convertToMilliseconds = (timeString: string): number => {
  const match = timeString.match(/^(\d+)([smhd])$/);
  if (!match) {
    throw new Error(`Invalid time format: ${timeString}`);
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 's':
      return value * 1000;
    case 'm':
      return value * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    default:
      throw new Error(`Unknown time unit: ${unit}`);
  }
};
