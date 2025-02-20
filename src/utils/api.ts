import pathsToAPITableIds from "./mapping";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const BUILD_ID = process.env.NEXT_PUBLIC_BUILD_TIMESTAMP; 

export async function getData(slug: string) {
  const path = pathsToAPITableIds[slug];
  const fullApiUrl = `https://aitable.ai/fusion/v1/datasheets/${path}/records?viewId=viwH2eQXnQbEx&fieldKey=name&build=${BUILD_ID}`;
  
  const res = await fetch(fullApiUrl, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    // cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const transformedData = data.data.records.map(
    (record: { recordId: any; fields: { [x: string]: any } }) => ({
      id: record.fields["Question ID"],
      questionText: record.fields["Question text"],
      answerA: record.fields["Answer A Text"],
      feedbackA: {
        title: record.fields["Title - Feedback to Answer A"],
        text: record.fields["Text - Feedback to Answer A"],
      },
      answerALeadsTo: record.fields["Answer A leads to"],
      answerB: record.fields["Answer B Text"],
      feedbackB: {
        title: record.fields["Title - Feedback to Answer B"],
        text: record.fields["Text - Feedback to Answer B"],
      },
      answerBLeadsTo: record.fields["Answer B leads to"],
      gameOverText: record.fields["Game Over Text"],
    })
  );

  return transformedData;
}


export interface InfoPageData {
  'ueber-das-spiel': string;
  'ueber-uns': string;
  'press': string;
  'rechtliches': string;
}

export async function fetchInfoPageData(): Promise<InfoPageData> {
  const res = await fetch(
    `https://aitable.ai/fusion/v1/datasheets/dst8ZkSQfjEcdHAV8w/records?viewId=viwl5SkkMCQTD&fieldKey=name&build=${BUILD_ID}`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      // cache: 'no-store'
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  if (!data || !data.success || !data.data || !data.data.records || !Array.isArray(data.data.records)) {
    throw new Error('Invalid response format');
  }

  const fields = data.data.records[0].fields;
  
  return {
    'ueber-das-spiel': fields['ueber das spiel'] || '',
    'ueber-uns': fields['ueber uns'] || '',
    'press': fields['press'] || '',
    'rechtliches': fields['rechtliches'] || '',
  };
}
