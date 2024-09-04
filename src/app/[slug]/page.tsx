import { Metadata } from 'next';
import MarkdownContent from '../components/MarkdownContent';

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return [
    { slug: 'uber-das-spiel' },
    { slug: 'uber-uns' },
    { slug: 'press' },
    { slug: 'rechtliches' },
  ];
}

async function getData(slug: string) {
  const API_TOKEN = process.env.API_TOKEN;
  const res = await fetch(
    `https://aitable.ai/fusion/v1/datasheets/dst8ZkSQfjEcdHAV8w/records?viewId=viwl5skkMCQTD&fieldKey=name`,
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      next: { revalidate: 3600 } // Revalidate every hour
    }
  );

  if (!res.ok) throw new Error('Failed to fetch data');

  const data = await res.json();
  const fields = data.data.records[0].fields;

  const fieldMap: { [key: string]: string } = {
    'uber-das-spiel': 'ueber das spiel',
    'uber-uns': 'ueber uns',
    'press': 'press',
    'rechtliches': 'rechtliches',
  };

  return fields[fieldMap[slug]] || '';
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const title = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return { title };
}

export default async function Page({ params }: PageProps) {
  const content = await getData(params.slug);
  const title = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <main>
      <h1>{title}</h1>
      <MarkdownContent content={content} />
    </main>
  );
}