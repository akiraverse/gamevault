import data from "@/data/games.json"

import IGameInfo from "@/types/IGameInfo"

import SlidingBanner from "@/components/SlidingBanner";


export default function Home() {
  const featuredGames: IGameInfo[] = data.filter(item => item.featured === true);
  const games: IGameInfo[] = data

  return (
    <div className="w-full">

      <section className="w-full h-[100vh] top-0 relative">
        <SlidingBanner slides={featuredGames}/>
      </section>
    </div>
  );
}
