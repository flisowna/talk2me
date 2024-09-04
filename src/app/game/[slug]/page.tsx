import {getData} from '../../../utils/api';
import Game from '@/app/components/Game';
import pathsToAPITableIds from '../../../utils/mapping';


export async function generateStaticParams() {
 
  return Object.keys(pathsToAPITableIds).map((path) => ({
    slug: path,
  }))
}

export default async function Home({ params }: { params: { slug: string } }) {

  const data = await getData(params.slug)

  return (
    <div>
      <Game gameData={data}/>
    </div>
  );
};