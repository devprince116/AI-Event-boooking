import { eventList } from "../utils/EventDatabase";
import { Box, Typography } from "@mui/material";
import { EventCard } from "./EventCard";

export const SearchEventList = ({ filters }) => {
  const { selectedMonth, selectedYear, selectedCategory } = filters;

  if (selectedCategory === "None") {
    return (
      <Box sx={{ marginTop: "40px", textAlign: "center" }}>
        <Typography variant="h6" color="grey">
          Please select a category
        </Typography>
      </Box>
    );
  }

  const filteredEvents = eventList.filter((event) => {
    const isMonthMatch = event.date.month === selectedMonth;
    const isYearMatch = event.date.year === selectedYear;
    const selectedCategoryLower = selectedCategory?.toLowerCase();
    const eventCategoryLower = event.category.toLowerCase();
    const isCategoryMatch =
      selectedCategoryLower === "none" || selectedCategoryLower === "all"
        ? true
        : eventCategoryLower === selectedCategoryLower;

    return isMonthMatch && isYearMatch && isCategoryMatch;
  });

  return (
    <Box sx={{ marginTop: "40px", width: "100%" }}>
      {filteredEvents.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {filteredEvents.map(
            ({ id, date, heading, location, img, category }) => (
              <Box key={id} sx={{ flex: "0 1 300px" }}>
                <EventCard
                  id={id}
                  date={date}
                  heading={heading}
                  location={location}
                  img={img}
                  category={category}
                />
              </Box>
            )
          )}
        </Box>
      ) : (
        <Typography variant="h6" color="grey" textAlign="center">
          No Events found for the selected filters
        </Typography>
      )}
    </Box>
  );
};
