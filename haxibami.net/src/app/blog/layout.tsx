import Footer from "components/Footer";
import Header from "components/PostHeader";

const postType = "blog";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-between px-4">
      <Header posttype={postType} />
      <main className="flex grow flex-col py-8">{children}</main>
      <Footer />
    </div>
  );
}
