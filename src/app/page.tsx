import Hero from "./components/Hero";
import { IntroBoxes } from "./components/Introboxes";
import Layout from "./components/Layout";


const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

async function getData() {
  const res = await fetch(`https://apitable.com/fusion/v1/datasheets/dstvJgrcozzT3SjEY3/records`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },

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

const heroData = {
  title: "talk to me",
  subtitle: "Von Kleiner Fünf",
  description: "Hallo! Hat sich deine Freundin oder dein Verwandter von Verschwörungen und Fehlinformationen verleiten lassen? Verschwörungsmythen können uns alle beeinflussen. Während die einen versuchen, 'die Welt wachzurütteln', tun sich die anderen damit schwer, den richtigen Weg zu finden, um mit ihnen zu reden."
};


export default async function Page() {
  const data = await getData();

  return (
    <Layout>
      <main className="mx-4 md:mx-0">
        <Hero heroData={heroData}/>
        <IntroBoxes introBoxesData={data}/>
      </main>
    </Layout>
  );
}



