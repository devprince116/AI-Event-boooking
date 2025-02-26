import { useState, useEffect } from "react";
import { Box, Typography, Grid, Fade, CircularProgress } from "@mui/material";
import { Event } from "../registrationForm/RegistrationForm";
import { RecommendedEventCard } from "./RecommendedEventCard";

interface RecommendationsProps {
  recommendedEvents: {
    requestedEvents: Event[];
    nearestEvents: Event[];
    futureEvents: Event[];
  };
}

export const Recommendations = ({
  recommendedEvents,
}: RecommendationsProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Fade in timeout={1000}>
      <Box sx={{ mt: -15, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          You Might Also Be Interested In
        </Typography>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {[
              ...recommendedEvents.requestedEvents,
              ...recommendedEvents.nearestEvents,
              ...recommendedEvents.futureEvents,
            ].map((event) => (
              <Grid item key={event.id} xs={12} sm={6} md={4}>
                <RecommendedEventCard event={event} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Fade>
  );
};
