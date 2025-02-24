import { useState, useEffect } from "react";
import { months, years } from "../utils/DataRender";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
} from "@mui/material";

interface FilterBoxProps {
  getFilters: (
    selectedMonth: string,
    selectedYear: number,
    selectedCategory: string
  ) => void;
}

export const FilterBox: React.FC<FilterBoxProps> = ({ getFilters }) => {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedCategory, setSelectedCategory] = useState("None"); // Default to None

  useEffect(() => {
    getFilters(selectedMonth, selectedYear, selectedCategory);
  }, [selectedMonth, selectedYear, selectedCategory, getFilters]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: 500,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        border: "1px solid var(--primary-color)",
        backgroundColor: "#fff",
        marginBottom: "40px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Month</InputLabel>
          <Select
            label="Month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            label="Year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <FormControl sx={{ width: "100%", marginTop: "16px" }}>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={selectedCategory}
          onChange={(e) => {
            const value = String(e.target.value);
            setSelectedCategory(value);
            console.log("Selected Category:", value);
          }}
        >
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="concert">Concert</MenuItem>
          <MenuItem value="workshop">Workshop</MenuItem>
          <MenuItem value="conference">Conference</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};
