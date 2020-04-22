
// declare function getMonth(date: string): string;
// declare function getMonth(date: Date): string;

const dateObj = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

export function getTime(date: string | Date) {
  let k = 1;
  if (typeof date === 'string') {
    const d = new Date(date);
    if (d.toString() !== 'Invalid Date') {
      date = d;
    } else {
      date = new Date()
    }
  }
  k = date.getMonth() + 1;
  return `${dateObj[k as keyof typeof dateObj]}  ${date.getDate()}`
}
// export const getMonth = (k: number) => dateObj[k as keyof typeof dateObj] || '';