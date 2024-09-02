import { Box, Select, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import Review from "./Review";
import ReviewForm from "@/molecules/ReviewForm";
import { useLoaderData } from "react-router-dom";
import Action from "@/atoms/Button";
import ReviewFilters from "@/molecules/ReviewFilters";

const a11yProps = (index) => {
  return {
    id: `reviews-tab-${index}`,
    "aria-controls": `reviews-tabpanel-${index}`,
  };
};

const Reviews = ({ user }) => {
  const { reviews } = useLoaderData();
  const [data, setData] = useState(reviews);
  const [loadAmount, setLoadAmount] = useState(3);
  const [tab, setTab] = useState(0);

  let userReview = data.findIndex(({ userId }) => userId._id === user?.id);

  useEffect(() => {
    setData(reviews);
  }, [reviews]);

  const onDeleteHandler = async () => {
    const newList = data;
    await newList.splice(userReview, 1);
    setData([...newList]);
  };

  const onCreate = (values) => {
    const newList = [...data];
    newList.push(values);
    setData(newList);
  };

  const onUpdateHandler = (values) => {
    const updated = [...data];
    const index = updated.findIndex(({ _id }) => _id === values._id);
    updated[index] = values;
    setData(updated);
  };

  const handleChange = (_, newTab) => {
    setTab(newTab);
  };

  const onSort = (sortedList) => {
    setData([...sortedList]);
  };

  const following = useMemo(() => {
    if (!user) return undefined;
    const followerIds = user?.following?.map(({ _id }) => _id);
    
    return reviews.filter((review) => followerIds.includes(review.userId._id));
  }, [data]);

  return (
    <Box p={2} mt={2} bgcolor={"background.alt"} borderRadius={2}>
      <Typography
        variant="h3"
        sx={{
          my: 2,
          fontWeight: "bold",
        }}
      >
        Reviews
      </Typography>
      {userReview >= 0 ? (
        <Review
          onDelete={onDeleteHandler}
          updateHandler={onUpdateHandler}
          data={data[userReview]}
          user={user}
        />
      ) : (
        <ReviewForm onUpdate={onCreate} user={user} create />
      )}
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{ mb: 2 }}
      >
        <Tab label={`${reviews?.length} Total`} {...a11yProps(0)} />
        <Tab label={`${following?.length} Friend reviews`} {...a11yProps(1)} />
      </Tabs>

      <ReviewFilters reviews={reviews} onSort={onSort} />

      <Box hidden={tab !== 1}>
        {following?.map((data, index) => {
          if (index === userReview) return;
          return (
            <Review
              key={data._id}
              data={data}
              user={user}
              updateHandler={onUpdateHandler}
            />
          );
        })}
      </Box>

      <Box
        sx={{
          display: tab !== 0 ? "none" : "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data.slice(0, loadAmount)?.map((data, index) => {
          if (index === userReview) return;
          return (
            <Review
              key={data._id}
              data={data}
              user={user}
              updateHandler={onUpdateHandler}
            />
          );
        })}
        {data.length > loadAmount && (
          <Action onClick={() => setLoadAmount((state) => (state += 5))}>
            Load More
          </Action>
        )}
      </Box>
    </Box>
  );
};

export default Reviews;
