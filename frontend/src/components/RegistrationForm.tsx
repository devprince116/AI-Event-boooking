import { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Zoom,
  Fade,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { QRCodeSVG } from "qrcode.react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

export const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [registered, setRegistered] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleRegister = async () => {
    if (name.trim() && validateEmail(email)) {
      setRegistered(true);
      setShowSuccess(true);

      const templateParams = { to_email: email, user_name: name };
      try {
        await emailjs.send(
          "service_9rursh8",
          "template_g445vv9",
          templateParams,
          "MIyqh4eAYodDGJPUi"
        );
        toast.success("Email sent successfully");
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email", error);
      }
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    }
  };

  return (
    <Box
      item
      xs={12}
      md={6}
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
          width: "100%",
          maxWidth: "500px",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!registered ? (
          <>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Register for this Event
            </Typography>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.8, fontSize: "1.1rem", fontWeight: "bold" }}
              onClick={handleRegister}
              disabled={!name.trim() || !validateEmail(email)}
            >
              Register Now
            </Button>
          </>
        ) : (
          <Fade in={showSuccess} timeout={500}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CheckCircleOutline
                color="success"
                sx={{ fontSize: 100, mb: 2 }}
              />
              <Typography variant="h5" fontWeight="bold" color="success" mb={2}>
                Registration Successful!
              </Typography>
              <Typography variant="body1" fontWeight="bold" mb={2}>
                Scan this QR to get your ticket on your registered email ID.
              </Typography>
              <Box
                sx={{
                  padding: "16px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <QRCodeSVG
                  value={`http://localhost:5173/confirm?email=${encodeURIComponent(
                    email
                  )}`}
                  size={180}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="Q"
                  includeMargin={true}
                />
              </Box>
            </Box>
          </Fade>
        )}
      </Paper>
    </Box>
  );
};
