# Dynamic Event Calendar

A feature-rich **Dynamic Event Calendar** built using **React.js** and **Tailwind CSS**. This application allows users to efficiently manage their daily events, offering functionality to add, edit, and delete events, with enhancements like local storage support, overlapping prevention, and color-coded event categories.

## Features

### 1. Add Events
- Easily add events by selecting a specific day on the calendar.

### 2. Edit/Delete Events
- Edit or delete events for any selected day to keep your schedule updated.

### 3. Local Storage Support
- All events are saved to the browser’s local storage, ensuring persistence even after a page reload.

### 4. Overlapping Prevention
- Prevents the addition of duplicate events (events with the same name and time).

### 5. Color-Coded Event Categories
- Events are categorized into **Work**, **Personal**, and **Others** for easy identification:
  - **Work**: Blue
  - **Personal**: Green
  - **Others**: Purple

## Technologies Used

- **React.js**: For building the user interface and handling state management.
- **Tailwind CSS**: For creating a responsive and visually appealing design.

## Installation

### Prerequisites
- Node.js and npm installed on your system.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dynamic-event-calendar.git
   ```

2. Navigate to the project directory:
   ```bash
   cd dynamic-event-calendar
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. **Adding an Event**:
   - Click on a specific day on the calendar.
   - Fill in the event details (name, time, and category) in the event modal.
   - Submit the form to add the event.

2. **Editing an Event**:
   - Select a day with existing events.
   - Click the "Edit" button next to the event to modify its details.

3. **Deleting an Event**:
   - Select a day with existing events.
   - Click the "Delete" button next to the event to remove it.

4. **Event Categories**:
   - Choose a category (Work, Personal, Others) while adding or editing an event.
   - Events are displayed with category-specific colors.

5. **Overlapping Prevention**:
   - The app prevents adding events with the same name and time.


## Folder Structure

```
.
|-- src
    |-- components
        |-- DynamicCalendar.jsx
        |-- EventModal.jsx
        |-- EventList.jsx
    |-- App.jsx
    |-- index.js
    |-- styles
        |-- tailwind.css
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any queries or feedback, please contact:

- **Name**: Your Name
- **Email**: your.email@example.com
- **GitHub**: [your-username](https://github.com/your-username)

---

Thank you for using the **Dynamic Event Calendar**!
