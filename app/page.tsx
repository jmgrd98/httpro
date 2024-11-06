'use client'

import LandingHeader from "@/components/landing-header";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  if (isSignedIn) {
    router.push('/app');
  };
  
  return (
    <>
      <LandingHeader />
      <div className="flex bg-black/90 text-white h-screen p-10 flex-col gap-3">
        <p className="text-6xl font-bold">APIs made simple.</p>
        <p className="text-2xl ">Test your APIs online or on your machine.</p>
        <Image src={'/illustration.svg'} width={400} height={400} alt="HTTPro" className="mt-10" />
        <Link href={'https://github.com/jmgrd98'} target="_blank" className="hover:text-blue-600 text-center">Created by João Marcelo Dantas</Link>
      </div>
    </>
  );
}
