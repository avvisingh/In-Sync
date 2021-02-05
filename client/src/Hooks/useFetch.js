import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    fetch(url, {
      method: "GET",
      headers: {
        signal: abortController.signal,
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Data retreival failed. Please try again");
        }
        return res.json();
      })
      .then((receivedData) => {
        setData(receivedData);
        setIsPending(false);
        setError(null);
      })
      .catch((e) => {
        if (e.name === "AbortError") {
          return console.log("fetch aborted");
        }

        setData(null);
        setIsPending(false);
        setError(e.message);
      });

    return () => abortController.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
