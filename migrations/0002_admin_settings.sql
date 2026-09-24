-- Settings the owner manages from the admin dashboard (e.g. the Lemon Squeezy webhook secret)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Lemon Squeezy checkout link for each product, pasted in the admin dashboard
CREATE TABLE IF NOT EXISTS product_links (
  slug TEXT PRIMARY KEY,
  checkout_url TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
