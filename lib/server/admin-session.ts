import "server-only";
import { cookies } from "next/headers";
import { getEnv } from "./db";
import { hmacHex, verifyHmacHex } from "./crypto";

const COOKIE = "pn_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours

// Cookie value: "<expiry-unix-seconds>.<hmac(expiry)>", signed with ADMIN_PASSWORD,
// so changing the password logs every session out.

export async function isAdmin() {
  const { ADMIN_PASSWORD } = await getEnv();
  if (!ADMIN_PASSWORD) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [exp, sig] = value.split(".");
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  return verifyHmacHex(ADMIN_PASSWORD, `admin:${exp}`, sig);
}

export async function startAdminSession(password: string) {
  const { ADMIN_PASSWORD } = await getEnv();
  if (!ADMIN_PASSWORD || ADMIN_PASSWORD.length < 12) return "not-configured" as const;
  const given = await hmacHex("compare", password);
  const expected = await hmacHex("compare", ADMIN_PASSWORD);
  if (given !== expected) return "wrong" as const;
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const sig = await hmacHex(ADMIN_PASSWORD, `admin:${exp}`);
  (await cookies()).set(COOKIE, `${exp}.${sig}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: MAX_AGE,
  });
  return "ok" as const;
}

export async function endAdminSession() {
  (await cookies()).delete(COOKIE);
}
