import "server-only";

const enc = new TextEncoder();

async function hmacKey(secret: string) {
  return crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

function toHex(buf: ArrayBuffer) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function fromHex(hex: string) {
  if (!/^[0-9a-f]*$/i.test(hex) || hex.length % 2) return null;
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}

export async function hmacHex(secret: string, message: string) {
  return toHex(await crypto.subtle.sign("HMAC", await hmacKey(secret), enc.encode(message)));
}

/** Constant-time check of a hex HMAC-SHA256 signature. */
export async function verifyHmacHex(secret: string, message: string, signatureHex: string) {
  const sig = fromHex(signatureHex.trim());
  if (!sig) return false;
  return crypto.subtle.verify("HMAC", await hmacKey(secret), sig, enc.encode(message));
}
