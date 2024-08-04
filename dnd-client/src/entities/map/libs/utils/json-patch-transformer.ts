export function jsonPatchTransformer(object: Object) {
  return Object.keys(object).map((key) => {
    return {
      op: 'replace',
      path: `/${key}`,
      value: object[key],
    };
  });
}
