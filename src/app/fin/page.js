"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import localFont from "next/font/local";

const pokemonFontSolid = localFont({
	src: "../../../public/Pokemon Solid.ttf",
});
const pokemonFontHollow = localFont({
	src: "../../../public/Pokemon Hollow.ttf",
});

export default function GetFin() {
	const searchParams = useSearchParams();
	let score = searchParams.get("score");
	return (
		<div className="flex flex-row items-center justify-items-center h-screen">
			<div className="flex flex-col items-center justify-items-center gap-20 w-screen ">
				<HollowText
					clname="tracking-wider text-8xl"
					text={"You Scored " + score}
				/>
				<Link href="question">
					<button className="border-2 border-white rounded-lg text-white cursor-pointer hover:bg-white hover:text-black">
						<SolidText
							clname={"tracking-widest text-3xl px-20 py-5 "}
							text={"again"}
						/>
					</button>
				</Link>
			</div>
		</div>
	);
}
export function HollowText({ clname, text }) {
	return (
		<span className={clname + " " + pokemonFontHollow.className}>
			{text}
		</span>
	);
}
// /

export function SolidText({ clname, text }) {
	return <div className={clname + pokemonFontSolid.className}>{text}</div>;
}

/*
			<div className="flex flex-row items-center justify-items-center">
			</div>
*/
