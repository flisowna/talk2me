import React from 'react';
import ReactMarkdown from 'react-markdown';

type InfoPageProps = {
  text: string;
};

export const InfoPage: React.FC<InfoPageProps> = ({ text }) => {
  return (
    <div>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};
