import { useCallback, useState } from "react";
import { FilterBox } from "../components/FilterBox";
import { Navigation } from "../components/Navigation";
import { Box, Container, Grid, Fade } from "@mui/material";
import { SearchEventList } from "../components/SearchEventList";

export const FilterEvents = () => {
  const [filters, setFilters] = useState({
    selectedMonth: null,
    selectedYear: null,
    selectedCategory: null,
  });

  const getFilters = useCallback(
    (selectedMonth, selectedYear, selectedCategory) => {
      setFilters({ selectedYear, selectedMonth, selectedCategory });
    },
    []
  );

  return (
    <Box>
      <Navigation />
      <Container
        sx={{
          backgroundColor: "var(--bg-color)",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "100px",
        }}
      >
        <Fade in timeout={1000}>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <FilterBox getFilters={getFilters} />
          </Box>
        </Fade>
        <SearchEventList filters={filters} />
      </Container>
    </Box>
  );
};
