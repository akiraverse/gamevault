"use client"

import Link from "next/link";
import { Sparkles, Star, Calendar, Laptop2Icon, DollarSign, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import data from "@/data/games.json"
import IGameInfo from "@/types/IGameInfo";

export default function Game({params}: {params: Promise<{slug: string}>}) {
	const router = useRouter()
	const { slug } = React.use(params);
	const games: IGameInfo[] = data
	const game: IGameInfo | undefined = games.find((g) => (g.slug === slug))

	return (
		<div 
			className={`relative w-full h-auto flex flex-col items-center justify-center`}
		>
			<div className="relative z-30 w-full h-[80vh] mt-20">
				<div className="absolute z-10 inset-0 bg-gradient-to-b from-primary via-transparent to-transparent" />
				<div className="absolute z-10 inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
				<img className="absolute z-0 w-full h-full object-cover" src={game?.coverImage} alt={game?.title} />
			</div>

			<div className="relative container mx-auto mt-1 px-4 w-full h-full flex flex-col items-center">

				<div className="w-full flex flex-col space-y-5">

					<button className="h-fit w-fit px-5 py-3 mb-10 bg-red-900 text-red-300 hover:bg-red-700 hover:text-white rounded-lg" onClick={() => (router.back())}>
						{'< Go Back'}
					</button>

					{/* title */}
					<div className="flex flex-row items-center">
						{/* featured game (true or false) */}
						<div className="text-8xl font-extrabold bg-gradient-to-r from-cred via-accent to-amber-500 bg-clip-text text-transparent mr-10">
							{game?.title}
						</div>
						{
							game?.featured && (
								<div className="space-x-3 flex flex-row">
									<Sparkles className="font-semibold text-gray-200"/>
									<p className="text-lg font-semibold text-gray-200">FEATURED</p>
								</div>
							)
						}
					</div>
					
					{/* about */}
					<div className="space-y-3 p-10 border border-red-900 rounded-lg hover:border-red-500">
						<label className="text-2xl font-bold" htmlFor="">About</label>
						<div className="text-lg">{game?.longDescription}</div>
					</div>

					{/* genres */}
					<div className="space-y-3 p-10 border border-red-900 rounded-lg hover:border-red-500">
						<label className="text-2xl font-bold" htmlFor="">Genres</label>
						<div className="flex flex-wrap space-x-3">
						{game?.genres.map((item, index) => (
							<div key={index} className="text-lg px-3 py-1 h-fit w-fit rounded-full bg-corange/20 text-corange border border-corange/40">
							{item}
							</div>
						))}
						</div>	
					</div>	
					
					{/* screenshots */}
					<div className="relative w-full h-auto p-10 float-left border border-red-900 rounded-lg hover:border-red-500 space-y-7">
						<label className="text-2xl font-bold" htmlFor="">Screenshots</label>
						<div className="w-full h-auto flex flex-wrap">
							{game?.screenshots.map((screenshot, index) => {
								return (
									<div key={index} className="relative w-[30%] h-full mr-6 overflow-hidden rounded-lg border border-red-900 hover:border-red-500 group">
										<img className="w-full h-full rounded-lg object-cover group-hover:scale-110 group-hover:transition group-hover:duration-150" src={screenshot} alt="" />
									</div>
								)
							})}
						</div>
					</div>
					
					{/* further info */}
					<div className="w-full h-auto p-10 float-left border border-red-900 rounded-lg hover:border-red-500 space-y-7">
						{/* user rating */}
						<div className="text-lg w-auto h-auto flex flex-row items-center">
							<div className="">User Rating</div>
							<Star className="size-10 font-bold text-yellow-500 fill-yellow-500 my-auto" />
							<div className="h-auto flex flex-row items-center"><span className="text-4xl font-bold text-yellow-500">{game?.rating}</span>/10</div>
						</div>

						<hr className="border border-red-900/70"/>
						
						{/* price */}
						<div className="text-4xl font-black">
							Rp. {game?.price}
						</div>

						{/* add to wishlist */}
						<button className="w-full p-5 bg-lightPrimary rounded-lg border border-red-900 hover:border-red-500 hover:text-red-500 hover:bg-red-900 shadow-red-900">
							Add To Wishlist
						</button>

						<hr className="border border-red-900/70"/>
						
						{/* release date */}
						<div className="flex flex-row items-center space-x-3">
							<Calendar className="size-7 text-gray-400" />
							<div>
								<label className="text-gray-400" htmlFor="">Release Date</label>
								<h5 className="text-xl">{game?.releaseDate}</h5>
							</div>
						</div>

						{/* platforms */}
						<div className="flex flex-row items-center space-x-3">
							<Laptop2Icon className="size-7 text-gray-400" />
							<div>
								<label className="text-gray-400" htmlFor="">Platforms</label>
								<h5 className="text-xl">{game?.platforms.join(', ')}</h5>
							</div>
						</div>

						{/* developer */}
						<div className="flex flex-row items-center space-x-3">
							<DollarSign className="size-7 text-gray-400" />
							<div>
								<label className="text-gray-400" htmlFor="">Developer</label>
								<h5 className="text-xl">{game?.developer}</h5>
							</div>
						</div>

						{/* publisher */}
						<div className="flex flex-row items-center space-x-3">
							<User className="size-7 text-gray-400" />
							<div>
								<label className="text-gray-400" htmlFor="">Publisher</label>
								<h5 className="text-xl">{game?.publisher}</h5>
							</div>
						</div>
					</div>
				</div>

				
			</div>
          </div>
	)
}