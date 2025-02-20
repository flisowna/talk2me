import Hero from "./components/Hero";
import { IntroBoxes } from "./components/Introboxes";
import Layout from "./components/Layout";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

async function getData() {
  const res = await fetch(`https://aitable.ai/fusion/v1/datasheets/dstvJgrcozzT3SjEY3/records`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      // cache: "no-store"
    })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json();

  if (!data || !data.success || !data.data || !data.data.records || !Array.isArray(data.data.records)) {
    throw new Error('Invalid response format');
  }

  // Transform the data to the desired structure
  const transformedData = data.data.records.map((record: { recordId: any; fields: { [x: string]: any; }; }) => ({
    recordId: record.recordId,
    lastUpdate: new Date(record.fields['Last update']),
    introText: record.fields['intro text'],
    title: record.fields['Game titles'],
    text: record.fields['Game intro text'],
    aboutUs: record.fields['uber uns'],
    link: record.fields['link'],
    image: record.fields['Game image']
    }));

    return transformedData;
}

export default async function Page() {
  const data = await getData();

  const heroData = {
    title: "talk to me",
    subtitle: "Von Kleiner Fünf",
    description: data[0]?.introText
  };

  return (
    <Layout>
      <main>
        <Hero heroData={heroData}/>
        <IntroBoxes introBoxesData={data}/>
      </main>
    </Layout>
  );
}