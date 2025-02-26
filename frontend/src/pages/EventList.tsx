import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Navigation } from "../components/Navigation";
import { EventCard } from "../components/EventCard";
import { eventList } from "../utils/EventDatabase";

interface Event {
  id: number;
  heading: string;
  date: {
    year: number;
    month: string;
  };
  location: string;
  img: string;
  category: string;
}

export const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    // Simulate loading effect
    setTimeout(() => {
      setEvents(eventList);
      setLoading(false);
    }, 1000); // Loader stays for 1 sec
  }, []);

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

        {/* Show Loader Until Data is Fetched */}
        {loading ? (
          <Stack alignItems="center" justifyContent="center" height="50vh">
            <CircularProgress />
          </Stack>
        ) : events.length > 0 ? (
          <Box
            sx={{
              maxWidth: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {events.map(({ id, date, heading, location, img, category }) => (
              <EventCard
                key={id}
                id={id}
                date={`${date.month} ${date.year}`} // Format date properly
                heading={heading}
                location={location}
                img={img}
                category={category}
              />
            ))}
          </Box>
        ) : (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", mt: 4, color: "gray" }}
          >
            No events available.
          </Typography>
        )}
      </Container>
    </>
  );
};
