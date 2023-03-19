import { groupBy, orderBy, uniqBy, take, map } from "lodash";
import { TRAFIKLAB_URL, TRAFIKLAB_KEY, LOCAL_STORAGE_KEY } from "../constants";

export const url = `${TRAFIKLAB_URL}?key=${TRAFIKLAB_KEY}&DefaultTransportModeCode=BUS`;

export const isStale = () => {
  const saved = getLocalStorage();
  let stale = true;

  if (saved) {
    const timeDiff = Date.now() - saved;
    const dateDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    if (dateDiff <= 30) stale = false;
  }

  return stale;
};

export const needFetchTrafikLab = () => {
  return getLocalStorage() === null;
};

export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
};

export const setLocalStorage = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, Date.now());
};

export const removeLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const getSortedData = (rawLines, rawStops) => {
  // group all stops by line number.
  const grouped = groupBy(rawLines, (item) => item.LineNumber);

  // remove all duplicated stops in each line. (by stop's id - JourneyPatternPointNumber)
  const unique = map(grouped, (stops) =>
    uniqBy(stops, (stop) => stop.JourneyPatternPointNumber)
  );

  // sort all line numbers in desc order
  // according to the number of stops in each line.
  const sorted = orderBy(unique, (item) => item.length, "desc");

  // get top 10 lines with highest number of stops.
  const topLines = take(sorted, 10);

  return topLines.map((lineStops) => {
    return {
      lineNumber: lineStops[0].LineNumber,
      lineStopsCount: lineStops.length,
      stops: orderBy(
        lineStops.map((lineStop) => {
          const stop = rawStops.find(
            (stop) =>
              stop.StopPointNumber === lineStop.JourneyPatternPointNumber
          );
          return {
            id: stop.StopPointNumber,
            name: stop.StopPointName,
          };
        }),
        (stop) => stop.JourneyPatternPointNumber,
        "desc"
      ),
    };
  });
};
