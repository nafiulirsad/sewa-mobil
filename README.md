Full Stack Web Application for PT Jasamedika Saranatama

This is a Full Stack Web Application developed as part of the technical test for the Web Programmer position at PT Jasamedika Saranatama. This application includes features for User Registration, Car Management, Car Rental, Car Return, and more.
Tech Stack

    Backend: Laravel 10 (PHP Framework)
    Frontend: Angular 18 (Single Page Application)
    Database: MongoDB (NoSQL Database)
    UI/UX: Tailwind CSS (Utility-first CSS framework) & Prime NG (UI Component Library for Angular)

Features
1. User Registration

    Users can register by filling in personal information such as:
        Name
        Address
        Phone number
        Driver's license number
    User information is securely stored in the backend and is retrievable.
    User registration data is handled via an API that integrates with MongoDB for storage.

2. Car Management

    Users can add new cars to the system by providing details such as:
        Make
        Model
        License plate number
        Daily rental rate
    Car data is stored in the MongoDB database and can be retrieved as needed.
    Users can search for cars based on:
        Make
        Model
        Availability (whether the car is currently rented or available)
    A list of all cars available for rent can be viewed by users.

3. Car Rental

    Users can book a car by entering the rental start and end dates and selecting from a list of available cars.
    The system verifies the availability of the car on the requested dates and prevents double bookings.
    Rental data (car, user, rental dates) is stored and retrievable for reference.
    Users can view a list of cars they are currently renting, with details about rental dates and fees.

4. Car Return

    Users can return cars they have rented by entering the car's license plate number.
    The system verifies that the car was rented by the user and calculates the rental duration.
    Return data (including return date and total rental fee) is stored and retrievable.
    The system calculates the rental fee based on the car's daily rate and the number of rental days.

5. Exit Application

    Users can log out of the application securely and log in again later to continue managing their rentals and personal information.

Project Structure

The project is divided into two main parts:

    Angular Frontend: Located in the angular-frontend directory.
    Laravel Backend: Located in the laravel-backend directory.

1. Angular Frontend (angular-frontend)

    Frontend Framework: Angular 18 for building dynamic Single Page Applications (SPA).
    UI Components: PrimeNG components used for building responsive forms, data tables, and modals.
    State Management: Angular services are used to manage state and communicate with the backend.

2. Laravel Backend (laravel-backend)

    Backend Framework: Laravel 10 for building RESTful APIs and handling business logic.
    Authentication: JWT (JSON Web Tokens) for stateless user authentication.
    Database: MongoDB for storing and managing application data.

3. MongoDB

    NoSQL Database: MongoDB is used to store application data with a flexible schema.
    Data Handling: The backend leverages Laravel MongoDB package to interface with MongoDB seamlessly.

Installation Guide

Follow these steps to set up the project locally:
1. Clone the Repository

git clone https://github.com/your-username/sewa-mobil.git
cd sewa-mobil

2. Set Up the Laravel Backend
Step 1: Install PHP and Composer

Ensure you have PHP 8.x and Composer installed. You can download Composer from here.
Step 2: Install Laravel Dependencies

Navigate to the laravel-backend directory and install the backend dependencies:

cd laravel-backend
composer install

Step 3: Set Up Environment

Copy the .env.example file to .env:

cp .env.example .env

Configure your environment variables in the .env file, especially the MongoDB connection settings.

DB_CONNECTION=mongodb
DB_HOST=127.0.0.1
DB_PORT=27017
DB_DATABASE=your_database_name

Step 4: Generate Application Key

Run the following command to generate the application key:

php artisan key:generate

Step 5: Run the Laravel Server

Start the Laravel development server:

php artisan serve

The backend will now be running at http://localhost:8000.
3. Set Up the Angular Frontend
Step 1: Install Node.js and NPM

Ensure that Node.js and npm are installed. You can download Node.js from here.
Step 2: Install Angular CLI

If you haven't installed the Angular CLI globally, you can do so by running:

npm install -g @angular/cli

Step 3: Install Frontend Dependencies

Navigate to the angular-frontend directory and install the dependencies:

cd angular-frontend
npm install

Step 4: Configure API URL

In the src/environments/environment.ts file, configure the API URL to point to your Laravel backend:

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};

Step 5: Run the Angular Development Server

Start the Angular development server:

ng serve

The frontend will now be running at http://localhost:4200.
4. Test the Application

    The backend should be accessible at http://localhost:8000.
    The frontend should be accessible at http://localhost:4200.

Navigate to http://localhost:4200 in your browser to access the application.
Usage

Once the application is running, you can:

    Register and Login: Create a new account or log in with existing credentials.
    Manage Cars: Add new cars to the system, view available cars, and search for cars based on make, model, or availability.
    Rent Cars: Book a car by selecting from available options, specify rental dates, and manage your bookings.
    Return Cars: Return rented cars, view your rental history, and calculate the total rental fee.
    Log Out: Securely log out and log back in later.

Screenshots

![Screenshot 2024-11-11 at 18-59-55 Sewa Mobil](https://github.com/user-attachments/assets/efe26590-6ba2-49e1-b300-fdf445b407c8)
![Screenshot 2024-11-11 at 19-00-15 Sewa Mobil](https://github.com/user-attachments/assets/ae23d646-b441-4af2-ba06-7440d930d35d)
![Screenshot 2024-11-11 at 19-01-00 Sewa Mobil](https://github.com/user-attachments/assets/87f06dfc-bd9d-452e-bddc-93d694751dee)

Features

    User Registration with name, address, phone number, and driver's license number.
    Car Management to add new cars, view all available cars, and search by make, model, or availability.
    Car Rental with booking system to select available cars based on rental start and end dates.
    Car Return to return rented cars and calculate rental fees based on rental duration.
    Exit Application to allow users to log out and log back in later.

Future Improvements

    Add additional features like file uploads, email verification, etc.
    Improve frontend state management using NgRx.
    Implement real-time data synchronization with WebSockets.
    Add more unit and integration tests to ensure reliability.

License

This project is licensed under the MIT License - see the LICENSE file for details.

This updated README reflects the specific features of the project and describes the application flow for User Registration, Car Management, Car Rental, Car Return, and Exit Application. You can further adjust it based on any additional details about the project.
