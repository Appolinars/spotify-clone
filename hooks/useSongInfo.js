import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState } from '../atoms/songAtom'
import useSpotify from './useSpotify'

const useSongInfo = () => {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [songInfo, setSongInfo] = useState(null)

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Autorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json())

        setSongInfo(trackInfo)
      }
    }

    fetchSongInfo()
  }, [])

  return songInfo
}

export default useSongInfo
