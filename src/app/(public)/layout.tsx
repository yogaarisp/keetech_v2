import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { getNavigation } from "@/lib/data/site";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = await getNavigation();

  return (
    <>
      <Navbar navigation={navigation} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
