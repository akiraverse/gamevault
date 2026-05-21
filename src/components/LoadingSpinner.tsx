export function LoadingSpinner() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="relative">
				<div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
				<div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse" />
			</div>
		</div>
	);
}
