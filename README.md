# Bagsy

Bagsy is an e-commerce website designed for buying luxury bags. It offers a seamless shopping experience with features such as cart management, user authentication, and admin functionalities.

## Live website link
https://bagsy.onrender.com

## Features

- **User Authentication**: Users can register and log in to their accounts. 
- **JWT Token Sessions**: Secure session management using JWT tokens.
- **Password Security**: Passwords are encrypted using bcrypt for enhanced security.
- **Cart Management**: 
  - Add items to the cart.
  - View a vertically scrollable list of cart items with Total amount breakdown including:
    - MRP (Maximum Retail Price)
    - Discount Percentage
    - Platform Fee
    - Shipping Fee
  - Total Bill Amount displayed on the unscrollable section of the cart page.
- **Admin Functionality**: 
  - Admins can register and log in.
  - Ability to add new products to the website.
  - Option to delete existing products.
- **Flash Messages**: User feedback through flash messages for successful actions.

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript (EJS for templating)
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing

## Database Structure

The application uses three main databases:

- **Users**: Stores user information and credentials.
- **Owners**: Admin data for managing the platform.
- **Products**: Contains product details available for purchase.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB instance (local or hosted).

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/amartanveer/bagsy.git
   cd bagsy

2.  Install the dependencies:
    ```
    npm install
    
3. Set up your MongoDB connection and any necessary environment variables. You can use a .env file to store them.

4. Start the server:
   ```
   node app.js

5. Open your browser and visit http://localhost:3000 to view the application.
