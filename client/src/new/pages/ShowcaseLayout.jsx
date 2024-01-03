import { Box, Stack } from "@mui/material";

const ShowcaseLayout = ({ image, children }) => {
  return (
    <Stack width={1} alignItems={"center"} bgcolor={"gainsboro"} zIndex={-1}>
      <Box
        component={"img"}
        src={image}
        sx={{
          width: 1,
          objectFit: "cover",
          objectPosition: "top",
          zIndex: -1,
          position: "absolute",
          height: 600,
          filter: " brightness(.7)",
        }}
      />
      <Box
        sx={{
          background: "linear-gradient(0deg, #181818, transparent)",
          bgcolor: "primary.light",
          width: 1,
          minHeight:700,
          mt: "600px",
        }}
      >
        <Box sx={{ width: "80%", mx: "auto" }}>{children}</Box>
      </Box>
    </Stack>
  );
};

export default ShowcaseLayout;
