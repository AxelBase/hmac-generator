// src/lib/encoding.ts

/**
 * Converts a string to Uint8Array based on encoding.
 * @param input - The input string.
 * @param encoding - 'utf8' | 'hex' | 'base64'.
 * @returns Uint8Array.
 */
export function stringToBytes(input: string, encoding: 'utf8' | 'hex' | 'base64'): Uint8Array {
  if (encoding === 'utf8') {
    return new TextEncoder().encode(input);
  } else if (encoding === 'hex') {
    const cleanInput = input.replace(/[^0-9a-fA-F]/g, '');
    if (cleanInput.length % 2 !== 0) {
      throw new Error('Invalid hex string length.');
    }
    const bytes = new Uint8Array(cleanInput.length / 2);
    for (let i = 0; i < cleanInput.length; i += 2) {
      bytes[i / 2] = parseInt(cleanInput.substring(i, i + 2), 16);
    }
    return bytes;
  } else if (encoding === 'base64') {
    const binaryString = atob(input);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  } else {
    throw new Error('Unsupported encoding.');
  }
}

/**
 * Converts Uint8Array to hex string.
 * @param bytes - The Uint8Array.
 * @returns Hex string (lowercase).
 */
export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toLowerCase();
}

/**
 * Converts Uint8Array to base64 string.
 * @param bytes - The Uint8Array.
 * @returns Base64 string.
 */
export function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

/**
 * Converts Uint8Array to string representation for display.
 * @param bytes - The Uint8Array.
 * @returns '[1, 2, 3, ...]' string.
 */
export function bytesToArrayString(bytes: Uint8Array): string {
  return `[${Array.from(bytes).join(', ')}]`;
}