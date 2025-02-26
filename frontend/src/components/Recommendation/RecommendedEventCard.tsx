import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Event } from "../registrationForm/RegistrationForm";
import { Link } from "react-router-dom";

interface RecommendedEventCardProps {
  event: Event;
}

export const RecommendedEventCard = ({ event }: RecommendedEventCardProps) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link
      to={`/events/${event.id}`}
      style={{ textDecoration: "none" }}
      onClick={handleClick}
    >
      <Card
        sx={{
          borderRadius: "15px",
          mt: 3,
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <CardMedia
          component="img"
          height="160"
          image={event.img}
          alt={event.heading}
          sx={{ borderRadius: "15px 15px 0 0", objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {event.heading}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
              mt: 1,
            }}
          >
            <Typography variant="body2">Year: {event.date.year}</Typography>
            <Typography variant="body2">Month: {event.date.month}</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {event.location}
          </Typography>
          <Typography
            variant="subtitle1"
            fontSize={16}
            color="#2e2f30"
            sx={{ mt: 1 }}
          >
            {event.category}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
