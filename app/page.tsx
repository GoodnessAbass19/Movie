import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-home  bg-center bg-cover bg-no-repeat">
      <div className="w-full bg-black/50 absolute min-h-screen"></div>

      <div className="w-full absolute min-h-screen overflow-hidden mx-auto flex flex-col justify-center items-center">
        <div className=" max-w-screen-md mx-auto flex flex-col justify-center items-center">
          <h2 className="text-center text-white font-semibold lg:text-4xl text-2xl capitalize">
            Welcome to Movie zone where you can check out different movies and
            tv-shows and also their trailer
          </h2>
          <button className="bg-cyan-500 p-3 m-5 rounded-md text-2xl font-semibold">
            <Link href={"home"}>View website</Link>
          </button>
        </div>
      </div>
    </main>
  );
}
