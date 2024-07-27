# Company Location and Branch Distribution Web App

This web application provides users with detailed information about companies, including their locations and branch distribution. The application features interactive maps and bar charts to visualize company locations and branch distribution effectively.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project addresses the need for users to view detailed information about companies in a clear and interactive manner. The application consists of two main pages: the Company List Page and the Company Details Page.

### Problem

Users need a simple, interactive way to access company information, including location and branch distribution.

### Solution

A web application that allows users to view a list of companies, search for specific companies, and see detailed information including maps and charts on the Company Details Page.

## Project Structure
    
    The project is organized as follows:
        /project-root
        ├── Docker Files       # Contains Docker configurations
        ├── backend            # Backend FastAPI application
        │   ├── main.py        # FastAPI application
        │   ├── requirements.txt  # Python dependencies
        │   └── ...            # Other backend files
        ├── frontend           # Frontend React application
        │   ├── src            # Source files for React app
        │   ├── package.json   # NPM configuration
        │   └── ...            # Other frontend files
        ├── env                # Environment configuration (if any)
        ├── .gitattributes     # Git attributes for handling text/binary files
        ├── .gitignore         # Git ignore file
        ├── documentation
            └──Project Documents  # Documents about the application

## Features

- **Interactive Maps**: View company locations using interactive maps powered by Leaflet.
- **Bar Charts**: Visualize branch distribution with dynamic charts from Chart.js.
- **Responsive Design**: The application is fully responsive, adapting to mobile, tablet, and desktop screens.
- **Search Functionality**: Easily search for companies by name.

## Technologies Used

- **Frontend**: React, Tailwind CSS, Leaflet, Chart.js
- **Backend**: FastAPI
- **Data Storage**: CSV files for company and location data
- **Containerization**: Docker

## Installation

### Prerequisites

- Node.js and npm
- Docker and Docker Compose

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/company-location-app.git
   cd company-location-app
# Company Location and Branch Distribution Web App

This web application provides users with detailed information about companies, including their locations and branch distribution. The application features interactive maps and bar charts to visualize company locations and branch distribution effectively.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

## Overview

This project addresses the need for users to view detailed information about companies in a clear and interactive manner. The application consists of two main pages: the Company List Page and the Company Details Page.

### Problem

Users need a simple, interactive way to access company information, including location and branch distribution.

### Solution

A web application that allows users to view a list of companies, search for specific companies, and see detailed information including maps and charts on the Company Details Page.

## Features

- **Interactive Maps**: View company locations using interactive maps powered by Leaflet.
- **Bar Charts**: Visualize branch distribution with dynamic charts from Chart.js.
- **Responsive Design**: The application is fully responsive, adapting to mobile, tablet, and desktop screens.
- **Search Functionality**: Easily search for companies by name.

## Technologies Used

- **Frontend**: React, Tailwind CSS, Leaflet, Chart.js
- **Backend**: FastAPI
- **Data Storage**: CSV files for company and location data
- **Containerization**: Docker

## Installation

### Prerequisites

- Node.js and npm
- Docker and Docker Compose

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Prahlad-Narayan/Trace
   cd Trace

2. **Setup Backend**
    ```bash
    cd backend
    docker build -t company-backend .

3. **Setup Frontend**
    ```bash
    cd ../frontend
    npm install

4. **Run with Docker Compose**
    ```bash
    cd ..
    docker-compose up

## Usage
Access the application

    Open your web browser and go to http://localhost:80 to view the application.

Navigate the application

    Use the search bar on the Company List Page to find companies by name.

    Click on a company to view its details, including an interactive map and branch distribution chart on the Company Details Page.

## API Endpoints
# Get all companies
    Endpoint: /companies
    Method: GET
    Description: Retrieve a list of all companies.

## Get company details by ID
    Endpoint: /companies/{company_id}
    Method: GET
    Description: Retrieve details for a specific company by its ID.

## Get locations for a specific company
    Endpoint: /companies/{company_id}/locations
    Method: GET
    Description: Retrieve all locations for a specific company.

## Testing
    Frontend Testing: Jest and React Testing Library
    Backend Testing: pytest

**To run tests, execute the following commands in their respective directories:**
    ```bash
    Frontend tests
    
    cd frontend
    npm test

    Backend tests
    cd backend
    pytest
