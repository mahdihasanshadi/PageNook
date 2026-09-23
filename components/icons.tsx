import type { Category } from "@/lib/catalog";

export function LogoMark({ light = false }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M8 30 L32 9 L56 30" fill="none" stroke={light ? "#FFFFFF" : "#2B2E6B"} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 34 Q22 30 31 35 L31 55 Q22 50 13 54 Z" fill="#F5B82E" />
      <path d="M51 34 Q42 30 33 35 L33 55 Q42 50 51 54 Z" fill="#F26B5B" />
      <path
        d="M17 39 Q22 37 27 40 M17 44 Q22 42 27 45 M47 39 Q42 37 37 40 M47 44 Q42 42 37 45"
        stroke="#FFFFFF" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".85"
      />
    </svg>
  );
}

const paths: Record<Category["icon"], React.ReactNode> = {
  kids: (<><circle cx="12" cy="8" r="4" /><path d="M5 21c0-4 3-6 7-6s7 2 7 6" /></>),
  study: (<><path d="M2 7l10-4 10 4-10 4z" /><path d="M6 9v5c3 2 9 2 12 0V9" /></>),
  code: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />,
  work: (<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></>),
  home: <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z" />,
  planner: (<><rect x="4" y="4" width="16" height="17" rx="2" /><path d="M8 2v4M16 2v4M4 10h16" /></>),
};

export function CategoryIcon({ category }: { category: Category }) {
  return (
    <span className="icon" style={{ background: category.tint }}>
      <svg viewBox="0 0 24 24" fill="none" stroke={category.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {paths[category.icon]}
      </svg>
    </span>
  );
}

export function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}
