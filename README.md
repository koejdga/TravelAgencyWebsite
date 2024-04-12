# Travel Agency Website

Welcome to the Travel Agency Website! This website serves as a platform for users to explore and book trips offered by a travel agency. It features a frontend built with React, a backend with both REST API and GraphQL API, and a MySQL database. Additionally, the React project allows toggling between REST and GraphQL APIs by adjusting a setting in the config file.

## Overview

The Travel Agency Website provides users with an intuitive interface to browse and book trips to various destinations. Users can filter trips by city and explore detailed information about each trip, including available accommodations and dining options. Additionally, administrators can log in to manage the website's content, including adding new hotels, countries, cities, restaurants, and trips, as well as editing or deleting existing entries.

## Features

- **Frontend with React**: Utilizes React to build a dynamic and responsive user interface.
- **Backend with REST and GraphQL APIs**: Offers both REST and GraphQL APIs to provide flexibility and efficiency in data retrieval.
- **GraphQL Subscriptions**: Implements GraphQL subscriptions for real-time updates and AJAX functionality.
- **Filtering Trips by City**: Enables users to filter trips based on the destination city for easy navigation.
- **Admin Panel**: Provides administrators with a secure login to manage website content, including adding, editing, or deleting entries.
- **MySQL Database**: Stores data related to hotels, countries, cities, restaurants, and trips for efficient retrieval and management.

## Tech Stack

- **Frontend**: React, React Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **APIs**: REST, GraphQL

## Setup Instructions

1. Clone the repository to your local machine.
2. Set up the MySQL database using the provided schema (`backend/create_tables.sql`).
4. Navigate to the `backend` directory and install dependencies using `npm install`.
5. Create `.env` file based on `.env.example` and fill in with your variables.
6. Start the REST server, the GraphQL server, or both, depending on your preference.
7. Start the REST server by running `ts-node rest_server.ts`.
8. Start the GraphQL server by running `ts-node apollo_server.ts`.
9. Navigate to the frontend directory and install dependencies using `npm install`.
10. Adjust the API setting in the config file `frontend/src/config.js` to use either REST or GraphQL.
11. Start the frontend server by running `npm start`.
