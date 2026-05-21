import data from "@/data/games.json"

import IGameInfo from "@/types/IGameInfo"

import { SlidingBanner } from "@/components/SlidingBanner";
import { Card } from "@/components/Card";


export default function Home() {
  const featuredGames: IGameInfo[] = data.filter(item => item.featured === true);
  const games: IGameInfo[] = data

  return (
    <div className="w-full space-y-52">

      <section className="w-full h-[100vh] top-0 relative">
        <SlidingBanner slides={featuredGames}/>
      </section>

      <section className="w-[90%] mx-auto justify-center grid lg:grid-cols-3 relative">
        {games.map((item, index) => {
          return (
            <div key={index} className="m-5">
              <Card slide={item} route={`/games/${item.slug}`}/>
            </div>
          )
        })}
      </section>
    </div>
  );
}
