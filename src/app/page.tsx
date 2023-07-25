"use client";

import React, { useEffect, useState } from 'react';
import { fetchGame1Records } from '../../utils/game1';
import Link from 'next/link';

const Home = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedRecords = await fetchGame1Records();
      setRecords(fetchedRecords);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Choose a Game Topic:</h1>
      <ul>
        <li>
          <Link href="/game1">
            Game 1
          </Link>
        </li>
        <li>
          <Link href="/game2">
            Game 2
          </Link>
        </li>
        <li>
          <Link href="/game3">
            Game 3
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
