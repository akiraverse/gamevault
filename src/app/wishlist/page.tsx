"use client"

import { useState, useEffect } from "react"
import { getWishlist } from "@/utils/wishlist"
import { Card } from "@/components/Card"
import data from "@/data/games.json"
import IGameInfo from "@/types/IGameInfo"

export default function Wishlist() {
	const games: IGameInfo[] = data
	const [wishlist, setWishlist] = useState<string[]>([])
    const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
		setWishlist(getWishlist())

		const handleWishlistUpdate = () => setWishlist(getWishlist())
		window.addEventListener('wishlist-updated', handleWishlistUpdate)
		return () => window.removeEventListener('wishlist-updated', handleWishlistUpdate)
	}, [])

	const filtered = games.filter((game) => wishlist.includes(String(game.id)))

	if (!isClient) {
		return (
			<div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center mt-24 sm:mt-32 lg:mt-52">
				<h2 className="text-4xl sm:text-5xl lg:text-8xl font-extrabold bg-gradient-to-r from-cred via-accent to-amber-500 bg-clip-text text-transparent">
					Your Wishlisted Games
				</h2>
				<p className="text-lg sm:text-xl text-gray-400 mt-6 sm:mt-10">Loading...</p>
			</div>
		)
	}

	return (
		<div className="w-full min-h-screen">
			<section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center mt-24 sm:mt-32 lg:mt-52 pb-20">
				<h2 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-cred via-accent to-amber-500 bg-clip-text text-transparent">
					Your Wishlisted Games
				</h2>

				{filtered.length === 0 ? (
					<div className="w-full text-center py-20">
						<p className="text-xl sm:text-2xl text-gray-400">
							No games in your wishlist yet.
						</p>
						<p className="text-sm sm:text-base text-gray-500 mt-4">
							Browse the games page to add some!
						</p>
					</div>
				) : (
					<div className="w-full mx-auto justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative mt-10">
						{filtered.map((game) => (
							<div key={game.id} className="w-full">
								<Card slide={game} route={`/games/${game.slug}`} />
							</div>
						))}
					</div>
				)}
			</section>
		</div>
	)
}