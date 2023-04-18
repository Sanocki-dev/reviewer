import { useLoaderData } from "react-router-dom";

import SectionHeader from "@/components/SectionHeader";
import ScrollBox from "@/components/ScrollBox";
import MovieGridView from "@/components/MovieGridView";

function TrendingSection() {
  const { results } = useLoaderData();

  return (
    <>
      <SectionHeader title="Trending" />
      <ScrollBox
        horizontal
        gap={1}
        sx={{
          display: "flex",
          overflowX: "auto",
          pb: 2,
        }}
      >
        <MovieGridView movies={results} />
      </ScrollBox>
    </>
  );
}

export default TrendingSection;
