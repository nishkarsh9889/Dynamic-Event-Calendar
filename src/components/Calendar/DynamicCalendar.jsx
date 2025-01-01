import React, { useState, useEffect } from "react";
import IconChevronLeft from "../icons/IconChevronLeft";
import IconChevronRight from "../icons/IconChevronRight";
import EventModal from "../modals/EventModal";
import EventList from "../EventList/EventList";

export const categoryColors = {
  work: "bg-blue-500",
  personal: "bg-green-500",
  others: "bg-yellow-500",
};

const DynamicCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEventList, setShowEventList] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  const [newEvent, setNewEvent] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
    category: "",
  });

  // Local Storage functionality
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const calendarDays = [];

    for (let i = 0; i < startingDay; i++) {
      calendarDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(new Date(year, month, day));
    }

    return calendarDays;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowEventList(true);
    setEditingEvent(null);
  };

  const handleAddEventClick = () => {
    setNewEvent({
      name: "",
      startTime: "",
      endTime: "",
      description: "",
      category: "",
    });
    setEditingEvent(null);
    setShowEventModal(true);
  };

  // Add event
  const handleEventSubmit = (e) => {
    e.preventDefault();

    if (
      !selectedDate ||
      !newEvent.name ||
      !newEvent.startTime ||
      !newEvent.endTime
    )
      return;

    // Check for overlapping events
    const duplicateEvent = events.find(
      (event) =>
        event.name === newEvent.name &&
        event.startTime === newEvent.startTime &&
        event.endTime === newEvent.endTime
    );

    if (duplicateEvent) {
      alert("This event already exists.");
      return;
    }

    const eventData = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: selectedDate,
      ...newEvent,
    };

    setEvents((prev) => {
      if (editingEvent) {
        return prev.map((event) =>
          event.id === editingEvent.id ? eventData : event
        );
      }
      return [...prev, eventData];
    });

    setShowEventModal(false);
    setEditingEvent(null);
    setNewEvent({
      name: "",
      startTime: "",
      endTime: "",
      description: "",
      category: "",
    });
  };

  // Edit Event
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent({
      name: event.name,
      startTime: event.startTime,
      endTime: event.endTime,
      description: event.description || "",
      category: event.category,
    });
    setShowEventModal(true);
  };

  // Delete event
  const handleDeleteEvent = (eventId) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter(
      (event) => new Date(event.date).toDateString() === date.toDateString()
    );
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-center text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 text-transparent bg-clip-text">
            Dynamic Event Calendar
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <IconChevronLeft />
              </button>
              <span className="text-xl font-semibold">{monthYear}</span>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <IconChevronRight />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center font-semibold">
                {day}
              </div>
            ))}
            {getDaysInMonth(currentDate).map((date, index) => (
              <div
                key={index}
                className={`min-h-24 p-2 border rounded-md ${
                  date ? "hover:bg-gray-50 cursor-pointer" : ""
                } ${
                  selectedDate &&
                  date &&
                  selectedDate.toDateString() === date.toDateString()
                    ? "bg-blue-50"
                    : ""
                }`}
                onClick={() => date && handleDateClick(date)}
              >
                {date && (
                  <>
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-sm ${
                          date.getMonth() !== currentDate.getMonth()
                            ? "text-gray-400"
                            : ""
                        }`}
                      >
                        {date.getDate()}
                      </span>
                      {getEventsForDate(date).length > 0 && (
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                    <div className="mt-1">
                      {getEventsForDate(date)
                        .slice(0, 2)
                        .map((event) => (
                          <div
                            key={event.id}
                            // className="text-xs truncate text-gray-600"
                            className={`text-xs truncate text-white px-1 rounded-md ${
                              categoryColors[event.category]
                            }`}
                          >
                            {event.name}
                          </div>
                        ))}
                      {getEventsForDate(date).length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{getEventsForDate(date).length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {showEventList && selectedDate && (
            <EventList
              selectedDate={selectedDate}
              getEventsForDate={getEventsForDate}
              handleAddEventClick={handleAddEventClick}
              setShowEventList={setShowEventList}
              handleDeleteEvent={handleDeleteEvent}
              handleEditEvent={handleEditEvent}
            />
          )}

          {showEventModal && (
            <EventModal
              editingEvent={editingEvent}
              newEvent={newEvent}
              setNewEvent={setNewEvent}
              setShowEventModal={setShowEventModal}
              handleEventSubmit={handleEventSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicCalendar;
