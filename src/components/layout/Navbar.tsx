// Server Component — no "use client" directive.
// Imports navLinks on the SERVER so the link list is baked into
// the SSR HTML and serialised as React props for the client.
// This prevents hydration mismatches caused by stale client-side
// JS bundles that still hold an older version of navLinks.
import { navLinks } from "@/lib/data";
import NavbarClient from "./NavbarClient";

export default function Navbar() {
  return <NavbarClient links={navLinks} />;
}
