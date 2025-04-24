'use client'

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import useLatestReleaseAsset from '../hooks/useLatestReleaseAsset';

function detectPlatform(): 'windows' | 'macos' | 'linux' {
  const p = (navigator.platform || '').toLowerCase();
  if (p.includes('win')) return 'windows';
  if (p.includes('mac')) return 'macos';
  return 'linux';
}


const LandingHeader = () => {
  const router = useRouter();
  const platform = detectPlatform();
  // Pass your GitHub repo “owner/name” here:
  const downloadUrl = useLatestReleaseAsset('jmgrd98/httpro', platform);

  const handleDownload = () => {
    if (downloadUrl) {
      // This will navigate the browser to the installer URL,
      // triggering a download.
      window.location.href = downloadUrl;
    } else {
      alert('Fetching latest installer… please try again in a moment.');
    }
  };

  return (
    <div className="bg-zinc-900 w-full h-20 flex items-center justify-between px-5 py-2 text-white">
      <div className="flex items-center gap-5">
        <Image src="/HTTPro.svg" width={60} height={60} alt="HTTPro" />
        <Link
          href="https://github.com/jmgrd98/httpro"
          className="flex items-center gap-2 hover:text-blue-600 transition duration-100"
        >
          <p>Star on GitHub</p>
          <FaGithub className="w-5 h-5" />
        </Link>
      </div>

      <div className="flex items-center gap-5">
        <Button onClick={handleDownload} variant="secondary">
          Download desktop app
        </Button>
        <Button onClick={() => router.push('/sign-in')} variant="primary">
          Go to web app
        </Button>
      </div>
    </div>
  );
};

export default LandingHeader;
