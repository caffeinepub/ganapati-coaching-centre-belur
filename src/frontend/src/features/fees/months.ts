export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export type Month = typeof MONTHS[number];

export function getMonthIndex(month: Month): number {
  return MONTHS.indexOf(month);
}

export function getMonthName(index: number): Month | undefined {
  return MONTHS[index];
}
