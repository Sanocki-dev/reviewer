import { Stack } from "@mui/material";
import { useState } from "react";

import { GetPatch } from "@/utils/getFetch";
import SectionHeader from "@/molecules/SectionHeader";
import Review from "./Review";
import ReviewForm from "@/molecules/ReviewForm";

const Reviews = ({ user, reviews }) => {
  const [data, setData] = useState(reviews);
  let userReview = reviews.findIndex(({ userId }) => userId._id === user.id);

  const onAppraiseHandler = async (id, index) => {
    if (!user) return;

    try {
      let res = await GetPatch(`review/${id}/${user?.id}`);

      let updatedReviews = reviews;
      updatedReviews[index].medals = res.data.medals;

      setData([...updatedReviews]);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteHandler = async () => {
    const newList = data;
    await newList.splice(userReview, 1);
    setData([...newList]);
  };

  const onRefresh = async (values) => {
    const newList = data;
    await newList.push(values)
    setData([...newList]);
  };

  return (
    <>
      <SectionHeader title={"Reviews"} />
      <Stack gap={1}>
        {userReview >= 0 ? (
          <Review
            onDelete={onDeleteHandler}
            data={data[userReview]}
            user={user}
            highlight
          />
        ) : (
          <ReviewForm refresh={onRefresh} user={user} create />
        )}
        {data.map((data, index) => {
          if (index === userReview) return;
          return (
            <Review
              key={data._id}
              data={data}
              user={user}
              index={index}
              onAppraise={onAppraiseHandler}
            />
          );
        })}
      </Stack>
    </>
  );
};

export default Reviews;
