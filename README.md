# TLAC Application Setup and Usage Guide

This guide provides instructions for setting up and running the TLAC application, including both the API and Frontend (FE), as well as an overview of the application's functionalities.

---

## Setup Instructions

### 1. Clone the Repositories

- **API Repository**: [https://github.com/qasweeney/API-TLAC](https://github.com/qasweeney/API-TLAC)
- **Frontend Repository**: [https://github.com/qasweeney/FE-TLAC](https://github.com/qasweeney/FE-TLAC)

### 2. Environment Configuration

- The `.env` file is already configured in the **FE repository**. No changes are required.

### 3. API Settings

- Download the `appsettings.json` file from the project submission and place it in the root of the **API repository**.

### 4. Run the Application

- **API Repository**:
  - Start the API: `dotnet run`
  - If you'd like to see endpoints: `dotnet watch run`
- **Frontend Repository**:
  - Start the frontend: `npm start`

---

## Login Credentials

### Admin Account

- **Email**: [admin@tlac.com](mailto:admin@tlac.com)
- **Password**: `password`

### Predefined User Accounts

1. **Trainer Account**:
   - **Email**: [billjones@example.com](mailto:billjones@example.com)
   - **Password**: `password123`
2. **Member Account**:
   - **Email**: [john.doe@example.com](mailto:john.doe@example.com)
   - **Password**: `password123`

### Creating New Accounts

- You can create additional member and trainer accounts to explore functionality. However, if you'd like to view accounts with existing sessions, log in using the predefined accounts above.

---

## Application Features

### General

- All session list components have advanced filtering options that allow filtration by various data types.

### Trainer Features

1. Create unique sessions.
2. Create recurring sessions.
3. Cancel sessions (registered or unregistered).
4. View past sessions.
5. View upcoming sessions.
6. View upcoming unregistered sessions.
7. Change profile picture and bio.
8. View Key Performance Indicators (KPIs) for past sessions.

### Member Features

1. Register for a session.
2. View trainer profiles (including profile picture and bio) by clicking on their name in a session card.
3. View upcoming sessions.
4. View past sessions.
5. Cancel an upcoming session.
6. View and edit profile details.

### Admin Features

1. View KPIs for all users.
2. Compare KPIs within specific time windows.
3. Ban or unban admin and trainer accounts.
4. Approve or deny pending trainer account applications.

---
