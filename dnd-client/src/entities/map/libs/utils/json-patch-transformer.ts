export function jsonPatchTransformer(object: Omit<Object, 'id'>) {
  return Object.keys(object).map((key) => {
    return {
      op: 'replace',
      path: `/${key}`,
      value: object[key],
    };
  });
}
