# NextAuth Basic Application

This is a basic Next.js application integrated with NextAuth for authentication purposes. Users can sign up, log in, verify their email addresses, view their profile page to see user data, and log out. The application utilizes MongoDB for database storage, Nodemailer for email verification, Tailwind CSS for styling, and TypeScript for type safety.

## Features

- **Sign up:** Users can create a new account by providing their email address and password.
- **Login:** Existing users can log in using their email address and password.
- **Email Verification:** Users receive an email with a verification link upon signing up. They need to verify their email address to access certain features.
- **Profile Page:** Authenticated users can view their profile page to see their user data.
- **Logout:** Users can log out of their accounts.

## Future Todos

- **Restrict Profile Page Access:** Implement functionality to restrict access to the profile page only for verified users.
- **Reset Password via Email:** Add a feature for users to reset their password via email.
- **Social Authentication:** Implement social authentication options (e.g., Google, Facebook) for users to sign up/login.
- **User Dashboard:** Integrate a user dashboard to manage account settings and preferences.

## Tech Stack

- Next.js
- NextAuth.js
- MongoDB
- Nodemailer
- Tailwind CSS
- TypeScript
