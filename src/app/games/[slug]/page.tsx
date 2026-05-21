"use client"

import { Sparkles, Star, Calendar, Laptop2Icon, DollarSign, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { getWishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist } from "@/utils/wishlist";
import data from "@/data/games.json"
import IGameInfo from "@/types/IGameInfo";
import { NotFoundPage } from "@/components/NotFoundPage";

export default function Game({params}: {params: Promise<{slug: string}>}) {
	const router = useRouter()
	const { slug } = React.use(params);

	const games: IGameInfo[] = data
	const game: IGameInfo | undefined = games.find((g) => (g.slug === slug))
	const [inWishlist, setInWishlist] = useState(false)
	const gameId = String(game?.id)
	
	if (!game) {
		return <NotFoundPage/>
	}

	useEffect(() => {
		if (game) {
			setInWishlist(isInWishlist(gameId));
		}
	}, [game]);

	useEffect(() => {
		if (game) {
			const updateWishlist = () => setInWishlist(isInWishlist(gameId));
			window.addEventListener('wishlist-updated', updateWishlist);
			return () => window.removeEventListener('wishlist-updated', updateWishlist);
		}
	}, [game]);

	const handleWishlistClick = () => {
		toggleWishlist(gameId);
	};

	if (!game) {
		return (
			<div className="w-full min-h-screen flex items-center justify-center">
				<p className="text-xl text-gray-400">Game not found</p>
			</div>
		)
	}

	return (
		<div className={`relative w-full min-h-screen flex flex-col items-center`}>
			<div className="relative z-30 w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] xl:h-[80vh] mt-16 sm:mt-20">
				<div className="absolute z-10 inset-0 bg-gradient-to-b from-primary via-transparent to-primary" />
				<div className="absolute z-10 inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
				<img className="absolute z-0 w-full h-full object-cover" src={game?.coverImage} alt={game?.title} />
			</div>

			<div className="relative container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1600px] h-full flex flex-col items-center -mt-20 sm:-mt-24 lg:-mt-32 z-40 pb-20">

				<div className="w-full flex flex-col space-y-6 sm:space-y-8">

					<button 
						className="h-fit w-fit px-4 sm:px-5 py-2 sm:py-3 bg-red-900 text-red-300 hover:bg-red-700 hover:text-white rounded-lg text-sm sm:text-base transition-colors" 
						onClick={() => (router.back())}
					>
						{'< Go Back'}
					</button>

					<div className="flex flex-col float-left mr-auto lg:flex-row items-center justify-between gap-4 lg:gap-0">
						<h1 className="float-left mr-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-extrabold bg-gradient-to-r from-cred via-accent to-amber-500 bg-clip-text text-transparent text-left">
							{game?.title}
						</h1>
						{game?.featured && (
							<div className="float-left mr-auto lg:ml-5 w-auto flex flex-row items-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
								<Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-gray-200"/>
								<p className="text-sm sm:text-lg font-semibold text-gray-200">FEATURED</p>
							</div>
						)}
					</div>
					
					<div className="space-y-3 p-4 sm:p-6 lg:p-10 border border-red-900 rounded-lg hover:border-red-500 transition-colors bg-lightPrimary/50 backdrop-blur-sm">
						<label className="text-xl sm:text-2xl font-bold">About</label>
						<p className="text-base sm:text-lg leading-relaxed">{game?.longDescription}</p>
					</div>

					<div className="space-y-3 p-4 sm:p-6 lg:p-10 border border-red-900 rounded-lg hover:border-red-500 transition-colors bg-lightPrimary/50 backdrop-blur-sm">
						<label className="text-xl sm:text-2xl font-bold">Genres</label>
						<div className="flex flex-wrap gap-2 sm:gap-3">
							{game?.genres.map((item, index) => (
								<span 
									key={index} 
									className="text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-corange/20 text-corange border border-corange/40"
								>
									{item}
								</span>
							))}
						</div>	
					</div>	
					
					<div className="w-full p-4 sm:p-6 lg:p-10 border border-red-900 rounded-lg hover:border-red-500 transition-colors bg-lightPrimary/50 backdrop-blur-sm space-y-4 sm:space-y-6">
						<label className="text-xl sm:text-2xl font-bold">Screenshots</label>
						<div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
							{game?.screenshots.map((screenshot, index) => (
								<div 
									key={index} 
									className="relative w-full aspect-video overflow-hidden rounded-lg border border-red-900 hover:border-red-500 transition-colors group"
								>
									<img 
										className="w-full h-full rounded-lg object-cover group-hover:scale-110 transition-transform duration-300" 
										src={screenshot} 
										alt={`${game?.title} screenshot ${index + 1}`} 
									/>
								</div>
							))}
						</div>
					</div>
					
					{/* further info section */}
					<div className="w-full p-4 sm:p-6 lg:p-10 border border-red-900 rounded-lg hover:border-red-500 transition-colors bg-lightPrimary/50 backdrop-blur-sm space-y-6 sm:space-y-8">
						
						{/* user rating */}
						<div className="flex flex-row items-center justify-between sm:justify-start space-x-2 sm:space-x-3">
							<span className="text-base sm:text-lg">User Rating</span>
							<div className="flex flex-row items-center">
								<span className="text-xl sm:text-2xl font-bold text-yellow-500">{game?.rating}</span>
								<span className="text-base sm:text-lg text-gray-400">/10</span>
							</div>
						</div>

						<hr className="border border-red-900/70"/>
						
						{/* price */}
						<div className="text-2xl sm:text-3xl lg:text-4xl font-black">
							Rp. {game?.price.toLocaleString()}
						</div>

						{/* add to wishlist */}
						<button 
							onClick={handleWishlistClick}
							className={`w-full p-4 sm:p-5 rounded-lg border border-red-900 transition-all ${
								inWishlist
									? "text-red-500 bg-red-900 hover:bg-red-800"
									: "bg-lightPrimary hover:bg-red-900/30 hover:text-red-400"
							}`}
						>
							{inWishlist ? "Remove from Wishlist" : "Add To Wishlist"}
						</button>

						<hr className="border border-red-900/70"/>
						
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
							
							{/* release date */}
							<div className="flex flex-row items-center space-x-3">
								<Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-gray-400" />
								<div>
									<label className="text-sm sm:text-base text-gray-400">Release Date</label>
									<h5 className="text-base sm:text-lg">{game?.releaseDate}</h5>
								</div>
							</div>

							{/* platforms */}
							<div className="flex flex-row items-center space-x-3">
								<Laptop2Icon className="w-6 h-6 sm:w-7 sm:h-7 text-gray-400" />
								<div>
									<label className="text-sm sm:text-base text-gray-400">Platforms</label>
									<h5 className="text-base sm:text-lg">{game?.platforms.join(', ')}</h5>
								</div>
							</div>

							{/* developer */}
							<div className="flex flex-row items-center space-x-3">
								<DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-gray-400" />
								<div>
									<label className="text-sm sm:text-base text-gray-400">Developer</label>
									<h5 className="text-base sm:text-lg">{game?.developer}</h5>
								</div>
							</div>

							{/* publisher */}
							<div className="flex flex-row items-center space-x-3">
								<User className="w-6 h-6 sm:w-7 sm:h-7 text-gray-400" />
								<div>
									<label className="text-sm sm:text-base text-gray-400">Publisher</label>
									<h5 className="text-base sm:text-lg">{game?.publisher}</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}