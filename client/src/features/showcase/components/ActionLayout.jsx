import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Box, Button } from "@mui/material";

import SectionHeader from "@/components/ui/SectionHeader";
import { loader } from "@/pages/HomePage";
import MovieRow from "./MovieRow";
import TwoSidedButton from "./TwoSidedButton";

function TrendingSection({ title }) {
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
    setFilter(value.toLowerCase());
  };

  return (
    <>
      <Box display="flex" alignItems={"flex-end"}>
        <SectionHeader title={title} />
        <TwoSidedButton
          options={[
            { value: "Week", disabled: filter === "week" },
            { value: "Today", disabled: filter === "today" },
          ]}
          action={updateFilterHandler}
        />
        {/* <Box
          ml={3}
          sx={{
            overflow: "hidden",
            borderRadius: 3,
            border: "1px solid",
            borderColor: "neutral.light",
            display: "flex",
          }}
        >
          <Button
            onClick={() => updateFilterHandler("day")}
            disabled={filter === "day" || !filter}
            sx={{
              borderRight: "1px solid",
              borderRadius: "0",
              borderColor: "neutral.light",
            }}
          >
            Today
          </Button>
          <Button
            disabled={filter === "week"}
            sx={{ borderRadius: "0" }}
            onClick={() => updateFilterHandler("week")}
          >
            Week
          </Button>
        </Box> */}
      </Box>
      <MovieRow data={trending} />
    </>
  );
}

export default TrendingSection;
