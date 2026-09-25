import {
  Briefcase,
  CalendarCheck,
  Code,
  GraduationCap,
  HandHeart,
  HouseLine,
  MagnifyingGlass,
  PuzzlePiece,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
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

// Phosphor duotone icons (MIT licence), one per shelf.
const shelfIcons: Record<Category["icon"], Icon> = {
  parenting: HandHeart,
  kids: PuzzlePiece,
  study: GraduationCap,
  code: Code,
  work: Briefcase,
  home: HouseLine,
  planner: CalendarCheck,
};

export function CategoryGlyph({ category, size = 28 }: { category: Category; size?: number }) {
  const Glyph = shelfIcons[category.icon];
  return <Glyph size={size} weight="duotone" color={category.color} aria-hidden="true" />;
}

export function CategoryIcon({ category, size = 28 }: { category: Category; size?: number }) {
  return (
    <span className="icon" style={{ background: category.tint }}>
      <CategoryGlyph category={category} size={size} />
    </span>
  );
}

export function SearchIcon({ size = 18 }: { size?: number }) {
  return <MagnifyingGlass size={size} weight="bold" aria-hidden="true" />;
}
