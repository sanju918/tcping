import React, { useState, useEffect } from "react";
import { useGetTSQuery } from "./api/tsApi";
import { TsSummary } from "./components/TsSummary";

const initialTsSummary = {
  max: 0,
  min: 0,
  avg: 0,
};

export const Ts = () => {
  const [tcpSummary, setTcpSummary] = useState(initialTsSummary);
  const [skip, setSkip] = useState(true);
  const {
    data: tss,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    refetch,
    error,
  } = useGetTSQuery({}, { skip });

  const [resultArray, setResultArray] = useState([]);
  const [count, setCount] = useState(0);

  const handleFetch = () => {
    setSkip(false);
  };

  const handleRefetch = () => {
    setSkip(false);
    refetch();
    setCount(count + 1);
  };

  let content;
  if (isLoading && isFetching) content = <p>Loading...</p>;
  if (isError) content = <p>Error: {error.message}</p>;
  if (isSuccess) content = <p>Success</p>;

  useEffect(() => {
    if (isSuccess) {
      setResultArray((prevArray) => [...prevArray, { ...tss }]); // Create a copy of tss
    }
  }, [isSuccess, tss, count]);

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-semibold mb-4">TS</h1>
      {content}
      <button
        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded"
        onClick={handleFetch}
      >
        Fetch
      </button>
      <button
        className={`m-1 bg-blue-500 text-white font-semibold px-4 py-2 rounded ${
          skip ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleRefetch}
        disabled={skip}
      >
        Refetch
      </button>
      <div className="mb-4">
        <TsSummary data={resultArray} />
      </div>
      <p className="text-sm">Count: {count}</p>
      <ul>
        {resultArray.map((result, index) => (
          <li key={index} className="mt-2 border p-2 rounded">
            {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
            <p>
              {(index + 1).toFixed(4)}# Reply from {result.src_debug_vms.ip}{" "}
              latency:
              {result.pings_summary.avg}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
