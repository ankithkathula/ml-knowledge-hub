import { createContext, useContext, useState, type ReactNode } from "react";
import { EVENTS as STATIC_EVENTS, type MlEvent } from "./eventData";

interface EventsContextValue {
  events: MlEvent[];
  addEvent: (event: MlEvent) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<MlEvent[]>(STATIC_EVENTS);

  function addEvent(event: MlEvent) {
    setEvents((prev) => [event, ...prev]);
  }

  return <EventsContext.Provider value={{ events, addEvent }}>{children}</EventsContext.Provider>;
}

export function useEvents() {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error("useEvents must be used within EventsProvider");
  return ctx;
}
