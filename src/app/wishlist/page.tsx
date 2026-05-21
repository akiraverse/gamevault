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
			<div className="relative w-[90%] h-auto flex flex-col mx-auto justify-center mt-56">
				<h2 className="text-7xl font-extrabold bg-gradient-to-r from-cred via-accent to-amber-500 bg-clip-text text-transparent">
					Your Wishlisted Games
				</h2>
				<p className="text-xl text-gray-400 mt-10">Loading...</p>
			</div>
		)
	}

	return (
		<div className="relative w-[90%] h-auto flex flex-col mx-auto justify-center mt-56">
			<h2 className="text-7xl font-extrabold bg-gradient-to-r from-cred via-accent to-amber-500 bg-clip-text text-transparent">
				Your Wishlisted Games
			</h2>

			{filtered.length === 0 ? (
				<p className="text-xl text-gray-400 mt-10">No games in your wishlist yet.</p>
			) : (
				<div className="w-full h-auto grid grid-cols-3 place-items-center">
					{filtered.map((game) => (
						<div key={game.id} className="mr-5 mt-5">
							<Card slide={game} route={`/games/${game.slug}`} />
						</div>
					))}
				</div>
			)}
		</div>
	)
}