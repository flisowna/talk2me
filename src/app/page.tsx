const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

async function getData() {
    const res = await fetch(`https://apitable.com/fusion/v1/datasheets/dstvJgrcozzT3SjEY3/records`,
      {
      headers: {
          Authorization: `Bearer ${API_TOKEN}`,
    },
  
    })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  
  const data = await res.json();
  

  if (!data || !data.success || !data.data || !data.data.records || !Array.isArray(data.data.records)) {
    // If the response is not in the expected format, handle the error accordingly
    throw new Error('Invalid response format');
  }

  // Transform the data to the desired structure
  const transformedData = data.data.records.map(record => ({
    recordId: record.recordId,
    lastUpdate: new Date(record.fields['Last update']),
    introText: record.fields['intro text'],
    gameTitle: record.fields['Game titles'],
    gameIntroText: record.fields['Game intro text'],
    aboutUs: record.fields['uber uns']
  }));

  return transformedData;
}


export default async function Page() {
  const data = await getData();

  return (
    <main>
      {data.map((record) => (
        <div key={record.recordId}>
          <h2>{record.gameTitle}</h2>
          <p>{record.gameIntroText}</p>
          <p>{record.aboutUs}</p>
        </div>
      ))}
    </main>
  );
}



