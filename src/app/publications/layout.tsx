import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Browse Stellar Associates' publications, including research reports, policy briefs, articles, and insights from development experts.",
};

export default function PublicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
