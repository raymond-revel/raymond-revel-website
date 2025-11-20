interface MusicPlayerProps {
  spotifyId?: string;
  appleMusicId?: string;
  title: string;
  album?: string;
  year?: string;
}

export default function MusicPlayer({ spotifyId, appleMusicId, title, album, year }: MusicPlayerProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        {album && (
          <p className="text-gray-600 dark:text-gray-400">{album} {year && `• ${year}`}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {spotifyId && (
          <div>
            <iframe
              style={{ borderRadius: '12px' }}
              src={`https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator`}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={`${title} on Spotify`}
            />
          </div>
        )}
        
        {appleMusicId && (
          <div>
            <iframe
              allow="autoplay *; encrypted-media *;"
              frameBorder="0"
              height="150"
              style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', borderRadius: '12px' }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src={`https://embed.music.apple.com/us/album/${appleMusicId}`}
              title={`${title} on Apple Music`}
            />
          </div>
        )}
      </div>
      
      <div className="mt-4 flex gap-4">
        {spotifyId && (
          <a
            href={`https://open.spotify.com/track/${spotifyId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-600 dark:text-green-400 hover:underline"
          >
            Open in Spotify →
          </a>
        )}
        {appleMusicId && (
          <a
            href={`https://music.apple.com/us/album/${appleMusicId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-pink-600 dark:text-pink-400 hover:underline"
          >
            Open in Apple Music →
          </a>
        )}
      </div>
    </div>
  );
}

