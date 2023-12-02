# Job Portal Backend

This repository contains the backend codebase for a comprehensive Job Portal system. It is designed to handle the backend logic and data management for a job portal, allowing users to browse job listings, submit applications, and manage their profiles.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Job Portal Backend is a RESTful API that serves as the backend for a job portal application. It provides various endpoints for managing user accounts, job listings, applications, and other related functionalities. The code is written in [programming language] and follows best practices for maintainability and scalability.

## Features

- User Authentication: Secure user authentication and authorization system.
- Job Listings: Create, retrieve, update, and delete job listings.
- Job Applications: Allow users to submit job applications and track their status.
- Search and Filters: Provide advanced search and filtering options for job listings.

## Technologies Used

- Programming Language: Node.js
- Framework: Express
- Database: MongoDB
- Authentication: JWT
- Documentation: Swagger

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/codec404/online-job-portal---backend.git
   cd online-job-portal---backend

   ```

2. **Install Dependencies:**

   - bcryptjs

   ```bash
    npm i bcryptjs
   ```

   - cors

   ```bash
    npm i cors
   ```

   - dotenv

   ```bash
    npm i dotenv
   ```

   - express

   ```bash
    npm i express
   ```

   - express-async-errors

   ```bash
    npm i express-async-errors
   ```

   - express-mongo-sanitize

   ```bash
    npm i express-mongo-sanitize
   ```

   - express-rate-limit

   ```bash
    npm i express-rate-limit
   ```

   - helmet

   ```bash
    npm i helmet
   ```

   - JWT

   ```bash
    npm i jsonwebtoken
   ```

   - moment

   ```bash
    npm i moment
   ```

   - mongoose

   ```bash
    npm i mongoose
   ```

   - morgan

   ```bash
    npm i morgan
   ```

   - swagger-jsdoc

   ```bash
    npm i swagger-jsdoc
   ```

   - swagger-ui-express

   ```bash
    npm i swagger-ui-express
   ```

   - validator

   ```bash
    npm i validator
   ```

   - xss-clean

   ```bash
    npm i xss-clean
   ```

   - nodemon (dev-dependency)

   ```bash
    npm i -D nodemon
   ```

3. **Start the Server**
   - using node
   ```bash
       npm run start
   ```
   - using nodemon
   ```bash
       npm run dev
   ```
