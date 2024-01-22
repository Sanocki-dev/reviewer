import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Delete, Edit } from "@mui/icons-material";
import { useLoaderData } from "react-router-dom";

import { FormInput, Success } from "./formUI";
import Modal from "@/templates/Modal";
import ScoreCircle from "./ScoreCircle";
import Action from "@/atoms/Button";
import { GetPost, GetPatch, GetDelete } from "@/utils/getFetch";

const init = { review: "", rating: 0, isPrivate: false };
const ReviewForm = ({
  show,
  user,
  create,
  initialValues = init,
  refresh,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const data = useLoaderData();

  const onDeleteHandler = async () => {
    try {
      await GetDelete("review/" + initialValues._id);
      onDelete();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {create && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpen(true)}
          sx={{ height: 80, fontSize: 20, mb: 2, textTransform: "none" }}
        >
          Create your own Review!
        </Button>
      )}
      {show && (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Action
            tooltip="Edit review"
            onClick={() => setOpen(true)}
            text={"Edit"}
          >
            <Edit />
          </Action>
          <Action
            tooltip="Delete review"
            text={"Delete"}
            onClick={() => onDeleteHandler()}
          >
            <Delete />
          </Action>
        </Box>
      )}

      <Modal width="auto" open={open} handleClose={() => setOpen(!open)}>
        <Formik
          initialValues={{
            review: initialValues.review,
            rating: initialValues.rating,
            isPrivate: initialValues.isPrivate,
          }}
          validationSchema={Yup.object({
            review: Yup.string().max(300, "Must be 300 characters or less"),
            rating: Yup.number().min(0).max(100).required("Required"),
            isPrivate: Yup.boolean().required("Required"),
          })}
          onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
            try {
              let res = undefined
              // They are updating a post
              if (!create) {
                res = await GetPatch("review/" + initialValues._id, {
                  ...values,
                });
                setStatus(200);
              } else {
                res = await GetPost("review", {
                  movieId: data.id,
                  userId: user.id,
                  ...values,
                });
                setStatus(201);
              }

              console.log(res.data)

              setTimeout(() => {
                setOpen(!open);
                refresh(res?.data);
              }, 1500);

              setSubmitting(false);
            } catch (error) {
              console.log(error);
              setErrors(error);
            }
          }}
        >
          {(form) => (
            <Form>
              <Box display={"flex"}>
                <Stack gap={1}>
                  <Typography
                    variant="subtitle2"
                    height={0}
                    lineHeight={0}
                    color={"error"}
                  >
                    {form.errors.server}
                  </Typography>
                  <Success start={form.status === 200 || form.status === 201}>
                    <Typography variant="h1">Success!</Typography>
                    <Typography color={"primary.main"}>
                      {form.status === 201
                        ? "Review Created"
                        : "Review Updated"}
                    </Typography>
                  </Success>
                  <Typography variant="subtitle2">
                    Movie rating out of 100
                  </Typography>
                  <Box
                    width={1}
                    mb={2}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <FormInput
                      name="rating"
                      type="number"
                      onInput={(e) => {
                        if (e.target.value > 100) e.target.value = 100;
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 3);
                      }}
                    />
                    <Box>
                      <ScoreCircle input score={form.values.rating} />
                    </Box>
                  </Box>

                  <Typography variant="subtitle2">
                    What were your thoughts about this movie?
                  </Typography>
                  <FormInput
                    type="text"
                    flex={1}
                    multiline
                    rows={4}
                    name="review"
                    label="Review"
                    helperText={`${
                      300 - form.values.review?.length
                    } characters remaining.`}
                    inputProps={{ maxLength: 300 }}
                  />
                  {/* <FormControlLabel
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
              </Box>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default ReviewForm;
