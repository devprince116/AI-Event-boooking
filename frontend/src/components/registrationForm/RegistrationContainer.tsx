import { useState } from "react";
import { Paper, Box } from "@mui/material";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import { RegistrationForm } from "./RegistrationForm";
import { CheckCircleOutline } from "@mui/icons-material";
import { Fade, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

//  apply form validation
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const RegistrationContainer
= () => {
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //  handle form submission
  const onSubmit = async (data: { name: string; email: string }) => {
    setFormData(data);
    setRegistered(true);
    toast.success("Registered successfully");
    try {
      await emailjs.send(
        USER_ID,
        SERVICE_ID,
        { to_email: data.email, user_name: data.name },
        TEMPLATE_ID
      );
      toast.success("Email sent successfully");
    } catch (error) {
      console.error("Error sending email", error);
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
          <RegistrationForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />
        ) : (
          <Fade in={true} timeout={500}>
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
                  formData?.email || ""
                )}`}
                size={180}
              />
            </Box>
          </Fade>
        )}
      </Paper>
    </Box>
  );
};
