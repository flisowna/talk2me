import {getData} from '../../../../utils/api';
import Game from '@/app/components/Game';

export default async function Home({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug)

  return (
    <div>
      <Game gameData={data}/>
    </div>
  );
};