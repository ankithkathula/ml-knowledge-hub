import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./components/ThemeContext";
import { EventsProvider } from "./components/data/eventsStore";

export default function App() {
  return (
    <ThemeProvider>
      <EventsProvider>
        <RouterProvider router={router} />
      </EventsProvider>
    </ThemeProvider>
  );
}
