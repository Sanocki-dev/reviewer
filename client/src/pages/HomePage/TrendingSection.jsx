import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Box, Button } from "@mui/material";

import SectionHeader from "@/components/SectionHeader";
import ScrollBox from "@/components/ScrollBox";
import MovieGridView from "@/components/MovieGridView";
import { loader } from "@/pages/HomePage/HomePage";

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
      <Box display="flex" alignItems={"flex-end"}>
        <SectionHeader title="Trending" />
        <Box
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
        </Box>
      </Box>
      <ScrollBox
        horizontal
        gap={1}
        sx={{
          display: "flex",
          overflowX: "auto",
          py: 2,
        }}
      >
        <MovieGridView movies={trending} />
      </ScrollBox>
    </>
  );
}

export default TrendingSection;
