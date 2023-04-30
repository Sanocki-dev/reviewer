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
      {data.map((movie) => {
        console.log("movie");
        return <GridView movie={movie} />;
      })}
    </ScrollBox>
  );
};

export default MovieRow;
