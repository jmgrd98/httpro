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
        const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
          headers: {
            Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
          },
        });
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const data = await res.json();
        // Find first asset whose name includes the platform keyword
        const asset = (data.assets as Array<any>).find(a =>
          a.name.toLowerCase().includes(platform)
        );
        if (asset && asset.browser_download_url) {
          setUrl(asset.browser_download_url);
        } else {
          console.warn(`No asset matching "${platform}" found.`);
        }
      } catch (err) {
        console.error('Failed to fetch GitHub release:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchRelease();
  }, [repo, platform]);

  return { url, loading, error };
}
