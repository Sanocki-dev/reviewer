import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import moment from "moment";

import { GetFetch } from "@/utils/getFetch";
import { baseImageURL, noImageURL } from "@/data/Images";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const PersonPage = () => {
  const [showBio, setShowBio] = useState(false);
  const [value, setValue] = useState(0);
  const loader = useLoaderData();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const imageURL = loader.profile_path
    ? baseImageURL + loader.profile_path
    : noImageURL;

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      width={isMobile ? 1 : "80%"}
      bgcolor={"background.transparent"}
      margin="auto"
      p={2}
    >
      <Box
        display={"flex"}
        flexDirection={isMobile && "column"}
        mb={2}
        gap={isMobile && 2}
      >
        <Box
          component={"img"}
          src={imageURL || noImageURL}
          width={200}
          height={300}
          alt={loader.name + "-image"}
          sx={{ objectFit: "cover", mr: 2, borderRadius: 2 }}
        />
        <Box p={3} width={1} borderRadius={2} bgcolor={"background.alt"}>
          <Typography variant="h1" fontWeight={"normal"} mb={1}>
            {loader.name}
          </Typography>
          <LabeledText label="Known For" text={loader.known_for_department} />
          <LabeledText
            label="Age"
            text={moment(loader.deathday || moment(), "YYYY-MM-DD").diff(
              moment(loader.birthday, "YYYY-MM-DD"),
              "years"
            )}
          >
            <Box component={"span"} fontSize={12}>
              {moment(loader.birthday).format(" MMMM do YYYY ")}
              {loader.deathday &&
                ` - ${moment(loader.deathday).format("MMMM do YYYY")}
            `}
            </Box>
          </LabeledText>
          <LabeledText label="Birth Place" text={loader.place_of_birth} />

          <Bio
            bio={loader.biography}
            set={() => setShowBio((state) => !state)}
            show={showBio}
          />
        </Box>
      </Box>

      <Tabs
        onChange={handleChange}
        value={value}
        variant="fullWidth"
        aria-label="credits Tab"
      >
        <Tab
          label={`${loader.movie_credits.cast.length} Movies`}
          {...a11yProps(0)}
        />
        <Tab
          label={`${loader.tv_credits.cast.length} TV Shows`}
          {...a11yProps(1)}
        />
      </Tabs>

      <Box hidden={value !== 0}>
        <Box
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: "repeat(auto-fit,120px)",
            justifyContent: "center",
            mt: 2,
          }}
        >
          {loader.movie_credits.cast.map(({ id, title, poster_path }) => (
            <Tooltip title={title} sx={{ cursor: "pointer" }}>
              {poster_path ? (
                <Box
                  onClick={() =>
                    navigate({
                      pathname: "/movie",
                      search: "?id=" + id,
                    })
                  }
                  component={"img"}
                  src={"https://image.tmdb.org/t/p/w500/" + poster_path}
                  alt={title + "-poster"}
                  sx={{
                    objectFit: "contain",
                    objectPosition: "center",
                    width: 120,
                    borderRadius: 1,
                    cursor: "pointer",
                  }}
                />
              ) : (
                <Box
                  onClick={() =>
                    navigate({
                      pathname: "/tv",
                      search: "?id=" + id,
                    })
                  }
                  display="flex"
                  alignItems={"center"}
                  justifyContent={"center"}
                  bgcolor={"background.alt"}
                  borderRadius={1}
                >
                  <Typography>{title}</Typography>
                </Box>
              )}
            </Tooltip>
          ))}
        </Box>
      </Box>

      <Box hidden={value !== 1}>
        <Box
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: "repeat(auto-fit,120px)",
            justifyContent: "center",
            mt: 2,
          }}
        >
          {loader.tv_credits.cast.map(({ id, name, poster_path }) => (
            <Tooltip title={name}>
              {poster_path ? (
                <Box
                  onClick={() =>
                    navigate({
                      pathname: "/tv",
                      search: "?id=" + id,
                    })
                  }
                  component={"img"}
                  src={"https://image.tmdb.org/t/p/w500/" + poster_path}
                  alt={name + "-poster"}
                  sx={{
                    objectFit: "contain",
                    objectPosition: "center",
                    width: 120,
                    borderRadius: 1,
                    cursor: "pointer",
                  }}
                />
              ) : (
                <Box
                  onClick={() =>
                    navigate({
                      pathname: "/tv",
                      search: "?id=" + id,
                    })
                  }
                  display="flex"
                  alignItems={"center"}
                  justifyContent={"center"}
                  bgcolor={"background.alt"}
                  borderRadius={1}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <Typography>{name}</Typography>
                </Box>
              )}
            </Tooltip>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PersonPage;

const Bio = ({ bio, show, set }) => (
  <>
    <LabeledText
      label="Bio"
      text={
        bio.length > 200 &&
        bio.slice(0, show ? -1 : 200) +
          (bio.length > 200 && !show ? "..." : ".")
      }
    />
    <Button sx={{ mt: 1 }} onClick={set} fullWidth>
      {show ? "Show Less" : "Read More"}
    </Button>
  </>
);

const LabeledText = (props) => (
  <Box>
    <Typography
      variant="caption"
      sx={{ opacity: 0.4 }}
      fontSize={12}
      display={"inline"}
      my={1}
    >
      {props.label + " "}
    </Typography>
    <Typography variant="body2" fontSize={16} align="justify">
      {props.text}
      {props.children}
    </Typography>
  </Box>
);

export const loader = async ({ request }) => {
  const id = new URL(request.url).searchParams.get("id");
  try {
    const response = await GetFetch(`person?id=${id}`);

    if (response.status !== 200) {
      return { error: "Unable to load movie data." };
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: "Unable to load movie data." };
  }
};
