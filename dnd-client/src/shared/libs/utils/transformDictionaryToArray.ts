export function transformDictionaryToArray<V>(dictionary: Record<string, V>) {
  return Object.keys(dictionary).map((key) => dictionary[key]);
}
