import { Box, Button, Typography } from "@mui/material";
import Logo from "@/atoms/Logo";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width:1,
        display: "flex",
        alignItems: "center",
        bgcolor:'background.default',
        p: 5,
        gap: 7,
      }}
    >
      <Box>
        <Typography variant="h2">So Sorry!</Typography>
        <Typography variant="h5" mb={2}>
          Something went wrong when loading this page.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate({ pathname: "/home" })}
        >
          Back to home
        </Button>
      </Box>
      <Logo height={300} />
    </Box>
  );
};

export default ErrorPage;
