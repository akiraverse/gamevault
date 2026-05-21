import Link from "next/link";
import { Ghost, Home } from "lucide-react";

export function NotFoundPage() {
	return (
		<div className="container mx-auto px-4 py-20">
			<div className="max-w-md mx-auto text-center space-y-6">
			<div className="flex justify-center">
				<div className="relative">
				<Ghost className="w-32 h-32 text-primary" />
				<div className="absolute inset-0 bg-primary/20 blur-2xl" />
				</div>
			</div>

			<div className="space-y-2">
				<h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
				404
				</h1>
				<h2 className="text-2xl font-bold">Page Not Found</h2>
				<p className="text-muted-foreground">
				Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
				</p>
			</div>

			<Link
				href="/games"
				className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/50"
			>
				<Home className="w-5 h-5" />
				Back to Home
			</Link>
			</div>
		</div>
	);
}
