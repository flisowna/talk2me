import Layout from "../components/Layout";
import MarkdownContent from "../components/MarkdownContent";

export default function Page() {
  return (
    <Layout>
      <main>
        <h1>rechtliches</h1>
        <MarkdownContent pageName="rechtliches" />
      </main>
    </Layout>
  );
}