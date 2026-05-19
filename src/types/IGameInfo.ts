export default interface IGameInfo {
	id: number,
	title: string,
	slug: string,
	coverImage: string,
	screenshots: string[],
	description: string,
	longDescription: string,
	genres: string[],
	platforms: string[],
	developer: string,
	publisher: string,
	releaseDate: string,
	rating: number,
	price: number,
	tags: string[],
	featured: boolean
}