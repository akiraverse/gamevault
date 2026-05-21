"use client"

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Sparkles, Star } from "lucide-react";
import { useRouter } from "next/navigation";

import IGameInfo from "@/types/IGameInfo";

export const SlidingBanner = ({ slides }: { slides: IGameInfo[] }) => {
	const router = useRouter()
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isPaused, setIsPaused] = useState(false)
	const autoPlayRef = useRef<number | null>(null)
	const TIMEOUT_DURATION = 2000

	const nextSlide = () => {
		setCurrentIndex((prev) => (prev == slides.length - 1 ? 0 : prev + 1))
	}

	const prevSlide = () => {
		setCurrentIndex((prev) => (prev == 0 ? slides.length - 1 : prev - 1))
	}

	const startAutoPlay = () => {
		if (autoPlayRef.current) window.clearInterval(autoPlayRef.current)
		autoPlayRef.current = window.setInterval(() => {
			nextSlide()
		}, TIMEOUT_DURATION)
	}

	const stopAutoPlay = () => {
		if (autoPlayRef.current) {
			clearInterval(autoPlayRef.current)
			autoPlayRef.current = null
		}
		setIsPaused(true);
		
		setTimeout(() => {
			setIsPaused(false)
			startAutoPlay()
		}, TIMEOUT_DURATION)
	}

	useEffect(() => {
		startAutoPlay();
		return () => stopAutoPlay(); 
	}, [currentIndex])

	const goToSlide = (index: number) => {
		setCurrentIndex(index)
		stopAutoPlay()
	};

	return (
    	<div 
		className="relative w-full h-[100vh] overflow-hidden group"
		onMouseEnter={stopAutoPlay} 
		onMouseLeave={() => { if(isPaused) startAutoPlay() }} 
	>

     {/* Slides Container */}
	<div 
		className="flex transition-transform duration-700 ease-in-out h-full"
		style={{ transform: `translateX(-${currentIndex * 100}%)` }}
	>
		{/* mapping through featured games */}
		{slides.map((slide, index) => (
		<div 
			key={index} 
			className={`relative min-w-full h-full flex items-center justify-center`}
		>
			<div className="absolute w-full h-full bg-cover bg-no-repeat" style={{ backgroundImage: `url(${slide.coverImage})`}}/>
			<div className="absolute h-full inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
			<div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />

			<div className="relative w-[90%] h-full container mx-auto px-4 flex items-center">
				<div className="w-full lg:w-[70%] flex flex-col space-y-[1vh] sm:space-y-[3vh]">
					<div className="space-x-2 lg:space-x-3 flex flex-row">
						<Sparkles className="size-[1.7vh] sm:size-[2vh] lg:size-[1.5vw] font-semibold text-gray-200"/>
						<p className="text-[1.7vh] sm:text-[2vh] lg:text-[1.5vw] font-semibold text-gray-200">FEATURED</p>
					</div>
				
					<div className="text-[6vh] sm:text-[6.5vh] lg:text-[6vw] leading-[1.1] font-extrabold bg-gradient-to-r from-cred via-accent to-amber-500 bg-clip-text text-transparent">{slide.title}</div>
					<h4 className="text-[1.7vh] sm:text-[2vh] lg:text-[1.5vw]">{slide.longDescription.split('\n\n')[0]}</h4>

					<div className="flex flex-wrap">
					{slide.genres.map((item, index) => (
						<div className="text-[1.7vh] sm:text-[2vh] lg:text-[1.5vw] px-3 py-1 mb-[1.5vh] mr-[1.5vh] h-fit w-fit rounded-full bg-corange/20 text-corange border border-corange/40" key={index}>
						{item}
						</div>
					))}
					</div>

					<div className="text-[1.7vh] sm:text-[2vh] lg:text-[1.5vw] flex flex-col lg:flex-row lg:space-x-3">
						<button className="px-5 py-3 w-fit h-fit border border-white hover:bg-white/30 rounded-md text-white" onClick={() => (router.push(`/games/${slide.slug}`))}>
							View Details
						</button>
						<div className="px-0 lg:px-5 py-3 w-fit h-fit flex flex-row space-x-2">
							Rating: <br /> <span className="font-bold">{slide.rating} / 10</span> 
						</div>
					</div>

				</div>
			</div>
          </div>
        ))}
      </div>

      {/* Previous Button */}
	<button
		onClick={() => { prevSlide(); stopAutoPlay(); }}
		className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
		aria-label="Previous Slide"
	>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
			<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
		</svg>
	</button>

      {/* Next Button */}
	<button
		onClick={() => { nextSlide(); stopAutoPlay(); }}
		className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
		aria-label="Next Slide"
	>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
			<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
		</svg>
	</button>

     {/* Indicators (Dots) */}
	<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
		{slides.map((_, index) => (
			<button
				key={index}
				onClick={() => goToSlide(index)}
				className={`w-3 h-3 rounded-full transition-all duration-300 ${
					currentIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
				}`}
				aria-label={`Go to slide ${index + 1}`}
			/>
		))}
	</div>
      
     {/* Optional: Pause Indicator Icon */}
	{isPaused && (
		<div className="absolute top-4 right-4 text-white/50 text-xs bg-black/20 px-2 py-1 rounded backdrop-blur-sm">
			Paused
		</div>
	)}
    </div>
  );
}