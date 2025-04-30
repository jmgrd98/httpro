'use client'

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import useLatestReleaseAsset from '../hooks/useLatestReleaseAsset';

function detectPlatform(): 'windows' | 'macos' | 'linux' {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('win')) return 'windows';
  if (userAgent.includes('mac')) return 'macos';
  if (userAgent.includes('linux')) return 'linux';

  const p = (navigator.platform || '').toLowerCase();
  if (p.includes('win')) return 'windows';
  if (p.includes('mac')) return 'macos';
  return 'linux';
}


const LandingHeader = () => {
  const router = useRouter();
  const platform = detectPlatform();

  const { url, loading, error } = useLatestReleaseAsset('jmgrd98/httpro', platform);


  const handleDownload = () => {
    if (error) {
      alert(error.message); // Show specific error message
      return;
    }
    if (!url) {
      alert('Download not available for your platform');
      return;
    }
    window.location.href = url;
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
        <Button 
          onClick={handleDownload} 
          variant="secondary"
          disabled={loading}
          >
          {loading ? 'Loading...' : 'Download desktop app'}
        </Button>
        <Button onClick={() => router.push('/sign-in')} variant="primary">
          Go to web app
        </Button>
      </div>
    </div>
  );
};

export default LandingHeader;
