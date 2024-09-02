import { PersonAdd, PersonRemove } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetFetch, GetPost } from "@/utils/getFetch";
import { updateUser } from "@/context";

const ProfilePage = () => {
  const data = useLoaderData();
  const user = useSelector((state) => state.user);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { palette } = useTheme();
  const dispatch = useDispatch();

  if (!data) return;

  const canFollow = Boolean(
    user?.following?.find(({ userName }) => userName === data.userName) ==
      undefined
  );

  const onFollowHandler = async () => {
    try {
      const res = await GetPost("follow", {
        userId: user.id,
        followerId: data._id,
      });

      dispatch(updateUser({ type: "following", data: res.data }));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Box
        height={200}
        mb={9}
        sx={{
          position: "relative",
          // backgroundImage:
          //   "url(https://cdn.dribbble.com/userupload/13282328/file/original-7eb0ff9ddf9a7262e2123f5824c947e4.png?crop=0x0-3839x2880&resize=400x300&vertical=center)",
          borderBottom: "5px solid",
          borderColor: "primary.main",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            position: "absolute",
            top: 145,
            left: 25,
            gap: 2,
          }}
        >
          <Avatar
            alt={data.userName}
            sx={{
              border: "5px solid",
              borderColor: "primary.main",
              bgcolor: "background.alt",
              color: "primary.main",
              fontSize: "36pt",
              height: 120,
              width: 120,
            }}
          >
            {data.userName[0]}
          </Avatar>
          <Typography variant="h5">
            <b>{data.followers?.length} </b>
            <Box component="span" color="neutral.mediumMain">
              Followers
            </Box>
          </Typography>
          <Typography variant="h5">
            <b>{data.following?.length} </b>
            <Box component="span" color="neutral.mediumMain">
              Following
            </Box>
          </Typography>
        </Box>
      </Box>
      <Box px={5} display={"flex"} gap={3} alignItems={"baseline"}>
        <Typography variant="h2">{data.userName}</Typography>
        {user?.id !== data._id && user && (
          <Tooltip title="Follow this user for their updates.">
            <Button
              onClick={onFollowHandler}
              startIcon={canFollow ? <PersonAdd /> : <PersonRemove />}
            >
              {canFollow ? "Follow" : "Unfollow"}
            </Button>
          </Tooltip>
        )}
      </Box>
      {/* <Box sx={{ display: "flex", mt: 2 }}>
        <Box bgcolor={"red"} width={300}></Box>
        <Box bgcolor={"blue"} flexGrow={1} height={100}>
          <Typography variant="h2">Activity</Typography>
        </Box>
      </Box> */}
    </Box>
  );
};

export default ProfilePage;

export const loader = async ({ request }) => {
  const userName = new URL(request.url).searchParams.get("userName");

  try {
    const response = await GetFetch(`userName/${userName}`);

    if (response.status !== 200) {
      return { error: "Unable to load user data." };
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: "Unable to load user data." };
  }
};
