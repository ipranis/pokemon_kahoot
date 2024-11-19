import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

const pokemonFontSolid = localFont({ src: "../../public/Pokemon Solid.ttf" });
const pokemonFontHollow = localFont({ src: "../../public/Pokemon Hollow.ttf" });

export default function Home() {
  return (
    <Link key="Text" href="question">
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
        <main className="flex flex-col gap-10 row-start-2 items-center sm:items-start">
          <HollowText clname="text-9xl font-bold " text="Pokemon Kahoot" />
          <SolidText clname="text-xl italic " text="click anywhere to start" />
        </main>
      </div>
    </Link>
  );
}

export function SolidText({ clname, text }) {
  return <div className={clname + pokemonFontSolid.className}>{text}</div>;
}

export function HollowText({ clname, text }) {
  return <div className={clname + pokemonFontHollow.className}>{text}</div>;
}
