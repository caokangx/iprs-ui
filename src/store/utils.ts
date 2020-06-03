export function processDate(data: any) {
  const { start, end } = data || {};
  if (start && end) {
    const result = {
      start: new Date(start).getTime(),
      end: new Date(end).getTime(),
    };
    return result;
  }
  return null;
}
