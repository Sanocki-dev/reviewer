import {
  Box,
  Button,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import moment from "moment";

import ScoreCircle from "@/molecules/ScoreCircle";
import ReviewForm from "@/molecules/ReviewForm";
import Logo from "@/assets/brand/r8_golden.svg";
import { useState } from "react";

const Review = ({ data, onAppraise, user, highlight, index, onDelete }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [reviewData, setReviewData] = useState(data);
  const { _id, medals, rating, review, userId, updatedAt, isPrivate } =
    reviewData;

  const onRefresh = (updated) => {
    setReviewData({ ...reviewData, ...updated });
  };

  return (
    <Box
      display={"flex"}
      gap={2}
      width={1}
      p={3}
      mb={1}
      borderRadius={2}
      bgcolor={"background.alt"}
      border={highlight && "2px solid"}
      borderColor={"primary.main"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      flexDirection={isMobile ? "column-reverse" : "row"}
      box={4}
    >
      <Box flex={1}>
        <Box display={"flex"} alignItems={"baseline"} gap={2}>
          <Typography color={"grey"} variant="subtitle1" noWrap>
            <b>{userId.userName}</b> on{" "}
            {moment(updatedAt).format("DD MMM YYYY")}
          </Typography>
        </Box>
        <Typography mb={2} pt={2} minWidth={150} overflow={"hidden"}>
          {review}
        </Typography>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <ReviewForm
            refresh={onRefresh}
            onDelete={onDelete}
            user={user}
            initialValues={{ _id, review, rating, isPrivate }}
            show={userId._id === user.id}
          />
          <AppraiseButton
            onClick={() => onAppraise(_id, index)}
            medals={medals}
            disabled={userId._id === user.id}
            user={user}
          />
        </Box>
      </Box>
      <Stack
        sx={{
          alignItems: "center",
        }}
      >
        <ScoreCircle score={rating} />
      </Stack>
    </Box>
  );
};

export default Review;

const AppraiseButton = ({ onClick, medals, disabled, user }) => (
  <Tooltip title="Give this review a golden R8er medal">
    <span>
      <Button disabled={disabled} style={{ borderRadius: 0 }} onClick={onClick}>
        <Box
          component={"img"}
          src={Logo}
          height={20}
          sx={{
            mr: 2,
            filter:
              medals?.findIndex((id) => id === user?.id) === -1
                ? "grayscale(1) brightness(.5) opacity(.5)"
                : "grayscale(0)",
            transition: "all .6s ease-in-out",
          }}
        />
        {medals.length}
      </Button>
    </span>
  </Tooltip>
);
