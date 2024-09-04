import Layout from "../components/Layout";
import MarkdownContent from "../components/MarkdownContent";

export default function Page() {
  return (
    <Layout>
      <main>
        <h1>Über das Spiel</h1>
        <MarkdownContent pageName="ueber-das-spiel" />
      </main>
    </Layout>
  );
}