import axios from "axios";
import { useQuery } from "react-query";
import { LIMIT_QUERY, customUrlEncode } from "../Util";

export interface MusicData {
  artistId: number;
  artistName: string;
  artistViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionCensoredName: string;
  collectionExplicitness: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  collectionViewUrl: string;
  country: string;
  currency: string;
  discCount: number;
  discNumber: number;
  isStreamable: boolean;
  kind: string;
  previewUrl: string;
  primaryGenreName: string;
  releaseDate: string;
  trackCensoredName: string;
  trackCount: number;
  trackExplicitness: string;
  trackId: number;
  trackName: string;
  trackNumber: number;
  trackPrice: number;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
}

export interface MusicList {
  resultCount: number;
  results: MusicData[];
}

export const useMusicList = ({
  search,
  page,
  fetchAction,
}: {
  search: string | undefined;
  page: number;
  fetchAction: ({
    dataMusic,
    pageMusic,
  }: {
    dataMusic: MusicData[];
    pageMusic: number;
  }) => void;
}) => {
  return useQuery(
    ["music_list", search, page],
    async (): Promise<MusicList> => {
      const searchFix = customUrlEncode(search ?? "");
      const { data } = await axios.get<MusicList>(
        `https://itunes.apple.com/search?term=${searchFix.toLowerCase()}&entity=musicTrack&country=us&limit=${
          LIMIT_QUERY * page
        }`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      const dataFix = data.results.filter((item) => item !== null);
      fetchAction({ dataMusic: dataFix, pageMusic: page });
      return data;
    },
    {
      enabled: !!search,
    }
  );
};
