import { Box, Button, Tooltip, Typography, useMediaQuery } from "@mui/material";
import moment from "moment";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ThumbUp } from "@mui/icons-material";

import ReviewForm from "@/molecules/ReviewForm";
import { GetPost } from "@/utils/getFetch";

const Review = ({ data, onDelete, updateHandler, user }) => {
  const { title } = useLoaderData();
  const navigate = useNavigate();

  if (!data) return;

  const reviewer = data.userId;
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const onLikeHandler = async () => {
    if (!user) return;

    try {
      const { data: res } = await GetPost("like", {
        id: data._id,
        userId: user.id,
        userName: user.userName,
        title,
      });

      data.medals = res.medals;

      updateHandler(data);
    } catch (error) {
      console.log(error);
    }
  };

  let color = data.rating * 0.1;
  let green = 235;
  let red = 235;

  color < 5 ? (red = color * 36.6) : (green = 255 - (color - 5) * 36.6);

  if (data.rating > 100) {
    green = 255;
    red = 0;
  }

  return (
    <Container isMobile={isMobile} highlight={user.id === data.userId._id}>
      <Box flex={1}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"baseline"}
        >
          <Box display={"flex"} alignItems={"baseline"} flexWrap={"wrap"}>
            <Typography
              variant="h4"
              mr={"5px"}
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/profile?userName=${reviewer.userName}`)}
            >
              <b>{reviewer.userName} </b>
            </Typography>
            <Typography color={"grey"} variant="caption">
              {" on "}
              <b>{moment(data.createdAt).format("DD MMM YYYY")}</b>
            </Typography>
          </Box>

          <Box>
            <Box display={"flex"} alignItems={"baseline"}>
              <Typography
                variant="h2"
                color={`rgb(${green},${red},${data.rating > 100 ? 255 : 52})`}
              >
                {data.rating}
              </Typography>
              <Typography variant="subtitle2">/100</Typography>
            </Box>
          </Box>
        </Box>
        {data.review.slice.length === 0 && (
          <Typography
            mb={2}
            mt={1}
            p={1}
            borderRadius={2}
            bgcolor={"background.transparent"}
            minWidth={150}
            overflow={"hidden"}
          >
            {data.review}
          </Typography>
        )}

        <Box display={"flex"} alignItems={"center"} gap={2}>
          <ReviewForm
            onUpdate={updateHandler}
            onDelete={onDelete}
            user={user}
            initialValues={{
              _id: data._id,
              review: data.review,
              rating: data.rating,
              isPrivate: data.isPrivate,
            }}
            show={reviewer._id === user?.id}
          />
          <AppraiseButton
            onClick={onLikeHandler}
            medals={data.medals}
            disabled={data.userId._id === user?.id || !user}
            user={user}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Review;

const Container = (props) => (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      flexDirection: props.isMobile ? "column-reverse" : "row",
      gap: 2,
      width: 1,
      px: 3,
      pb: 2,
      pt: 1,
      mb: 1,
      borderRadius: 2,
      bgcolor: "background.alt",
      border: "2px solid",
      borderColor: props.highlight ? "primary.main" : "background.light",
    }}
  >
    {props.children}
  </Box>
);

const AppraiseButton = ({ onClick, medals, disabled, user }) => (
  <Tooltip title="Like this review">
    <span>
      <Button
        disabled={disabled}
        startIcon={<ThumbUp />}
        onClick={onClick}
        sx={{
          filter:
            medals?.findIndex((id) => id === user?.id) === -1
              ? "grayscale(1) brightness(.5) opacity(.5)"
              : "grayscale(0)",
          transition: "all .6s ease-in-out",
        }}
      >
        {medals.length}
      </Button>
    </span>
  </Tooltip>
);
