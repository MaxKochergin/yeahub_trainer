export function arraysEqual<T>(a: T[], b: T[]): boolean {
  if (!(a.length === b.length)) return false;
  return a.every((item, i) => {
    return item === b[i];
  });
}
