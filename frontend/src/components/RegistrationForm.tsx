import { useState } from "react";
import { Paper, Typography, TextField, Button, Box, Fade } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { QRCodeSVG } from "qrcode.react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Event {
  id: number;
  heading: string;
  date: { year: number; month: string };
  location: string;
  img: string;
  category: string;
}

interface RegistrationFormProps {
  filteredEvents: Event;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  filteredEvents,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [registered, setRegistered] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [recommendedEvents, setRecommendedEvents] = useState<{
    requestedEvents: Event[];
    futureEvents: Event[];
  }>({
    requestedEvents: [],
    futureEvents: [],
  });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(
      validateEmail(e.target.value) ? "" : "Please enter a valid email address"
    );
  };

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(BASE_URL + "/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: filteredEvents.location,
          month: filteredEvents.date.month,
          year: filteredEvents.date.year,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setRecommendedEvents({
          requestedEvents: data.recommendations.data.requestedEvents,
          futureEvents: data.recommendations.data.futureEvents,
        });
      }
    } catch (error) {
      console.error("Error fetching event recommendations:", error);
    }
  };

  const handleRegister = async () => {
    if (name.trim() && validateEmail(email)) {
      setRegistered(true);
      setShowSuccess(true);
      await fetchRecommendations();
      toast.success("Registered successfully");
      try {
        await emailjs.send(
          USER_ID,
          SERVICE_ID,
          { to_email: email, user_name: name },
          TEMPLATE_ID
        );
        toast.success("Email sent successfully");
      } catch (error) {
        console.error("Error sending email", error);
      }
    } else {
      setEmailError("Please enter a valid email");
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Paper
        elevation={6}
        sx={{
          padding: "40px",
          borderRadius: "16px",
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        {!registered ? (
          <>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Register for this Event
            </Typography>
            <TextField
              label="Full Name"
              fullWidth
              sx={{ mb: 2 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              sx={{ mb: 2 }}
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ py: 1.5 }}
              onClick={handleRegister}
              disabled={!name || !validateEmail(email)}
            >
              Register Now
            </Button>
          </>
        ) : (
          <Fade in={showSuccess} timeout={500}>
            <Box>
              <CheckCircleOutline
                color="success"
                sx={{ fontSize: 100, mb: 2 }}
              />
              <Typography variant="h5" fontWeight="bold" color="success" mb={2}>
                Registration Successful!
              </Typography>
              <QRCodeSVG
                value={`http://localhost:5173/confirm?email=${encodeURIComponent(
                  email
                )}`}
                size={180}
              />
              {recommendedEvents.requestedEvents.length > 0 && (
                <>
                  <Typography variant="h6" fontWeight="bold" mt={4} mb={2}>
                    Upcoming Events in {filteredEvents.location}:
                  </Typography>
                  {recommendedEvents.requestedEvents.map((event) => (
                    <Box
                      key={event.id}
                      sx={{
                        mb: 2,
                        border: "1px solid #ccc",
                        padding: 2,
                        borderRadius: "8px",
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {event.heading}
                      </Typography>
                      <Typography variant="body2">
                        {event.date.month} {event.date.year} - {event.location}
                      </Typography>
                    </Box>
                  ))}
                </>
              )}
            </Box>
          </Fade>
        )}
      </Paper>
    </Box>
  );
};
