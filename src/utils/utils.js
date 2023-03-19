import { groupBy, orderBy, uniqBy, take, map } from "lodash";
import { TRAFIKLAB_URL, TRAFIKLAB_KEY, LOCAL_STORAGE_KEY } from "../constants";

export const url = `${TRAFIKLAB_URL}?key=${TRAFIKLAB_KEY}&DefaultTransportModeCode=BUS`;

/**
 * Check if the stored data is more than 30 days.
 * @returns {boolean}
 */
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

/**
 * Get JSON parsed localStorage value.
 * @returns {number}
 */
export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
};

/**
 * Set localStorage as the current time in milliseconds as the value.
 */
export const setLocalStorage = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, Date.now());
};

/**
 * Remove key from the localStorage.
 */
export const removeLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

/**
 * Get the sorted object of top 10 lines with most bus stops in each line.
 * @param {Object[]} rawLines
 * @param {Object[]} rawStops
 * @returns {Object[]}
 */
export const getSortedData = (rawLines, rawStops) => {
  if (rawLines.length === 0 || rawStops.length === 0) return [];

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
