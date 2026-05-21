 "use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart, Star } from "lucide-react";
import { isInWishlist, toggleWishlist } from "@/utils/wishlist";
import IGameInfo from "@/types/IGameInfo";

export const Card = ({ slide, route }: { slide: IGameInfo, route: string }) => {
	const [inWishlist, setInWishlist] = useState(false);
	useEffect(() => {
		setInWishlist(isInWishlist(slide.id));
	}, [slide.id]);
	useEffect(() => {
		const updateWishlist = () => setInWishlist(isInWishlist(slide.id));
		
		window.addEventListener('wishlist-updated', updateWishlist);
		return () => window.removeEventListener('wishlist-updated', updateWishlist);
	}, [slide.id]);

	const handleWishlistClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		toggleWishlist(String(slide.id));
	};

	return (
		<Link href={route}>
			<div className="relative z-20 lg:w-full h-auto rounded-xl border border-white/30 hover:border-red-700/50 transition-colors">
				<div className="absolute inset-0 z-10 hover:from-red-700/30 hover:to-red-700/0 hover:bg-gradient-to-t rounded-xl"/>
				
				<button
					onClick={handleWishlistClick}
					className="absolute z-50 top-2 right-2 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-white hover:bg-card transition-all"
				>
					<Heart
						className={`w-5 h-5 transition-colors ${
							inWishlist ? "fill-white text-primary" : "text-muted-foreground"
						}`}
					/>
				</button>

				<div 
					className="w-full h-[30vh] bg-cover bg-center bg-clip-content rounded-t-xl" 
					style={{ backgroundImage: `url(${slide.coverImage})`}}
				/>

				<div className="p-7 space-y-5">
					<div className="space-y-2">
						<h2 className="text-2xl font-bold">{slide.title}</h2>
						<h4 className="text-lg text-gray-300">{slide.description}</h4>
					</div>
					
					<div className="flex flex-row items-center">
						<div className="flex flex-row mr-auto items-center">
							<Star className="text-yellow-500 w-5 h-5 mr-1 fill-yellow-500"/>
							<span className="font-bold">{slide.rating}</span>/10
						</div>
						<div className="text-gray-300">
							Rp. {slide.price.toLocaleString()}
						</div>
					</div>

					<div className="flex flex-wrap">
						{slide.genres.map((item, index) => (
							<div key={index} className="px-3 py-1 my-1 mr-1 h-fit w-fit rounded-full bg-corange/20 text-corange border border-corange/40">
								{item}
							</div>
						))}
					</div>
				</div>
			</div>
		</Link>
	)
}