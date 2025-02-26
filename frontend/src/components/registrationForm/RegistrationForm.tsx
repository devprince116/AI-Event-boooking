import { Button, TextField, Typography } from "@mui/material";

export interface Event {
  id: number;
  heading: string;
  date: { year: number; month: string };
  location: string;
  img: string;
  category: string;
}
export const RegistrationForm = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Register for this Event
      </Typography>
      <TextField
        label="Name"
        fullWidth
        sx={{ mb: 2 }}
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        sx={{ mb: 2 }}
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Button variant="contained" fullWidth sx={{ py: 1.5 }} type="submit">
        Register Now
      </Button>
    </form>
  );
};
