import axios from 'axios';

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const fetchRecords = async (apiUrl) => {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (response.status === 200 && response.data.success) {
      const records = response.data.data.records;

      const questions = records.map((record) => {
        const fields = record.fields;

        return {
          id: fields['Question ID'],
          questionText: fields['Question text'],
          answerA: fields['Answer A Text'],
          feedbackA: {
            title: fields['Title - Feedback to Answer A'],
            text: fields['Text - Feedback to Answer A'],
          },
          answerALeadsTo: fields['Answer A leads to'],
          answerB: fields['Answer B Text'],
          feedbackB: {
            title: fields['Title - Feedback to Answer B'],
            text: fields['Text - Feedback to Answer B'],
          },
          answerBLeadsTo: fields['Answer B leads to'],
        };
      });

      return questions;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return [];
};

export { fetchRecords };