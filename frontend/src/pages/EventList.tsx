import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import { eventList } from "../utils/EventDatabase";
import { Navigation } from "../components/Navigation";
import { EventCard } from "../components/EventCard";

export const EventList = () => {
  return (
    <>
      <Navigation />
      <Container maxWidth="xl" sx={{ mt: 18, mb: 6 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            mb: 4,
            color: "var(--primary-color)",
          }}
        >
          Upcoming Events
        </Typography>

        {eventList.length > 0 ? (
          <Box
            sx={{
              maxWidth: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {eventList.map(({ id, date, heading, location, img, category }) => (
              <EventCard
                id={id}
                date={date}
                heading={heading}
                location={location}
                img={img}
                category={category}
              />
            ))}
          </Box>
        ) : (
          <Stack alignItems="center" justifyContent="center" height="40vh">
            <CircularProgress />
          </Stack>
        )}
      </Container>
    </>
  );
};
