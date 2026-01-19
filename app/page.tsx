import Link from "next/link";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col items-center">
			<div className="flex-1 w-full flex flex-col gap-12 items-center">
				<nav className="w-full flex justify-center border-b border-b-foreground/10 h-12">
					<div className="w-full max-w-5xl flex justify-between items-center px-4 text-sm">
						<div className="flex gap-4 items-center font-semibold">
							<Link href={"/"}>Home</Link>
						</div>
						<Suspense>
							<AuthButton />
						</Suspense>
					</div>
				</nav>
				<div className="flex-1 flex flex-col gap-12 max-w-5xl px-4">
					<div className="flex flex-col gap-2 items-center">
						<h1 className="text-3xl font-bold">Welcome</h1>
						<p className="text-sm text-muted-foreground">
							Get started by editing this page.
						</p>
					</div>
				</div>

				<footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-4 py-8">
					<ThemeSwitcher />
				</footer>
			</div>
		</main>
	);
}
