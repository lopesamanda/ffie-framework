import { SitePageTransition } from "@/components/motion/SitePageTransition";

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SitePageTransition>{children}</SitePageTransition>;
}
