import Layout from "../components/Layout";
import MarkdownContent from "../components/MarkdownContent";
import { fetchInfoPageData, InfoPageData } from '../../utils/api';
import Image from "next/image";
import styles from './press.module.css';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface ILink {
  image: string;
  link: string;
  alt: string;
}

interface ILocalData {
  links: ILink[];
}

export default async function Page() {
  let data: InfoPageData | null = null;
  let error: string | null = null;
  let localData: ILocalData | null = null;

  try {
    // Fetch data from Aitable
    data = await fetchInfoPageData();

    // Read local markdown file
    const filePath = path.join(process.cwd(), 'src', 'app', 'press', 'press.md');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter } = matter(fileContents);
    localData = frontmatter as ILocalData;
  } catch (e) {
    console.error('Error fetching data:', e);
    error = 'Failed to load content. Please try again later.';
  }

  return (
    <Layout>
      <main className="md:mx-28">
        <h1 className="md:text-center">Press</h1>
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            {data && <MarkdownContent content={data.press} />}
            {localData && localData.links && (
              <div className={styles.links_container}>
                {localData.links.map((link, index) => (
                  <a key={index} href={link.link} className={styles.image_card}>
                    <Image 
                      src={link.image} 
                      layout="fill" 
                      objectFit="contain" 
                      alt={link.alt} 
                    />
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </Layout>
  );
}