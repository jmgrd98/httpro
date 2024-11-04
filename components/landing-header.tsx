'use client'

import { useRouter } from "next/navigation"
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const LandingHeader = () => {
    const router = useRouter();
  return (
    <div className='bg-zinc-900 w-full h-20 flex items-center justify-between px-5 py-2 text-white'>
      <div className="flex items-center gap-5">
        <Image src={'/HTTPro.svg'} width={60} height={60} alt="HTTPro" />
        <Link href="https://github.com/jmgrd98/httpro" className="flex items-center gap-2 hover:text-blue-600 transition duration-100">
            <p>Star on Github</p>
            <FaGithub className="w-5 h-5" />
        </Link>
      </div>
      
      <Button onClick={() => router.push('/sign-in')} variant={'primary'}>
        Go to app
      </Button>
    </div>
  )
}

export default LandingHeader
