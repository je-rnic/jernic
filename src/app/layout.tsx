import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SmoothScrollInitializer from "@/components/SmoothScrollInitializer";
import { site } from "@/content/site";

import "./globals.css";

export const metadata: Metadata = {
	title: { default: site.title, template: `%s — ${site.name}` },
	description: site.description,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<Script src="/theme-init.js" strategy="beforeInteractive" />
				<noscript>
					<style>{".fade-image { opacity: 1 !important; }"}</style>
				</noscript>
				<link
					rel="preload"
					href="/fonts/Inter-latin-wght-normal.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/fonts/Jn_font_175scaled-Regular.otf"
					as="font"
					type="font/otf"
					crossOrigin="anonymous"
				/>
			</head>
			<body>
				<SmoothScrollInitializer />
				<a className="skip-link" href="#main">
					Skip to content
				</a>
				<SiteHeader />
				{children}
				<SiteFooter />
				<Analytics />
			</body>
		</html>
	);
}
