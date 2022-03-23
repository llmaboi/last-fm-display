import LastFm from '@toplast/lastfm';

export async function aquireTrackInfo(): Promise<void | ImageObject> {
  const lastFm = new LastFm('714dded81c15fed04aadcee11ff37184');

  try {
    const recentTracksResp = await lastFm.user.getRecentTracks({
      user: 'llmaboi',
      limit: 1,
      extended: 1,
    });

    if (recentTracksResp.recenttracks.track.length) {
      const track = recentTracksResp.recenttracks.track[0];

      // console.log(track);
      const mediumImage = track.image.find((image) => {
        return image.size === 'large';
      });

      if (mediumImage) {
        const returnItem: ImageObject = {
          imageUrl: mediumImage['#text'],
          trackInfo: `${track.name} : ${track.artist.name}`,
        };
        return returnItem;
      }
    }
  } catch (err) {
    console.error('Something went wrong getting the recent image', err);
  }
}

export type ImageObject = {
  trackInfo: string;
  imageUrl: string;
};
