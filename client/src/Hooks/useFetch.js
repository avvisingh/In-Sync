import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

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
          throw Error(
            "Unable to fetch your details. We apologise for the inconvenience"
          );
        }
        return res.json();
      })
      .then((receivedData) => {
        setData(receivedData);
        setIsPending(false);
        setError(null);
        <Redirect to="/" />;
      })
      .catch((e) => {
        if (e.name === "AbortError") {
          return console.log("fetch aborted");
        }

        setData(null);
        setIsPending(false);
        setError(e.message);
        <Redirect to="/login" />;
      });

    return () => abortController.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
