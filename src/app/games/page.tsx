"use client"

import { useState, useMemo } from "react"
import { Filter } from "lucide-react"
import { Card } from "@/components/Card"
import data from "@/data/games.json"
import IGameInfo from "@/types/IGameInfo"

export default function Games() {
	const games: IGameInfo[] = data

	const [sortBy, setSortBy] = useState('')
	const [startYear, setStartYear] = useState(2020)
	const [endYear, setEndYear] = useState(2026)

	const [searchQuery, setSearchQuery] = useState("")
	const [selectedGenres, setSelectedGenres] = useState<string[]>([])
	const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
	const [isShow, setIsShow] = useState(false)

	const toggleGenre = (genre: string) => {
		setSelectedGenres((prev) =>
			prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
		)
	}

	const togglePlatform = (platform: string) => {
		setSelectedPlatforms((prev) =>
			prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
		)
	}

	const allGenres = useMemo(() => {
		const genresSet = new Set<string>()
		games.forEach((game) => game.genres.forEach((genre) => genresSet.add(genre)))
		return Array.from(genresSet).sort()
	}, [games])

	const allPlatforms = useMemo(() => {
		const platformsSet = new Set<string>()
		games.forEach((game) => game.platforms.forEach((platform) => platformsSet.add(platform)))
		return Array.from(platformsSet).sort()
	}, [games])

	const filteredGames = useMemo(() => {
		let filtered = games

		if (searchQuery) {
			filtered = filtered.filter((game) =>
				game.title.toLowerCase().includes(searchQuery.toLowerCase())
			)
		}

		if (selectedGenres.length > 0) {
			filtered = filtered.filter((game) =>
				game.genres.some((genre) => selectedGenres.includes(genre))
			)
		}

		if (selectedPlatforms.length > 0) {
			filtered = filtered.filter((game) =>
				game.platforms.some((platform) => selectedPlatforms.includes(platform))
			)
		}

		if (startYear > 0 && endYear > 0) {
			filtered = filtered.filter((game) => {
				const year = new Date(game.releaseDate).getFullYear()
				return year >= startYear && year <= endYear
			})
		}

		filtered.sort((a, b) => {
			switch (sortBy) {
				case "rating":
					return b.rating - a.rating
				case "newest":
					return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
				case "price-low":
					return a.price - b.price
				case "price-high":
					return b.price - a.price
				case "alphabetical":
					return a.title.localeCompare(b.title)
				default:
					return 0
			}
		})

		return filtered
	}, [searchQuery, selectedGenres, selectedPlatforms, startYear, endYear, sortBy, games])

	const hasActiveFilters =
		searchQuery || selectedGenres.length > 0 || selectedPlatforms.length > 0 || startYear > 0 || endYear > 0

	const clearFilters = () => {
		setSearchQuery("")
		setSelectedGenres([])
		setSelectedPlatforms([])
		setStartYear(2020)
		setEndYear(2026)
		setSortBy("")
	}

	return (
		<div className="space-y-10 w-full">
			<section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 justify-center mt-24 sm:mt-32 lg:mt-52 space-y-8 sm:space-y-10">
				<h2 className="text-4xl sm:text-5xl lg:text-8xl font-extrabold bg-gradient-to-r from-cred via-accent to-amber-500 bg-clip-text text-transparent">
					Explore Games
				</h2>
				
				<div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full">
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="search games..."
						className="w-full p-4 sm:p-5 bg-lightPrimary rounded-lg border border-red-700 focus:border-red-400 focus:ring-0 focus:outline-none text-base"
					/>

					<button
						type="button"
						className="w-full sm:w-auto px-6 py-4 sm:py-3 bg-red-600/30 border border-red-700 hover:bg-red-700/50 rounded-lg flex flex-row items-center justify-center space-x-2 text-base sm:text-xl transition-colors"
						onClick={() => setIsShow(!isShow)}
					>
						<Filter className="w-5 h-5 sm:w-6 sm:h-6" />
						<p className="font-medium">Filter</p>
					</button>
				</div>

				{isShow && (
					<div className="w-full h-auto p-4 sm:p-6 lg:p-10 [&_label]:text-base sm:[&_label]:text-xl [&_p]:text-base bg-lightPrimary border border-red-700 rounded-lg space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
						<div className="space-y-2">
							<label className="block font-semibold">Sort By</label>
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className="w-full px-4 py-3 rounded-lg border border-red-600 bg-primary focus:border-primary focus:outline-none focus:ring-0 focus:ring-primary/20 transition-all text-xs md:text-base"
							>
								<option value="rating">Highest Rating</option>
								<option value="newest">Newest First</option>
								<option value="price-low">Price: Low to High</option>
								<option value="price-high">Price: High to Low</option>
								<option value="alphabetical">Alphabetical</option>
							</select>
						</div>

						<div className="space-y-2">
							<label className="block font-semibold">Genres</label>
							<div className="flex flex-wrap gap-2">
								{allGenres.map((genre) => (
									<button
										key={genre}
										type="button"
										onClick={() => toggleGenre(genre)}
										className={`px-4 py-2 rounded-full text-xs sm:text-base transition-all border-2 ${
											selectedGenres.includes(genre)
												? "bg-red-900 text-primary-foreground border-primary"
												: "bg-muted text-muted-foreground border-muted hover:border-primary"
										}`}
									>
										{genre}
									</button>
								))}
							</div>
						</div>

						<div className="space-y-2">
							<label className="block font-semibold">Platforms</label>
							<div className="flex flex-wrap gap-2">
								{allPlatforms.map((platform) => (
									<button
										key={platform}
										type="button"
										onClick={() => togglePlatform(platform)}
										className={`px-4 py-2 rounded-full text-xs sm:text-base transition-all border-2 ${
											selectedPlatforms.includes(platform)
												? "bg-red-900 text-primary-foreground border-primary"
												: "bg-muted text-muted-foreground border-muted hover:border-primary"
										}`}
									>
										{platform}
									</button>
								))}
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="block font-semibold">Start Year</label>
								<input
									value={startYear}
									onChange={(e) => setStartYear(Number(e.target.value))}
									type="number"
									id="start-year"
									name="start-year"
									placeholder="YYYY"
									min="1970"
									max="2030"
									className="w-full bg-primary px-4 py-3 rounded-lg border border-red-700 focus:border-red-400 focus:ring-0 focus:outline-none text-xs md:text-base"
								/>
							</div>
							<div className="space-y-2">
								<label className="block font-semibold">End Year</label>
								<input
									value={endYear}
									onChange={(e) => setEndYear(Number(e.target.value))}
									type="number"
									id="end-year"
									name="end-year"
									placeholder="YYYY"
									min="1970"
									max="2030"
									className="w-full bg-primary px-4 py-3 rounded-lg border border-red-700 focus:border-red-400 focus:ring-0 focus:outline-none text-xs md:text-base"
								/>
							</div>
						</div>

						{hasActiveFilters && (
							<button
								type="button"
								onClick={clearFilters}
								className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-all font-medium text-sm md:text-base"
							>
								Clear All Filters
							</button>
						)}
					</div>
				)}
			</section>

			<section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative pb-20">
				{filteredGames.length > 0 ? (
					filteredGames.map((game) => (
						<div key={game.id} className="w-full">
							<Card slide={game} route={`/games/${game.slug}`} />
						</div>
					))
				) : (
					<div className="col-span-1 sm:col-span-2 lg:col-span-3 2xl:col-span-4 text-center py-20">
						<p className="text-xl sm:text-2xl text-muted-foreground">
							No games found matching your filters
						</p>
						<button
							type="button"
							onClick={clearFilters}
							className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors"
						>
							Clear Filters
						</button>
					</div>
				)}
			</section>
		</div>
	)
}