import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "../../auth";

export default async function Home() {
  const session = await auth();

  const text = session ? "Dashboard" : "Login";
  const link = session ? "/dashboard" : "/login";

  return (
    <div className="h-screen flex-col w-full dark:bg-black bg-white  dark:bg-grid-white/5 bg-grid-black relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <h1 className="text-2xl md:text-4xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b text-center from-neutral-200 to-neutral-500 pb-4">
        Ladeva Dashboard CMS
      </h1>
      <p className="text-xs md:text-sm max-w-5xl mx-auto text-center font-normal relative z-20 bg-clip-text text-transparent bg-neutral-400">
        Ladeva Dashboard CMS adalah sistem manajemen konten yang dibuat untuk
        memudahkan pengelolaan konten website.
      </p>
      <Button className="mt-10 px-8" asChild>
        <Link href={link}>{text}</Link>
      </Button>
    </div>
  );
}
