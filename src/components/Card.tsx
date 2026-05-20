"use client"

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Sparkles, Star } from "lucide-react";

import IGameInfo from "@/types/IGameInfo";

export default function Card({ slide, route }: { slide: IGameInfo, route: string }) {
	return (
		<Link href={route}>
			<div className="relative z-20 lg:w-full h-auto rounded-xl border border-white/30 hover:border-white/50">
				<div className="absolute inset-0 z-10 hover:from-white/30 hover:to-white/0 hover:bg-gradient-to-t rounded-xl"/>
					<div className="w-full h-[30vh] bg-cover bg-center bg-clip-content rounded-t-xl" style={{ backgroundImage: `url(${slide.coverImage})`}}/>
					<div className="p-7 space-y-5">
						<div className="space-y-2">
							<h2 className="text-2xl font-bold">{slide.title}</h2>
							<h4 className="text-lg text-gray-300">{slide.description}</h4>
						</div>
						<div className="flex flex-row">
							<div className="flex flex-row mr-auto">
								<Star className="text-yellow-500 bg-yellow-400 bg-clip-text mr-1"/>
								<span className="font-bold">{slide.rating}</span>/10
							</div>
							<div>
								Rp. {slide.price.toString()}
							</div>
						</div>
						<div className="flex flex-wrap space-x-2">
							{slide.genres.map((item, index) => {
								return (
									<div key={index} className="px-3 py-1 h-fit w-fit rounded-full bg-corange/20 text-corange border border-corange/40">
										{item}
									</div>
								)
							})}
						</div>
					</div>
			</div>
		</Link>
		
	)
}