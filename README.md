# 📚 BiblioDrop – Online Book Delivery Management System

## 🌟 Purpose
BiblioDrop is a comprehensive digital platform that connects avid readers and students with local libraries and independent book owners. The platform allows users to browse diverse book collections, request doorstep delivery, and manage their reading lists. Librarians and book owners can seamlessly list their inventory and manage delivery requests, while an Admin oversees the entire ecosystem to ensure a secure, streamlined borrowing experience.

## 🔗 Live URLs
- **Live Site:** [https://bibliodrop.vercel.app](https://bibliodrop.vercel.app)
- **Server Site:** *[Your Server URL Here]* (Please replace this with your deployed backend API URL)

## ✨ Key Features
- **Role-based Dashboard & Access Control:** Dedicated dynamic dashboards for Admin, Librarian, and User.
- **Secure Authentication:** Implementation of `better-auth` for secure login, registration, and social login (Google OAuth).
- **Payment Gateway:** Secure checkout integration with `Stripe` to pay delivery fees.
- **Dynamic Analytics:** Real-time stats and visual data representation using interactive charts (`recharts`).
- **Comprehensive Book Management:** Librarians can add, edit, and track their inventory, while Admins approve or delete books.
- **Delivery Workflow:** Request and track deliveries through various stages (Pending -> Dispatched -> Delivered).
- **Verified Review System:** Only users who have successfully received a book can leave a review.
- **Beautiful & Modern UI:** A fully responsive, aesthetically pleasing interface built with Next.js, Tailwind CSS, HeroUI, and Framer Motion.

## 📦 NPM Packages Used
The following key technologies and npm packages were utilized to build this project:
- **Core:** `next` (v16+), `react`, `react-dom`
- **Authentication & Security:** `better-auth`
- **Payment:** `@stripe/stripe-js`, `stripe` (Backend)
- **Database:** `mongodb` (Backend integration)
- **UI & Components:** `@heroui/react`, `framer-motion`, `react-icons`, `@gravity-ui/icons`
- **Styling:** `tailwindcss`, `@tailwindcss/postcss`
- **Data Visualization:** `recharts`
- **Notifications:** `react-hot-toast`

## 🚀 How to Run the Project Locally

### Prerequisites
Make sure you have Node.js installed.

### Setup
1. Clone the repository.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the necessary environment variables (e.g., Better Auth secrets, Stripe Publishable Key).
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view the project in your browser.
