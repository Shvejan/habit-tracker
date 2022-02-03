import axios from "axios";

const quoteApi = axios.create({
  baseURL: "http://api.quotable.io",
});
export const fetchQuote = async (setquote) => {
  let quote = { quote: "", author: "" };
  await quoteApi
    .get("/random")
    .then((res) => {
      quote.quote = res.data.content;
      quote.author = res.data.author;
      setquote(quote);
    })
    .catch(() => console.log("error in the api"));
};

export const fetchSmallQuote = async (setquote, len) => {
  let quote = { quote: "", author: "" };
  await quoteApi
    .get(`/random?maxLength=${len}`)
    .then((res) => {
      quote.quote = res.data.content;
      quote.author = res.data.author;
      setquote(quote);
    })
    .catch(() => console.log("error in the api"));
};
