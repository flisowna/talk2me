import Layout from "../components/Layout";
import MarkdownContent from "../components/MarkdownContent";

export default function Page() {
  return (
    <Layout>
      <main>
        <h1>Über uns</h1>
        <MarkdownContent pageName="ueber-uns" />
      </main>
    </Layout>
  );
}