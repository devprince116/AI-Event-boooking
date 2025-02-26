import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { eventList } from "../utils/EventDatabase";
import { Navigation } from "../components/Navigation";
import { MdCalendarMonth, MdCategory } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Grid,
  Fade,
  Grow,
  CircularProgress,
} from "@mui/material";
import { RegistrationContainer } from "../components/registrationForm/RegistrationContainer";
import { Recommendations } from "../components/Recommendation/Recommendations";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const EventDetail = () => {
  const { id } = useParams();
  const numId = Number(id);

  const [recommendedEvents, setRecommendedEvents] = useState({
    requestedEvents: [],
    nearestEvents: [],
    futureEvents: [],
  });

  const [loading, setLoading] = useState(true); // Loader for recommendations

  const filteredEvent = eventList.find(
    (eventDetail) => eventDetail.id === numId
  );

  useEffect(() => {
    if (filteredEvent) {
      setLoading(true);
      fetchRecommendations();
      window.scrollTo(0, 0); // Smoothly scroll to top on event change
    }
  }, [filteredEvent]); // Re-run when event changes

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(BASE_URL + "/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: filteredEvent?.location || "",
          month: filteredEvent?.date.month || "",
          year: filteredEvent?.date.year || "",
        }),
      });
      const data = await response.json();
      if (data.success) {
        setTimeout(() => {
          // Smooth loading effect
          setRecommendedEvents({
            requestedEvents: data.recommendations.data.requestedEvents,
            nearestEvents: data.recommendations.data.nearestEvents,
            futureEvents: data.recommendations.data.futureEvents,
          });
          setLoading(false);
        }, 800);
      }
    } catch (error) {
      console.error("Error fetching event recommendations:", error);
      setLoading(false);
    }
  };

  if (!filteredEvent) {
    return (
      <Container maxWidth="md">
        <Typography variant="h5" color="error" textAlign="center" mt={5}>
          Event Not Found
        </Typography>
      </Container>
    );
  }

  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pb: 6,
        }}
      >
        <Navigation />
        <Container maxWidth="lg" sx={{ mt: 6, borderRadius: "15px" }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left Side: Event Details */}
            <Grid item xs={12} md={6}>
              <Grow in timeout={1000}>
                <Card
                  sx={{
                    maxHeight: "600px",
                    borderRadius: "15px",
                    overflow: "hidden",
                    background: "linear-gradient(135deg, #ffffff, #f0f0f0)",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={filteredEvent.img}
                    alt={filteredEvent.heading}
                    sx={{ objectFit: "cover", borderRadius: "15px 15px 0 0" }}
                  />
                  <CardContent sx={{ padding: "20px" }}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      textTransform="uppercase"
                      color="primary"
                      mb={2}
                      sx={{ letterSpacing: "1px" }}
                    >
                      {filteredEvent.heading}
                    </Typography>
                    <Stack direction="row" spacing={2} mb={2}>
                      <Box display="flex" alignItems="center">
                        <MdCalendarMonth size={24} color="#1976D2" />
                        <Typography
                          variant="h6"
                          ml={1}
                          sx={{ fontSize: "16px", color: "#333" }}
                        >
                          {filteredEvent.date.month} {filteredEvent.date.year}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <IoLocationSharp size={24} color="#D32F2F" />
                        <Typography
                          variant="h6"
                          ml={1}
                          sx={{ fontSize: "16px", color: "#444" }}
                        >
                          {filteredEvent.location}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <MdCategory size={24} color="#388E3C" />
                        <Typography
                          variant="h6"
                          ml={1}
                          sx={{ fontSize: "16px", color: "#555" }}
                        >
                          {filteredEvent.category}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="secondary"
                      mt={2}
                    >
                      Event Description:
                    </Typography>
                    <Typography
                      variant="body1"
                      mt={1}
                      sx={{ fontSize: "16px", color: "#666" }}
                    >
                      {filteredEvent.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Grow in timeout={1100}>
                <Box sx={{ width: "100%", maxWidth: "420px" }}>
                  <RegistrationContainer />
                </Box>
              </Grow>
            </Grid>
          </Grid>
          <Box mt={4}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <Recommendations recommendedEvents={recommendedEvents} />
            )}
          </Box>
        </Container>
      </Box>
    </Fade>
  );
};
