"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getProduct } from "@/lib/catalog";
import { endAdminSession, isAdmin, startAdminSession } from "./admin-session";
import { setCheckoutLink, setSetting } from "./db";

export async function login(formData: FormData) {
  const next = String(formData.get("next") ?? "/admin");
  const result = await startAdminSession(String(formData.get("password") ?? ""));
  const safeNext = next.startsWith("/admin") ? next : "/admin";
  redirect(result === "ok" ? safeNext : `${safeNext}?error=${result}`);
}

export async function logout() {
  await endAdminSession();
  redirect("/admin");
}

/** Accept only real Lemon Squeezy checkout links, so a typo can't send buyers somewhere else. */
function cleanCheckoutUrl(raw: string) {
  const value = raw.trim();
  if (!value) return null;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return "invalid";
  }
  const hostOk = url.hostname === "lemonsqueezy.com" || url.hostname.endsWith(".lemonsqueezy.com");
  if (url.protocol !== "https:" || !hostOk || !url.pathname.includes("/buy/")) return "invalid";
  url.search = "";
  url.hash = "";
  return url.toString();
}

export async function saveCheckoutLink(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const slug = String(formData.get("slug") ?? "");
  if (!getProduct(slug)) redirect("/admin/products?error=unknown");
  const url = cleanCheckoutUrl(String(formData.get("url") ?? ""));
  if (url === "invalid") redirect(`/admin/products?error=badlink&slug=${encodeURIComponent(slug)}`);
  await setCheckoutLink(slug, url);
  revalidatePath("/admin/products");
  redirect(`/admin/products?saved=${encodeURIComponent(slug)}#${slug}`);
}

export async function saveWebhookSecret(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const secret = String(formData.get("secret") ?? "").trim();
  if (secret.length < 6 || secret.length > 40) redirect("/admin/payments?error=secret");
  await setSetting("ls_webhook_secret", secret);
  redirect("/admin/payments?saved=secret");
}
