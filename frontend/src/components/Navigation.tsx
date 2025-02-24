import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export const Navigation = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(to right,rgb(9, 11, 55),rgb(31, 56, 120))",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 4,
          paddingX: { xs: 2, md: 10 },
        }}
      >
        <Box component={Link} to="/" sx={navLinkStyle}>
          <Typography variant="body2">Home</Typography>
        </Box>

        <Box component={Link} to="/find-events" sx={navLinkStyle}>
          <Typography variant="body2">Book Now 👉</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const navLinkStyle = {
  textDecoration: "none",
  fontWeight: 400,
  fontSize: "14px",
  color: "#e3c23d", // White text for better contrast
  padding: "8px 16px",
  borderRadius: "8px",
  transition: "all 0.2s ease-in-out", // Smooth transition
  "&:hover": {
    color: "#fff",
    transform: "scale(1.05)",
  },
};
