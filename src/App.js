import { useEffect, useState } from "react";
import axios from "axios";

import {
  url,
  isStale,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  getSortedData,
} from "./utils/utils";

import Layout from "./components/Layout";
import Container from "./components/Container";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    const isSaved = getLocalStorage();

    const getData = () => {
      Promise.all([
        axios.get(`${url}&model=jour`),
        axios.get(`${url}&model=stop`),
      ])
        .then((res) => {
          const [lines, stops] = res;
          const lineData = lines?.data?.ResponseData?.Result || [];
          const stopsData = stops?.data?.ResponseData?.Result || [];
          const sortedTopLines = getSortedData(lineData, stopsData);

          setSorted(sortedTopLines);
          setLoading(false);

          axios
            .post("/save", {
              data: sortedTopLines,
            })
            .then((res) => setLocalStorage())
            .catch((err) => removeLocalStorage());
        })
        .catch((err) => {
          console.log("err: ", err);
          setLoading(false);
          setSorted([]);
        });
    };

    if (isSaved && !isStale()) {
      axios
        .get("/sorted")
        .then((res) => {
          if (res?.data?.data) {
            setSorted(res?.data?.data);
            removeLocalStorage();
          } else {
            setSorted([]);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log("err: ", err);
          setLoading(false);
          setSorted([]);
          removeLocalStorage();
        });
    } else {
      getData();
    }
  }, []);

  return (
    <Layout loading={loading}>
      <Container sortedData={sorted} />
    </Layout>
  );
};

export default App;
