import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import axios from "axios";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useLoaderData } from "react-router-dom";

import {
  FormInput,
  GenreSelect,
  PartnerSelect,
  Success,
} from "@/molecules/formUI";
import { updateUser } from "@/context";

const CreateWatchlistForm = ({ user, handleClose }) => {
  const dispatch = useDispatch();
  const movie = useLoaderData();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Formik
      initialValues={{
        name: "",
        genre: [],
        isPrivate: false,
        partners: [],
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, "Must be 15 characters or less")
          .min(2, "Must be 2 characters or more")
          .required("Required"),
        genre: Yup.array().required("Required"),
        isPrivate: Yup.boolean().required("Required"),
        partners: Yup.array(),
      })}
      onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
        setSubmitting(true);
        try {
          let { data } = await axios.post(
            //import.meta.env.VITE_SITE_URL
            //"http://localhost:8888/"
            import.meta.env.VITE_SITE_URL + "watchList",
            {
              userId: user.id,
              movieId: movie.id,
              ...values,
            }
          );
          setStatus(200);
          setTimeout(() => {
            handleClose();
          }, 1500);

          setTimeout(() => {
            dispatch(updateUser({ type: "watchlists", data }));
          }, 2200);

          setSubmitting(false);
        } catch (error) {
          if (error.response.status === 406) {
            setErrors(error.response.data);
          }
          console.log(error);
        }
      }}
    >
      {(form) => (
        <Form onSubmit={form.handleSubmit}>
          <Stack gap={2} alignItems={"center"}>
            <Typography noWrap variant={isMobile ? "h3" : "h2"}>
              Create a new Watchlist
            </Typography>

            <Typography
              variant={isMobile ? 'body2' :"body1"}
              textAlign={"center"}
              color={"grey.400"}
              // height={50}
              w={1}
            >
              Customize your watchlist to include the genres or attach some of
              your friends so they can edit it with you!
            </Typography>

            <Typography
              variant="subtitle2"
              height={0}
              lineHeight={0}
              color={"error"}
            >
              {form.errors.server}
            </Typography>

            {console.log(form)}
            <Success start={form.status === 200}>
              <Typography variant="h1">Success!</Typography>
              <Typography color={"primary.main"}>Watchlist Created</Typography>
            </Success>

            <FormInput type="text" name="name" label="Watchlist Name" />
            <GenreSelect form={form} />
            <PartnerSelect friends={user.friends} form={form} />
            {/* 
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Private"
              sx={{ width: 1, justifyContent: "center" }}
              {...form.getFieldProps("isPrivate")}
            /> */}
            <Button
              disabled={form.isSubmitting}
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
              fullWidth
            >
              Submit
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default CreateWatchlistForm;
