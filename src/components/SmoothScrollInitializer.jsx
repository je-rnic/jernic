"use client";

import { useEffect } from "react";

export default function SmoothScrollInitializer() {
	useEffect(() => {
		let locomotiveScroll;

		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			const element = document.querySelector(".smooth-scroll");
			if (!element) {
				return;
			}

			locomotiveScroll = new LocomotiveScroll({
				el: element,
				smooth: true,
				smoothMobile: true,
			});
		})();

		return () => {
			if (locomotiveScroll) {
				locomotiveScroll.destroy();
			}
		};
	}, []);

	return null;
}
