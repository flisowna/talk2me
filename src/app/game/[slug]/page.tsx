import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import pathsToAPITableIds from '../../../../utils/mapping';

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export async function generateStaticParams() {
 
  return Object.keys(pathsToAPITableIds).map((path) => ({
    slug: path,
  }))
}

async function getData( slug: string ) {
  const path = pathsToAPITableIds[slug]
  const res = await fetch(`https://apitable.com/fusion/v1/datasheets/${path}/records`,
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

return res.json()
}

export default async function Home({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug)

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
};