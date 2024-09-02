import { Box } from "@mui/material";

import MediaCard from "@/organisms/Movie/MediaCard";
import SectionHeader from "@/molecules/SectionHeader";

const Section = ({ data, title, type }) => {
  return (
    <>
      <SectionHeader title={title} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit,${
            type === "person" ? "100px" : "200px"
          })`,

          flexWrap: type ? "nowrap" : "wrap",
          justifyContent: "center",
          gap: 1,
          px: 6,
          mb: 2,
        }}
      >
        {data?.map((media, index) => (
          <MediaCard key={index} media={media} type={type || "movie"} />
        ))}
      </Box>
    </>
  );
};

export default Section;
