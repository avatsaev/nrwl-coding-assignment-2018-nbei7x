export const escapeRegExp = (val: string) =>
  val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

