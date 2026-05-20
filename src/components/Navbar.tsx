"use client"

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
	const menus: string[] = ['Home', 'Games', 'Wishlist']
	const [isOpen, setIsOpen] = useState(false)

	return (
		<nav className="w-[95%] h-auto py-3 my-5 fixed mx-auto self-center z-50 bg-primary backdrop-blur-md bg-opacity-5 rounded-full">
			{/* desktop menu */}
			<div className="flex lg:flex-row w-[90%] self-center items-center mx-auto justify-between text-lg">

				{/* Logo */}
				<div className="w-1/4 mr-auto">
					<Link href={'/'} className="font-extrabold text-lg lg:float-left font-pixel self-center">
						GameVault
					</Link>
				</div>


				{/* Menus */}
				<div className="w-2/4 justify-center flex lg:flex-row">
					{menus.map((item, index) => (
						<div key={index} className="px-6 py-3 hover:bg-white/10 hover:backdrop-blur-md rounded-full">
							<Link href={`/${item.toString().toLowerCase()}`} className="">
								{item}
							</Link>
						</div>
					))}
				</div>

				{/* Contact */}
				<div className="w-1/4">
					<Link href={'/contact'} className="lg:float-right">
						Contact
					</Link>
				</div>
			</div>

			{/* mobile menu */}
      	</nav>
	)
}