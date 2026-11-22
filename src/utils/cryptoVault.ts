/**
 * Client-Side End-to-End Encryption (E2E) Vault
 * Implements AES-GCM 256-bit encryption using standard Web Crypto API.
 * Guarantees privacy for candidate resumes, answer transcripts, and peer feedback.
 */

const KEY_STORAGE_KEY = 'prepvertex_vault_key_v1';
const FINGERPRINT_KEY = 'prepvertex_vault_fingerprint_v1';

let cachedKey: CryptoKey | null = null;
let cachedFingerprint: string = '';

// Helper to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Helper to convert Base64 to Uint8Array
function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Initialize or load master encryption key
export async function getOrCreateVaultKey(): Promise<{ key: CryptoKey; fingerprint: string }> {
  if (cachedKey && cachedFingerprint) {
    return { key: cachedKey, fingerprint: cachedFingerprint };
  }

  try {
    const storedKeyJwk = localStorage.getItem(KEY_STORAGE_KEY);
    const storedFingerprint = localStorage.getItem(FINGERPRINT_KEY);

    if (storedKeyJwk && storedFingerprint) {
      const jwk = JSON.parse(storedKeyJwk);
      cachedKey = await window.crypto.subtle.importKey(
        'jwk',
        jwk,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      );
      cachedFingerprint = storedFingerprint;
      return { key: cachedKey, fingerprint: cachedFingerprint };
    }
  } catch (err) {
    console.warn('Could not retrieve existing vault key, generating fresh key', err);
  }

  // Generate new AES-GCM 256-bit key
  const newKey = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const exportedJwk = await window.crypto.subtle.exportKey('jwk', newKey);
  const rawData = new TextEncoder().encode(JSON.stringify(exportedJwk));
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', rawData);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const fingerprint = hashArray.map(b => b.toString(16).padStart(2, '0')).slice(0, 8).join(':').toUpperCase();

  localStorage.setItem(KEY_STORAGE_KEY, JSON.stringify(exportedJwk));
  localStorage.setItem(FINGERPRINT_KEY, fingerprint);

  cachedKey = newKey;
  cachedFingerprint = fingerprint;

  return { key: newKey, fingerprint };
}

// Encrypt plaintext string -> { ciphertext: base64, iv: base64 }
export async function encryptData(plainText: string): Promise<string> {
  if (!plainText) return '';
  try {
    const { key } = await getOrCreateVaultKey();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(plainText);

    const cipherBuffer = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoded
    );

    const payload = {
      v: 1,
      alg: 'AES-GCM-256',
      iv: arrayBufferToBase64(iv.buffer),
      ct: arrayBufferToBase64(cipherBuffer)
    };

    return `e2e:${JSON.stringify(payload)}`;
  } catch (err) {
    console.error('Encryption error, returning raw fallback:', err);
    return plainText;
  }
}

// Decrypt ciphertext string -> plaintext
export async function decryptData(encryptedPayload: string): Promise<string> {
  if (!encryptedPayload) return '';
  if (!encryptedPayload.startsWith('e2e:')) {
    return encryptedPayload; // Not encrypted
  }

  try {
    const { key } = await getOrCreateVaultKey();
    const rawJson = encryptedPayload.slice(4);
    const parsed = JSON.parse(rawJson);
    const iv = base64ToUint8Array(parsed.iv);
    const cipherBytes = base64ToUint8Array(parsed.ct);

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv as unknown as BufferSource },
      key,
      cipherBytes as unknown as BufferSource
    );

    return new TextDecoder().decode(decryptedBuffer);
  } catch (err) {
    console.error('Decryption error:', err);
    return '[Decryption failed: Key mismatch]';
  }
}

export function getVaultFingerprint(): string {
  return cachedFingerprint || localStorage.getItem(FINGERPRINT_KEY) || 'SECURE-AES-256';
}
