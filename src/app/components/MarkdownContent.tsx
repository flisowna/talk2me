import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return <ReactMarkdown>{content}</ReactMarkdown>;
}