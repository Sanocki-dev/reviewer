import { ListAlt, Person, Star, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";

const JoinNow = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box bgcolor={"neutral.light"} py={3} px={4} borderRadius={3}>
      <Typography variant="h2">Join R8Hub Today!</Typography>
      <Box display={"flex"} flexDirection={isMobile ? "column" : "row"} mb={3}>
        <Typography
          variant="subtitle1"
          my={3}
          width={isMobile ? "100%" : "60%"}
        >
          Get access to maintain your own custom personal lists, track what
          you've seen and search and filter for what to watch next—regardless if
          it's in theatres, on TV or available on popular streaming services
          like Netflix, Disney Plus, Amazon Prime Video, Hayu, and Crave.
        </Typography>
        <List dense sx={{ ml: isMobile ? 0 : 2 }}>
          <ListItem>
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText>
              Review your favorite movies for others to see
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText>
              Follow your friends and see their reviews
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText>
              Create your own watch lists and share them with your friends
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Visibility />
            </ListItemIcon>
            <ListItemText>
              Track what you've already watched and want to see
            </ListItemText>
          </ListItem>
        </List>
      </Box>
      <Button variant="contained">Sign Up</Button>
    </Box>
  );
};

export default JoinNow;
