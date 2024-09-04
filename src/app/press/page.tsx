import Layout from "../components/Layout";
import MarkdownContent from "../components/MarkdownContent";

export default function Page() {
  return (
    <Layout>
      <main>
        <h1>Press</h1>
        <MarkdownContent pageName="press" />
      </main>
    </Layout>
  );
}