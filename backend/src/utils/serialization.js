/**
 * Helper to recursively fix BigInt serialization in objects and arrays.
 * Prisma returns BigInt for some fields (like reel IDs), which JSON.stringify cannot handle.
 * @param {any} obj - The object or array to fix.
 * @returns {any} - The object with BigInts converted to strings.
 */
export function fixBigInt(obj) {
  if (obj === null || obj === undefined) return obj;

  if (Array.isArray(obj)) {
    return obj.map(fixBigInt);
  }

  if (typeof obj === "bigint") {
    return obj.toString();
  }

  if (obj instanceof Date) {
    return obj.toISOString();
  }

  if (typeof obj === "object") {
    const fixed = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fixed[key] = fixBigInt(obj[key]);
      }
    }
    return fixed;
  }

  return obj;
}
