## Demo Link:

# React_Firebase_Expense_Tracker:

React-based, Firebase-powered solution for managing expenses. Features user-specific records, visualizations, and easy report downloads.

- **Create React App (CRA):** Bootstrapping the React application.
- **Firebase:** Utilized for authentication, Firestore for storage, and Firebase Storage for file storage.
- **Chart.js:** Rendering interactive charts for expense visualization.
- **PrimeReact:** UI components library for a polished interface.
- **React Redux & Redux Toolkit:** State management for efficient data flow.
- **React Toastify:** Providing notifications for user interactions.

# React Firebase ExpenseTracker:

Efficiently manage your expenses with this React-based expense tracking application powered by Firebase.

## Features:

- - **Authentication:** Firebase authentication for secure user login/signup.
- **Expense Management:** Add, edit, categorize expenses.
- **Visualization:** Visual representation of expenses via charts.
- **Data Storage:** Firestore to store expense data securely.
- **UI Components:** PrimeReact components for a sleek interface.
- **State Management:** Redux Toolkit for efficient state handling.
- **Notifications:** React Toastify for user-friendly notifications.
- **Download Reports:** Easily download comprehensive expense reports.

## Setup:

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Run the app: `npm start`.

## Usage:

- Sign up or log in to access personalized expense tracking.
- Add, edit, and categorize expenses effortlessly.
- Visualize spending habits with detailed charts.
- Download reports for convenient financial analysis.

## Technologies Used:

- React
- Firebase
- Chart.js

## Folder Structure

The project follows a structured organization:

```plaintext
expense-tracker-app/
│
├── public/
│   ├── index.html
│   └── ...
│
├── src/
│   ├── assets/
│   │   └── ...
│   ├── components/
│   │   ├── Auth/
│   │   │   └── ...
│   │   ├── Dashboard/
│   │   │   └── ...
│   │   ├── Expenses/
│   │   │   └── ...
│   │   └── ...
│   │
│   ├── services/
│   │   ├── firebase.js
│   │   └── ...
│   │
│   ├── store/
│   │   ├── actions/
│   │   │   └── ...
│   │   ├── reducers/
│   │   │   └── ...
│   │   └── configureStore.js
│   │
│   ├── utils/
│   │   └── ...
│   │
│   ├── App.js
│   ├── index.js
│   └── ...
│
├── .gitignore
├── package.json
├── README.md
└── ...
```

## Contributing:

Contributions are welcome! Feel free to fork the repository and submit pull requests.

## License:

This project is licensed under the [MIT License](link-to-license).
