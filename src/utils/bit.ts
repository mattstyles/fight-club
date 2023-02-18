export function isInMask(value: number, mask: number): boolean {
  return (value & mask) != 0
}
