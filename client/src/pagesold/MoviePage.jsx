import {
  Box,
  Button,
  IconButton,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Form, useLoaderData } from "react-router-dom";
import moment from "moment";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { useState } from "react";
import FormInput from "@/components/form/FormInput";
import logo from "@/assets/brand/r8_golden.svg";
import { tokenLoader } from "@/utils/auth";

const MoviePage = () => {
  const data = useLoaderData();
  const { user } = useSelector((state) => state);
  const token = tokenLoader();
  const [isUpdating, setIsUpdating] = useState(false);
  const [details, setDetails] = useState(data);
  const imageURL = "https://image.tmdb.org/t/p/w500/" + data?.backdrop_path;

  const hasReview = details.reviews?.find((el) => el.userId?._id === user?.id);

  const onSubmitHandler = async (values) => {
    if (!user) return;

    try {
      let res = undefined;

      // They are updating a post
      if (Boolean(hasReview)) {
        let oldIndex = details.reviews.findIndex(
          ({ _id }) => _id === hasReview._id
        );
        res = await axios.patch(
          import.meta.env.VITE_SITE_URL + "review/" + hasReview._id,
          {
            rating: values.rating,
            review: values.review,
            isPrivate: values.isPrivate,
          },
          { headers: { Authorization: token } }
        );
        data.reviews[oldIndex] = res.data;
        setIsUpdating(false);
      } else {
        res = await axios.post(
          import.meta.env.VITE_SITE_URL + "review",
          {
            movieId: data.id,
            userId: user.id,
            rating: values.rating,
            review: values.review,
            isPrivate: values.isPrivate,
          },
          { headers: { Authorization: token } }
        );
        data.reviews.unshift(res.data);
      }
      setDetails((state) => ({
        ...state,
        reviews: data.reviews,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteHandler = async (id) => {
    let index = data.reviews.findIndex(({ _id }) => _id === id);

    try {
      await axios.delete(import.meta.env.VITE_SITE_URL + "review/" + id, {
        headers: { Authorization: token },
      });
      data.reviews.splice(index, 1);

      setDetails((state) => ({
        ...state,
        reviews: data.reviews,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const onAppraiseHandler = async (id, index) => {
    if (!user) return;
    
    try {
      let res = await axios.patch(
        `${import.meta.env.VITE_SITE_URL}review/${id}/${user?.id}`,
        {},
        {
          headers: { Authorization: token },
        }
      );

      let updatedReviews = data.reviews;
      updatedReviews[index] = res.data;

      setDetails((state) => ({
        ...state,
        reviews: updatedReviews,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent={"space-between"}>
        <Box>
          <Typography variant="h1">{data.title}</Typography>
          <Typography variant="h4">{data.overview}</Typography>
        </Box>
        <Box component={"img"} src={imageURL} />
      </Box>
      <Stack mt={2} gap={2} justifyContent={"center"} alignItems={"center"}>
        <Box>
          <Typography></Typography>
        </Box>

        {!user ? null : Boolean(hasReview) && !isUpdating ? (
          <Box>
            <Button onClick={() => onDeleteHandler(hasReview?._id)}>
              Delete
            </Button>
            <Button onClick={() => setIsUpdating(true)}>UPDATE</Button>
            <Typography>{hasReview?.userId?.userName}</Typography>
            <Typography>
              {moment(hasReview?.timestamp).format("MMM DD/YY")}
            </Typography>
            <Typography>{hasReview?.review}</Typography>
            <Typography>{hasReview?.rating}%</Typography>
          </Box>
        ) : (
          <Formik
            initialValues={{
              review: hasReview?.review || "",
              rating: hasReview?.rating || 0,
              isPrivate: hasReview?.isPrivate || false,
            }}
            onSubmit={async (values) => {
              onSubmitHandler(values);
            }}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <FormInput type="text" name="review" label="Review" />
                <FormInput type="text" name="rating" label="Rating" />
                <Switch
                  name="isPrivate"
                  label="Private"
                  onClick={formik.handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  sx={{ borderRadius: 3, textTransform: "none" }}
                  variant="contained"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        )}

        {details.reviews?.map(
          ({ _id, review, rating, timestamp, userId, medals }, index) => (
            <Box key={index} bgcolor={"background.alt"} width={"50%"}>
              <Typography>{userId?.userName}</Typography>
              <Typography>{moment(timestamp).format("MMM DD/YY")}</Typography>
              <Typography>{review}</Typography>
              <Typography>{rating}%</Typography>
              <Tooltip title="Give this review a golden R8er medal">
                <Button
                  style={{ borderRadius: 0 }}
                  onClick={() => onAppraiseHandler(_id, index)}
                >
                  <Box
                    component={"img"}
                    src={logo}
                    height={20}
                    sx={{
                      mr: 2,
                      filter:
                        medals.findIndex((id) => id === user?.id) === -1
                          ? "grayscale(1) brightness(.5) opacity(.5)"
                          : "grayscale(0)",
                      transition: "all .6s ease-in-out",
                    }}
                  />
                  {medals.length}
                </Button>
              </Tooltip>
            </Box>
          )
        )}
      </Stack>
    </Box>
  );
};

export default MoviePage;

export const loader = async ({ request }) => {
  const id = new URL(request.url).searchParams.get("id");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SITE_URL}/movie?id=${id}`
    );

    if (response.status !== 200) {
      return { error: "Unable to load movie data." };
    }
    return response.data;
  } catch (error) {
    return { error: "Unable to load movie data." };
  }
};
