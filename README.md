MyStore - E-commerce Application
This is a README file for the MyStore e-commerce application, built using React for the client-side and Node.js for the server-side. The application allows users to browse and purchase tech products and supports payment through PayPal.

Features
Browse and search for tech products.
View detailed product information including images, descriptions, and prices.
Add products to the shopping cart.
Proceed to checkout and pay using PayPal.
Receive order confirmation and status updates via email.
Prerequisites
Before running the application, ensure that you have the following prerequisites installed on your machine:

Node.js (version 14 or later)
NPM (Node Package Manager)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/IamShaharFar/MyStore.git
Navigate to the project directory:

bash
Copy code
cd MyStore
Install the client-side dependencies:

bash
Copy code
cd client
npm install
Install the server-side dependencies:

bash
Copy code
cd ../server
npm install
Configuration
To configure the application, you need to set up the PayPal integration. Follow these steps:

Create a PayPal Developer account at https://developer.paypal.com.
Generate API credentials (client ID and secret) for your application.
Copy the .env.example file in the server directory and rename it to .env.
Open the .env file and replace the YOUR_PAYPAL_CLIENT_ID placeholder with your actual PayPal API client ID.
Usage
To start the application, follow these steps:

In the project root directory, start the server:

bash
Copy code
cd server
npm start
In a separate terminal, start the client:

bash
Copy code
cd client
npm start
Open your browser and visit http://localhost:3000 to access the application.

Contributing
Contributions to this project are welcome! If you encounter any issues or have suggestions for improvements, please open an issue on the project repository.

License
This project is licensed under the MIT License. Feel free to modify and distribute it as needed.

Acknowledgements
This project was created by IamShaharFar. Thank you for using MyStore!
