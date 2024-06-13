# Car Wash Management System

[Live URL](https://your-new-vercel-live-url.com)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)

## Introduction

**Car Wash Management System** is a comprehensive solution for managing car wash services. This application allows customers to book car wash services online, and administrators to manage bookings, services, and availability efficiently. The system is built using Node.js and TypeScript, providing a scalable and maintainable codebase with essential tools and configurations.

## Features

- **User Authentication**: Secure authentication using JWT and bcrypt.
- **Environment Configuration**: Manage environment variables with dotenv.
- **Input Validation**: Robust input validation with Zod.
- **Database Integration**: Seamless integration with MongoDB using Mongoose.
- **Code Quality**: Enforced coding standards with ESLint and Prettier.

## Technologies Used

- **Backend**:

  - Node.js
  - Express.js
  - TypeScript

- **Database**:

  - MongoDB
  - Mongoose

- **Other Tools**:
  - Vercel (for hosting)
  - Git

## ER Diagram

Below is the Entity-Relationship (ER) diagram for the project:

![ER Diagram](./ERDiagram.png)

## Setup and Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/ahmedhimel21/car_washing_service_backend
   ```
2. **Navigate to the project directory:**
   ```sh
   cd your-repo-name
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Set up environment variables:**
   ```
   Create a .env file in the root directory and add the necessary environment variables as shown in .env.example.
   ```
5. **Build the project:**
   ```sh
   npm run build
   ```
6. **Start the application in development mode:**
   ```sh
   npm run start:dev
   ```
7. **Open the application in your browser:**
   ```
   Go to http://localhost:3000
   ```
