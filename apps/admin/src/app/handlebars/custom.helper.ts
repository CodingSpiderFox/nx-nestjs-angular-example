/**
 * Validation error helper
 * @param map validation error map
 * @param mapKey map key
 * @param block inline html block
 */
export const fieldErrors = (
  map: Map<any, any[]>,
  mapKey: string,
  block: any
) => {
  if (!map || !mapKey) {
    return undefined;
  }
  return block.fn({ errors: map.get(mapKey) });
};
