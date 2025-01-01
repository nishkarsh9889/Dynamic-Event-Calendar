import { useEffect } from "react";
import IconX from "../icons/IconX";
import IconClock from "../icons/IconClock";

const EventModal = ({
  editingEvent,
  newEvent,
  setNewEvent,
  setShowEventModal,
  handleEventSubmit,
}) => {
  useEffect(() => {
    if (editingEvent) {
      setNewEvent({
        name: editingEvent.name,
        startTime: editingEvent.startTime,
        endTime: editingEvent.endTime,
        description: editingEvent.description || "",
        category: editingEvent.category,
      });
    }
  }, [editingEvent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => setShowEventModal(false);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="text-lg font-semibold">
            {editingEvent ? "Edit Event" : "Add Event"}
          </h3>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <IconX />
          </button>
        </div>

        <form onSubmit={handleEventSubmit} className="p-4">
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-700"
            >
              Category
            </label>
            <select
              name="category"
              value={newEvent.category || ""}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="others">Others</option>
            </select>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={newEvent.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label
                htmlFor="startTime"
                className="block text-sm font-semibold text-gray-700"
              >
                Start Time
              </label>
              <div className="flex items-center gap-2">
                <IconClock />
                <input
                  type="time"
                  name="startTime"
                  value={newEvent.startTime}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            <div className="w-1/2">
              <label
                htmlFor="endTime"
                className="block text-sm font-semibold text-gray-700"
              >
                End Time
              </label>
              <div className="flex items-center gap-2">
                <IconClock />
                <input
                  type="time"
                  name="endTime"
                  value={newEvent.endTime}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700"
            >
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows="3"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {editingEvent ? "Save Changes" : "Add Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
