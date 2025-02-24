import { useParams } from "react-router-dom";
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
} from "@mui/material";
import { RegistrationForm } from "../components/RegistrationForm";

export const EventDetail = () => {
  const { id } = useParams();
  const numId = Number(id);

  const filteredEvent = eventList.find(
    (eventDetail) => eventDetail.id === numId
  );

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
    <Fade in timeout={1200}>
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
                  {/* Event Image */}
                  <CardMedia
                    component="img"
                    height="250"
                    image={filteredEvent.img}
                    alt={filteredEvent.heading}
                    sx={{ objectFit: "cover", borderRadius: "15px 15px 0 0" }}
                  />

                  {/* Event Details */}
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

                    {/* Date & Location */}
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

                    {/* Description */}
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

            {/* Right Side: Registration Form */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Grow in timeout={1100}>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "420px",
                  }}
                >
                  <RegistrationForm />
                </Box>
              </Grow>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fade>
  );
};
