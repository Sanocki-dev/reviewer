import { useLoaderData } from "react-router-dom";

import SectionHeader from "@/components/SectionHeader";
import ScrollBox from "@/components/ScrollBox";
import MovieGridView from "@/components/MovieGridView";

const ComingSoon = () => {
  const { upcoming } = useLoaderData();
  
  return (
    <>
      <SectionHeader title="Coming Soon" />
      <ScrollBox
        horizontal
        gap={1}
        sx={{
          display: "flex",
          overflowX: "auto",
          py: 2,
        }}
      >
        <MovieGridView movies={upcoming} />
      </ScrollBox>
    </>
  );
};

export default ComingSoon;
