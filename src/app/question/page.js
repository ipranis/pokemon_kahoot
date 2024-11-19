"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const stats = ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"];

const maxMon = 809;
let maxSeconds = 60;
const incScore = 10;
const decScore = 5;
// const maxMon = 898;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function getPostemon(randint) {
  let [pmon, setPmon] = useState(undefined);
  //let retval = 0;
  useEffect(() => {
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: randint }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPmon(data);
        //console.log(data);
        //retval = JSON.parse(JSON.stringify(data));
        return data;
      });
  }, [randint]);
  // while (pmon === undefined) {}
  // console.log(pmon);
  // console.log(randint);
  // console.log(retval);
  // return retval;
  return pmon;
}

export default function Question() {
  const [getChosenStat, setChosenStat] = useState(getRand(stats.length));
  const router = useRouter();
  const [getSeconds, setSeconds] = useState(maxSeconds);
  const [score, setScore] = useState(0);
  const [randintP1, setRandIntP1] = useState(getRand(maxMon));
  let [randintP2, setRandIntP2] = useState(getRand(maxMon));
  while (randintP1 === randintP2) {
    setRandIntP2(getRand(maxMon));
  }
  useEffect(() => {
    if (getSeconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
    if (getSeconds === 0) {
      router.push("/fin?score=" + score);
    }
  }, [getSeconds]);
  const p1 = getPostemon(randintP1);
  const p2 = getPostemon(randintP2);
  function reset() {
    let x = ("" + score).length;
    setSeconds(Math.ceil(maxSeconds / x));
    setRandIntP1(getRand(maxMon));
    setRandIntP2(getRand(maxMon));
    setChosenStat(getRand(stats.length));
  }
  function isCorrect() {
    setScore(score + incScore);
    reset();
  }
  function isWrong() {
    setScore(score - decScore);
    reset();
  }
  let f1 = undefined;
  let f2 = undefined;
  if (!p1 || !p2) {
    return <div>Loading...</div>;
  }
  if (!p1.base) {
    console.log(p1);
    return <> this is to correct syntax hi in sublime </>;
  }
  if (!p2.base) {
    console.log(p2);
    return (
      <>
        <div> loading p2 died </div>
      </>
    );
  }
  if (p1["base"][stats[getChosenStat]] >= p2["base"][stats[getChosenStat]]) {
    f1 = isCorrect;
    f2 = isWrong;
  } else {
    f1 = isWrong;
    f2 = isCorrect;
  }
  return (
    <>
      <div className="flex flex-col items-center justify-items-center h-screen p-8 pb-20 gap-20 sm:p-20">
        <div className="flex flex-row items-center justify-items-center gap-40">
          <BigText text={getSeconds} />
          <QTitle text={stats[getChosenStat]} />
          <BigText text={score} />
        </div>
        <div className="flex flex-row items-center justify-items-center gap-40">
          <MakeImage f1={f1} p1={p1} />
          <MakeImage f1={f2} p1={p2} />
        </div>
      </div>
    </>
  );
}

// /

function MakeImage({ f1, p1 }) {
  const buttonClass = "outline-white border-8 rounded-3xl p-10 hover:bg-white";
  return (
    <button className={buttonClass} onClick={f1}>
      <Image
        src={"/hires/" + getLen3(p1["id"]) + ".png" /*"*/}
        width={400}
        height={400}
        alt='{p1["name"]["english"]}'
      />
    </button>
  );
}

function BigText({ text }) {
  return <span className="text-3xl">{text}</span>;
}

function getLen3(i) {
  return i.toString().length === 3
    ? i.toString()
    : i.toString().length === 2
      ? "0" + i.toString()
      : "00" + i.toString();
}

function getRand(i) {
  return Math.floor(Math.random() * i);
}

export function QTitle({ text }) {
  return (
    <div className="flex flex-row items-center gap-8 text-3xl">
      Which Pokemon has the higher base {text}?
    </div>
  );
}