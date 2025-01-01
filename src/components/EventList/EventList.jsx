import React from "react";
import IconPlus from "../icons/IconPlus";
import IconEdit from "../icons/IconEdit";
import IconTrash from "../icons/IconTrash";
import { categoryColors } from "../Calendar/DynamicCalendar";

const EventList = ({
  selectedDate,
  getEventsForDate,
  handleAddEventClick,
  handleDeleteEvent,
  handleEditEvent,
}) => {
  const events = getEventsForDate(selectedDate);

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h4 className="text-lg font-semibold">Events</h4>
        <button
          onClick={handleAddEventClick}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          <IconPlus />
        </button>
      </div>

      <div className="mt-2">
        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events for this date.</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              // className="mt-2 p-2 border rounded-lg bg-gray-50"
              className={`mt-2 p-2 border rounded-lg ${
                categoryColors[event.category]
              } bg-opacity-20`}
            >
              <div className="flex justify-between items-center">
                <h5 className="font-semibold">{event.name}</h5>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditEvent(event)}
                    className="p-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                  >
                    <IconEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <IconTrash />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">{`${event.startTime} - ${event.endTime}`}</p>
              {event.description && (
                <p className="text-sm text-gray-500">{event.description}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;
