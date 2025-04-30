'use client'

import { useEffect, useState } from 'react';

type Platform = 'windows' | 'macos' | 'linux';

/**
 * Returns the download URL for the latest GitHub Release asset
 * matching the given platform keyword.
 *
 * @param repo     GitHub “owner/repo”, e.g. "jmgrd98/httpro"
 * @param platform one of 'windows' | 'macos' | 'linux'
 */
export default function useLatestReleaseAsset(
  repo: string,
  platform: Platform
): { url: string | null; loading: boolean; error: Error | null } {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchRelease() {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);
        
        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }

        const data = await res.json();
        
        // Add explicit check for empty assets
        if (!data.assets || data.assets.length === 0) {
          throw new Error('No assets found in release');
        }

        const platformKeywords = {
          windows: ['win', 'windows', 'exe'],
          macos: ['mac', 'macos', 'dmg'],
          linux: ['linux', 'appimage']
        }[platform];

        const asset = data.assets.find((a: any) =>
          platformKeywords.some(keyword => 
            a.name.toLowerCase().includes(keyword)
        ));

        if (!asset) {
          throw new Error(`No ${platform} installer available`);
        }

        setUrl(asset.browser_download_url);

      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchRelease();
  }, [repo, platform]);

  return { url, loading, error };
}