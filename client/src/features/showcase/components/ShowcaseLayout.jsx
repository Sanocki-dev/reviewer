import SectionHeader from "./SectionHeader";
import MovieRow from "./MovieRow";

const ShowcaseLayout = ({ title, data }) => {
  return (
    <>
      <SectionHeader title={title} />
      <MovieRow data={data} />
    </>
  );
};

export default ShowcaseLayout;
