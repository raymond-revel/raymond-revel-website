export interface Album {
  title: string;
  year: string;
  type: 'album' | 'single' | 'ep';
  spotifyId?: string;
  appleMusicId?: string;
  coverArt?: string;
  tracks?: Track[];
}

export interface Track {
  title: string;
  spotifyId?: string;
  appleMusicId?: string;
  duration?: string;
}

/**
 * Discography data
 * 
 * To get Spotify track/album IDs:
 * 1. Open the track/album on Spotify
 * 2. Click "Share" → "Copy link to track/album"
 * 3. The ID is the last part of the URL (after /track/ or /album/)
 * 
 * To get Apple Music IDs:
 * 1. Open the track/album on Apple Music
 * 2. Copy the URL
 * 3. The ID format varies - check the URL structure
 */
export const discography: Album[] = [
  // Singles
  {
    title: 'Paper Boat',
    year: '2025',
    type: 'single',
    spotifyId: '1CkRBjL8QDdkDZ7upp7VeQ',
    appleMusicId: '1849659961',
  },
  {
    title: 'November In Me',
    year: '2025',
    type: 'single',
    spotifyId: '2jXyVjp1TQtKS5RPGGVAAi',
    appleMusicId: '1853851196',
  },
  {
    title: 'Ghosts On The Beach',
    year: '2025',
    type: 'single',
    spotifyId: '7acWx9s2xbpjljXe9ONo44',
    appleMusicId: '1822857264',
  },
  {
    title: 'Superglue',
    year: '2024',
    type: 'single',
    spotifyId: '0zjPTyPqrRUsP2BfOsPiPO',
    appleMusicId: '1764713972',
  },
  {
    title: 'Her',
    year: '2024',
    type: 'single',
    spotifyId: '0a609WapJPb8QxwPWsLuqA',
    appleMusicId: '1809252170',
  },
  {
    title: 'Elevator Music',
    year: '2023',
    type: 'single',
    spotifyId: '6FUF3R9BKwdE1RLDT2ed9C',
    appleMusicId: '1797871084',
  },
  {
    title: 'The Christmas Song',
    year: '2020',
    type: 'single',
    spotifyId: '6BkDqGkiDKFTqigtFWWB2c',
    // appleMusicId: 'YOUR_APPLE_MUSIC_ID_HERE',
  },
  // Albums
  {
    title: 'Freefall',
    year: '2024',
    type: 'single',
    spotifyId: '4t25XOXcvDXecxERNjWigj',
    appleMusicId: '1745006721',
  },
  {
    title: 'Electric',
    year: '2023',
    type: 'single',
    spotifyId: '33BnCw7qZfiE7zs6fczi1o',
    appleMusicId: '1688796490',
  },
  {
    title: 'The Living Room',
    year: '2021',
    type: 'album',
    // spotifyId: 'YOUR_SPOTIFY_ALBUM_ID_HERE',
    // appleMusicId: 'YOUR_APPLE_MUSIC_ID_HERE',
  },
  {
    title: 'Sunrise',
    year: '2018',
    type: 'single',
    spotifyId: '2nzrd4xmwFyKwwoURFEAuU',
    // appleMusicId: 'YOUR_APPLE_MUSIC_ID_HERE',
  },
];

export const popularTracks: Track[] = [
  { title: 'Freefall', spotifyId: '4t25XOXcvDXecxERNjWigj' },
  { title: 'Sunrise', spotifyId: '2nzrd4xmwFyKwwoURFEAuU' },
  { title: 'Her', spotifyId: '0a609WapJPb8QxwPWsLuqA' },
  { title: 'Ghosts On The Beach', spotifyId: '7acWx9s2xbpjljXe9ONo44' },
  { title: 'Elevator Music', spotifyId: '6FUF3R9BKwdE1RLDT2ed9C' },
];

