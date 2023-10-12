import React from "react";

export const TsSummary = ({ data }) => {
  const dataLength = data.length;

  const totalMax =
    dataLength > 0
      ? data.reduce((acc, element) => {
          return acc + element.pings_summary.max;
        }, 0) / dataLength
      : 0;

  const totalMin =
    dataLength > 0
      ? data.reduce((acc, element) => {
          return acc + element.pings_summary.min;
        }, 0) / dataLength
      : 0;

  const totalAvg =
    dataLength > 0
      ? data.reduce((acc, element) => {
          return acc + element.pings_summary.avg;
        }, 0) / dataLength
      : 0;

  return (
    <div className="border p-4 rounded bg-gray-100">
      <div className="text-lg font-semibold mb-2">TCP PING SUMMARY</div>
      <p className="mb-1">Max: {totalMax.toFixed(2)}</p>
      <p className="mb-1">Min: {totalMin.toFixed(2)}</p>
      <p className="mb-1">Avg: {totalAvg.toFixed(2)}</p>
      {/* <pre className="mt-2">{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};
