import React, { useState, useEffect } from "react";
import { useGetTSQuery } from "./api/tsApi";
import { result } from "lodash";

export const Ts = () => {
  const [ts, setTs] = useState("");
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

  console.log(resultArray);

  return (
    <div className="App">
      <h1>TS</h1>
      {content}
      <button onClick={handleFetch}>Fetch</button>
      <button onClick={handleRefetch} disabled={skip}>
        Refetch
      </button>
      <p>Count: {count}</p>
      <ul>
        {resultArray.map((result, index) => (
          <li key={index}>
            {
              <ul>
                {result.pings.map((ping, index) => (
                  <li key={index}>{JSON.stringify(ping, null, 2)}</li>
                ))}
              </ul>
            }
          </li>
        ))}
      </ul>
    </div>
  );
};
