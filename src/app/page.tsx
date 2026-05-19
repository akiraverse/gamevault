import Image from "next/image";
import Link from "next/link";

import games from "@/data/games.json"

import IGameInfo from "@/types/IGameInfo"

export default function Home() {
  const data: IGameInfo = games[0]
  return (
    <div>
      <div>
        <Image src={data.coverImage} width={100} height={100} alt=''/>

        <div>
          <p>featured</p>
          <h2>{data.title}</h2>
          <h4>{data.description}</h4>
          <div>
            {data.genres.map((item, index) => (
              <div>
                {item}
              </div>
            ))}
          </div>

          <div>
            <div>
              <Link href={''}>View Details</Link>
            </div>
            <div>
              Rating: {data.rating}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
