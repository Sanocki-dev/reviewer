import ScrollBox from "@/components/ui/ScrollBox";
import { GridView } from "@/features/movieView";

const MovieRow = ({ data }) => {
  return (
    <ScrollBox
      horizontal
      gap={1}
      sx={{
        display: "flex",
        overflowX: "auto",
        mb: 2,
      }}
    >
      <GridView movies={data} />
    </ScrollBox>
  );
};

export default MovieRow;
