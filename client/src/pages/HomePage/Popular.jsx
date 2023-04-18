import { useLoaderData } from "react-router-dom";

import SectionHeader from "@/components/SectionHeader";
import ScrollBox from "@/components/ScrollBox";
import MovieGridView from "@/components/MovieGridView";

const Popular = () => {
  const { popular } = useLoaderData();

  return (
    <>
      <SectionHeader title="Popular Movies" />
      <ScrollBox
        horizontal
        gap={1}
        sx={{
          display: "flex",
          overflowX: "auto",
          py: 2,
        }}
      >
        <MovieGridView movies={popular} />
      </ScrollBox>
    </>
  );
};

export default Popular;
