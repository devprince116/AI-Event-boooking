import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

interface EventCardProps {
  id: number;
  heading: string;
  date: { year: number; month: string };
  location: string;
  img: string;
  category: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  id,
  heading,
  date,
  location,
  img,
  category,
}) => {
  return (
    <Link to={`/events/${id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
          gap: 2,
          padding: 3,
          borderRadius: 2,
          border: "2px solid #4CAF50",
          transition: "box-shadow 0.3s",
          "&:hover": { boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)" },
          width: { xs: "100%", sm: "550px" },
        }}
      >
        {/* Event Image */}
        <CardMedia
          component="img"
          image={img}
          alt="Event"
          sx={{
            width: { xs: "100%", sm: "280px" },
            borderRadius: 2,
            objectFit: "cover",
            loader: "lazy",
          }}
        />

        {/* Event Details */}
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: { xs: "100%", sm: "230px" },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              textTransform: "uppercase",
              mb: 2,
              color: "#2B322B",
            }}
          >
            {heading}
          </Typography>
          <Box
            sx={{
              display: "flex",
              direction: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              fontSize: "16px",
              mb: 1,
            }}
          >
            <Typography variant="body2">Year: {date.year}</Typography>
            <Typography variant="body2">Month: {date.month}</Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {location}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 200 }}
            fontSize={20}
            color="#2e2f30"
          >
            {category}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
