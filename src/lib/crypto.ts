// src/lib/crypto.ts

/**
 * Computes HMAC-SHA256 using the Web Crypto API.
 * @param keyBytes - The secret key as Uint8Array.
 * @param dataBytes - The message/data as Uint8Array.
 * @returns Promise<Uint8Array> - The HMAC digest.
 */
export async function computeHmacSha256(keyBytes: Uint8Array, dataBytes: Uint8Array): Promise<Uint8Array> {
  if (!window.crypto?.subtle) {
    throw new Error('Web Crypto API not supported in this browser.');
  }

  const algorithm = { name: 'HMAC', hash: { name: 'SHA-256' } };
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    keyBytes,
    algorithm,
    false,
    ['sign']
  );

  const signature = await window.crypto.subtle.sign(
    algorithm.name,
    cryptoKey,
    dataBytes
  );

  return new Uint8Array(signature);
}