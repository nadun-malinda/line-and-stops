import { useState, useEffect } from "react";

export const useFetch = (params) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const { model = "jour" } = params;
    const alreadyFetched = localStorage.getItem("fetched");

    const fetchData = async () => {
      setLoading(true);
      const url = `${process.env.REACT_APP_TRAFIKLAB_API_URL}?key=${process.env.REACT_APP_TRAFIKLAB_API_KEY}&model=${model}&DefaultTransportModeCode=BUS`;

      await fetch(url)
        .then((res) => res.json())
        .then((res) => {
          const { StatusCode, ResponseData } = res;
          setLoading(false);

          if (StatusCode !== 0) {
            setData([]);
            localStorage.setItem("fetched", false);
          } else {
            setData(ResponseData.Result);
            localStorage.setItem("fetched", true);
          }
        })
        .catch((err) => {
          setData([]);
          setLoading(false);
          localStorage.setItem("fetched", false);
        });
    };

    !alreadyFetched && fetchData();
  }, [params]);

  return { loading, data };
};
