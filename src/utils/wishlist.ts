const WISHLIST_KEY = "gamevault_wishlist"

export function getWishlist(): string[] {
	if (typeof window === 'undefined') return []
	const stored = localStorage.getItem(WISHLIST_KEY)
	return stored ? JSON.parse(stored) : []
}

export function addToWishlist(gameId: string): void {
	const wishlist = getWishlist()
	if (!wishlist.includes(gameId)) {
		wishlist.push(gameId)
		localStorage.setItem(WISHLIST_KEY,JSON.stringify(wishlist))
		window.dispatchEvent(new Event('wishlist-updated'))
	}
}

export function removeFromWishlist(gameId: string): void {
	const wishlist = getWishlist()
	const filtered = wishlist.filter(id => id !== gameId)
	localStorage.setItem(WISHLIST_KEY, JSON.stringify(filtered))
	window.dispatchEvent(new Event('wishlist-updated'))
}

export function isInWishlist(gameId: string): boolean {
	return getWishlist().includes(gameId)
}

export function toggleWishlist(gameId: string): void {
	if (isInWishlist(gameId)) {
		removeFromWishlist(gameId)
	} else {
		addToWishlist(gameId)
	}
}