import { useEffect } from "react";

const useDummyData = () => {
  useEffect(() => {
    const isDataStored = localStorage.getItem("dummy-data");

    if (!isDataStored) {
      fetch("/dummy-data.json")
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("dummy-data", JSON.stringify(data));
        })
        .catch((error) => console.error("Error fetching dummy data:", error));
    }
  }, []);
};

export default useDummyData;
