import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/content/site";

import "./globals.css";
import { themeInit } from "./themeInit";


export const metadata: Metadata = {
	title: site.title,
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
				<script dangerouslySetInnerHTML={{ __html: themeInit }} />
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
				<a className="skip-link" href="#main">
					Skip to content
				</a>
				<SiteHeader />
				{children}
				<Analytics />
			</body>
		</html>
	);
}
