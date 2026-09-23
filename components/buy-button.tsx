import Link from "next/link";
import Script from "next/script";
import { formatPrice, type Product } from "@/lib/catalog";

export function BuyButton({ product }: { product: Product }) {
  if (product.status !== "available") {
    return (
      <Link className="btn btn-primary btn-lg" href="/free">
        Notify me when it&apos;s ready
      </Link>
    );
  }
  if (!product.checkoutUrl) {
    // Checkout not connected yet: say so plainly instead of a dead button.
    return (
      <>
        <button className="btn btn-primary btn-lg" type="button" disabled>
          Checkout opens soon · {formatPrice(product.price)}
        </button>
        {product.freeSample && (
          <a className="btn btn-ghost" href={product.freeSample} download>
            Read the free sample
          </a>
        )}
      </>
    );
  }
  return (
    <>
      <Script src="https://app.lemonsqueezy.com/js/lemon.js" strategy="afterInteractive" />
      <a className="btn btn-primary btn-lg lemonsqueezy-button" href={`${product.checkoutUrl}?embed=1&media=0`}>
        Buy now · {formatPrice(product.price)}
      </a>
      {product.freeSample && (
        <a className="btn btn-ghost" href={product.freeSample} download>
          Free sample
        </a>
      )}
    </>
  );
}
