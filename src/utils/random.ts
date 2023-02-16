// This is good enough for what we need
// Also, length is a little misleading, due to how toString works it'll never grow larger than 11 chars, we _could_ stitch together strings to get longer ids but we don't need them, 8 is fine.
export function uuid(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2)
}
