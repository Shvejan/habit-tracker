import axios from "axios";
const youtubeApi = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    key: "AIzaSyCNbuPZafewMyHqd9k7o5izn0kswLt1mks",
    q: "self development",
    maxResults: 5,
  },
});

export const fetchVideos = async (setthumbnailData) => {
  let returndata = [];
  await youtubeApi
    .get("/search")
    .then((res) => {
      returndata = res.data.items.map((a) => {
        return { image: a.snippet.thumbnails.high.url, url: a.id.videoId };
      });
      console.log(res.data.items[0].id.videoId);
      setthumbnailData(returndata);
    })
    .catch(() => console.log("error in the api"));
};
