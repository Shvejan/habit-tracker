import axios from "axios";
const youtubeApi = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    key: "AIzaSyCNbuPZafewMyHqd9k7o5izn0kswLt1mks",
    q: "self development",
    maxResults: 10,
  },
});

export const fetchVideos = async (setthumbnailData) => {
  let returndata = [];
  await youtubeApi
    .get("/search")
    .then((res) => {
      returndata = res.data.items.map((a) => a.snippet.thumbnails.high.url);
      setthumbnailData(returndata);
    })
    .catch(() => console.log("error in the api"));
};
