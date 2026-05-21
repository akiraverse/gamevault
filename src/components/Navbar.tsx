"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const menus = [
	{ menu: 'Home', route: '/' },
	{ menu: 'Games', route: '/games' },
	{ menu: 'Wishlist', route: '/wishlist' }
]

export const Navbar: React.FC = () => {
	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false)

	const handleNavClick = (route: string) => {
		setIsOpen(false)
		router.push(route)
	}

	return (
		<nav className="w-[95%] h-auto py-3 my-5 fixed mx-auto self-center z-50 bg-primary backdrop-blur-md bg-opacity-5 rounded-full">
			{/* Main Container */}
			<div className="flex w-[90%] self-center items-center mx-auto justify-between text-lg">

				{/* Logo */}
				<div className="flex-shrink-0">
					<Link href={'/'} className="font-extrabold text-[0.65rem] md:text-sm lg:text-lg font-pixel self-center">
						GameVault
					</Link>
				</div>

				{/* Desktop Menu - Hidden on mobile, Flex on lg */}
				<div className="hidden lg:flex flex-row items-center justify-end gap-2">
					{menus.map((item, index) => (
						<div key={index} className="px-6 py-3 hover:bg-white/10 hover:backdrop-blur-md rounded-full cursor-pointer transition">
							<button onClick={() => router.push(item.route)}>
								{item.menu}
							</button>
						</div>
					))}
				</div>

				{/* Mobile Hamburger Button - Visible on mobile, Hidden on lg */}
				<div className="lg:hidden">
					<button onClick={() => setIsOpen(!isOpen)} className="p-2">
						{isOpen ? (
							/* Close Icon */
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						) : (
							/* Menu Icon */
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						)}
					</button>
				</div>
			</div>

			{/* Mobile Dropdown Menu */}
			{isOpen && (
				<div className="lg:hidden absolute top-full left-0 w-full mt-2 px-4">
					<div className="w-[95%] mx-auto bg-primary rounded-2xl overflow-hidden shadow-lg border border-white/10">
						<div className="flex flex-col py-2">
							{menus.map((item, index) => (
								<button
									key={index}
									onClick={() => handleNavClick(item.route)}
									className="w-full text-left text-xs px-4 py-2 hover:bg-white/10 transition border-b border-white/5 last:border-none"
								>
									{item.menu}
								</button>
							))}
						</div>
					</div>
				</div>
			)}
		</nav>
	)
}