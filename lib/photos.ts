import type { CategorySlug } from "./catalog";

// Stock photos from Unsplash (free for commercial use under the Unsplash License).
// Files are downloaded by scripts/fetch_photos.py into public/photos/.
export type Photo = { src: string; alt: string; credit: string; link: string };

const unsplash = (id: string) => `https://unsplash.com/photos/${id}`;

export const shelfPhotos: Record<CategorySlug, Photo> = {
  parenting: { src: "/photos/parenting.jpg", alt: "A mother and daughter reading a book together in bed", credit: "Vitaly Gariev", link: unsplash("xKRrjOORL6E") },
  "kids-learning": { src: "/photos/kids-learning.jpg", alt: "Two young girls coloring with markers at a table", credit: "Alan Rodriguez", link: unsplash("N17Nkbsc-zY") },
  "study-exams": { src: "/photos/study-exams.jpg", alt: "A student writing notes while studying at a desk", credit: "Kyle Gregory Devaras", link: unsplash("6RTM8EsD1T8") },
  "tech-coding": { src: "/photos/tech-coding.jpg", alt: "A laptop showing code on a bright desk", credit: "Christopher Gower", link: unsplash("m_HRfLhgABo") },
  "work-career": { src: "/photos/work-career.jpg", alt: "A smiling candidate shaking hands at a job interview", credit: "Resume Genius", link: unsplash("IESB4iFVuzA") },
  "home-life": { src: "/photos/home-life.jpg", alt: "A family cooking pizza together in the kitchen", credit: "Jimmy Dean", link: unsplash("Yl7Y8DhyzyY") },
  "planners-templates": { src: "/photos/planners-templates.jpg", alt: "An open to-do notebook next to a laptop and glasses", credit: "Volodymyr Hryshchenko", link: unsplash("KZocXyI3kRo") },
};

export const pagePhotos = {
  freeKids: { src: "/photos/free-kids.jpg", alt: "A child coloring a butterfly with a red crayon", credit: "Lucas Alexander", link: unsplash("sJuDgtkUyYs") },
  freeParents: { src: "/photos/free-parents.jpg", alt: "A mother and son reading a book together on the sofa", credit: "Vitaly Gariev", link: unsplash("yMQ004iUSZI") },
} satisfies Record<string, Photo>;
