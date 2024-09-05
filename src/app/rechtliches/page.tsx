import Layout from "../components/Layout";
import MarkdownContent from "../components/MarkdownContent";
import { fetchInfoPageData, InfoPageData } from '../../utils/api'
import styles from './rechtliches.module.css';


// Define the props for the Page component
interface PageProps {
  data?: InfoPageData;
  error?: string;
}

export default async function Page() {
  let data: InfoPageData | null = null;
  let error: string | null = null;

  try {
    data = await fetchInfoPageData();
  } catch (e) {
    console.error('Error fetching data:', e);
    error = 'Failed to load content. Please try again later.';
  }

  return (
    <Layout>
      <main className={styles.content}>
        <h1>Rechtliches</h1>
        {error ? (
          <div className="error">{error}</div>
        ) : (
          data && <MarkdownContent content={data.rechtliches} />
        )}
      </main>
    </Layout>
  );
}