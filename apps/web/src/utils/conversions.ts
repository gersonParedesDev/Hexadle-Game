export function hexToDecimal(hex: string): string {
  return parseInt(hex, 16).toString();
}

export function hexToBinary(hex: string): string {
  const decimal = parseInt(hex, 16);
  return decimal.toString(2).padStart(hex.length * 4, '0');
}

export function formatBinary(binary: string): string {
  return binary.match(/.{1,4}/g)?.join(' ') || binary;
}