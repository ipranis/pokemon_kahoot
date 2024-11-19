import { promises as fs } from "fs";
import { NextResponse } from "next/server";

const maxMon = 151;

export async function GET() {
	let x = await getPokemon();
	return Response.json(x);
}

export async function POST(request) {
	const messages = await request.json();
	const data = await getData();
	return Response.json(data[messages["id"]]);
}

async function getPokemon() {
	const data = await getData();
	const pokemon1 = getRand(maxMon);
	return data[pokemon1];
}

async function getData() {
	return JSON.parse(
		await fs.readFile(process.cwd() + "/public/pokedex.json", "utf8"),
	);
}

function getRand(i) {
	return Math.floor(Math.random() * i);
}
