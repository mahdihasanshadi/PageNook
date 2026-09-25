import { permanentRedirect } from "next/navigation";

// Contact now lives on the Support page, next to the answers to common questions.
export default function ContactPage() {
  permanentRedirect("/support#contact");
}
