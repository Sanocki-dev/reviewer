import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Stack } from "@mui/material";

import { loader } from "@/pages/HomePage";
import SectionHeader from "./SectionHeader";
import MovieRow from "./MovieRow";
import TwoSidedButton from "./TwoSidedButton";

function TrendingSection() {
  const [filter, setFilter] = useState();
  const [trending, setTrending] = useState();
  const results = useLoaderData();

  useEffect(() => {
    setTrending(results.trending);

    if (!filter) return;

    const fetchTrending = async () => {
      const response = await loader({ filter });
      setTrending(response.trending);
    };

    fetchTrending();
  }, [filter]);

  const updateFilterHandler = (value) => {
    setFilter(value);
  };

  return (
    <>
      <Stack direction={"row"} alignItems={"flex-end"} mb={1}>
        <SectionHeader title={"Trending"} />
        <TwoSidedButton
          options={[
            { value: "Day", disabled: filter === "day" || !filter },
            { value: "Week", disabled: filter === "week" },
          ]}
          action={updateFilterHandler}
        />
      </Stack>
      <MovieRow data={trending} />
    </>
  );
}

export default TrendingSection;
