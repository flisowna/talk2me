import pathsToAPITableIds from "./mapping";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export async function getData(slug: string) {
  const path = pathsToAPITableIds[slug];
  const fullApiUrl = `https://apitable.com/fusion/v1/datasheets/${path}/records`;
  console.log("fullApiUrl", fullApiUrl);
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
