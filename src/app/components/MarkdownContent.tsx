"use client"

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

interface InfoPageData {
  [key: string]: string;
}

async function fetchInfoPageData(): Promise<InfoPageData> {
    const res = await fetch(
      `https://aitable.ai/fusion/v1/datasheets/dst8ZkSQfjEcdHAV8w/records?viewId=viwl5SkkMCQTD&fieldKey=name`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );
  
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await res.json();
  
    if (!data || !data.success || !data.data || !data.data.records || !Array.isArray(data.data.records)) {
      throw new Error('Invalid response format');
    }
  
    // The data is nested inside data.data.records[0].fields
    const fields = data.data.records[0].fields;
    
    return {
      'ueber-das-spiel': fields['ueber das spiel'],
      'ueber-uns': fields['ueber uns'],
      'press': fields['press'],
      'rechtliches': fields['rechtliches'],
    };
  }

interface MarkdownContentProps {
  pageName: 'ueber-das-spiel' | 'ueber-uns' | 'press' | 'rechtliches';
}

export default function MarkdownContent({ pageName }: MarkdownContentProps) {
    const [content, setContent] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      console.log('Fetching data for page:', pageName);
      fetchInfoPageData()
        .then((data) => {
          console.log('Fetched data:', data);
          console.log('Content for this page:', data[pageName]);
          setContent(data[pageName]);
        })
        .catch((err) => {
          console.error('Error fetching data:', err);
          setError('Failed to load content. Please try again later.');
        });
    }, [pageName]);
  
    console.log('Rendering content:', content);
  
    if (error) {
      return <div className="error">{error}</div>;
    }
  
    return <ReactMarkdown>{content}</ReactMarkdown>;
  }