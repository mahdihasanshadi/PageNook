import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container page-head" style={{ paddingBottom: 64 }}>
      <span className="kicker">404</span>
      <h1>This page slipped behind the shelf</h1>
      <p className="lead">The page you&apos;re looking for isn&apos;t here. It may have moved, or the link may be mistyped.</p>
      <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
        <Link className="btn btn-primary" href="/">Back to the nook</Link>
        <Link className="btn btn-ghost" href="/shelves">Browse the shelves</Link>
      </div>
    </div>
  );
}
