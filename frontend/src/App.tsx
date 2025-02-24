import { Routes, Route } from "react-router-dom";
import { EventList } from "./pages/EventList";
import { FilterEvents } from "./pages/FilterEvents";
import { EventDetail } from "./pages/EventDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EventList />} />
      <Route path="/find-events" element={<FilterEvents />} />
      <Route path="/events/:id" element={<EventDetail />} />
    </Routes>
  );
}

export default App;
