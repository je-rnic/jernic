import "./globals.css";
import localFont from "next/font/local";
import { Gloria_Hallelujah, Inter } from "next/font/google";
/* import Header from '../components/Header'; */

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const gloriaHallelujah = Gloria_Hallelujah({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-gloria-hallelujah",
});
const jnCustomFont = localFont({
	src: [{ path: "../../public/fonts/Jn_font_1-Regular.otf", weight: "400", style: "normal" }],
	variable: "--font-jn-custom",
	display: "swap",
});

export const metadata = {
	title: "Home",
	description: "An Archive of Me.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} ${inter.variable} ${gloriaHallelujah.variable} ${jnCustomFont.variable}`}
			>
				{/* <Header /> */}
				{children}
			</body>
		</html>
	);
}
