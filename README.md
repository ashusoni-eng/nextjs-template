# Next.js Frontend Template

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It provides a solid foundation for building modern web applications with a focus on centralized API management and authentication.

**Developed by:** Ashish Soni

## Features

*   **Next.js 14+:** Utilizes the latest features of the Next.js App Router.
*   **TypeScript:** For robust and maintainable code.
*   **Centralized API Management:** A dedicated `src/lib/api.ts` file using `axios` to handle all backend communication. It includes request interceptors for automatically attaching authentication tokens and a centralized error handler.
*   **Authentication:**
    *   Pre-built pages for Login and Register (`src/app/login`, `src/app/register`).
    *   JWT (JSON Web Token) based authentication flow.
    *   Token is stored in `localStorage` and automatically sent with each request.
*   **Protected Routes:** Example implementation of protected routes to restrict access to authenticated users.
*   **Styling:** Styled with [Tailwind CSS](https://tailwindcss.com/) for a utility-first CSS workflow.
*   **Linting:** Comes with ESLint configured for code quality and consistency.

## Folder Structure

The project follows a feature-oriented folder structure:

```
/
├── public/               # Static assets
├── src/
│   ├── app/              # Application routes and pages
│   │   ├── dashboard/    # Example protected route
│   │   ├── login/        # Login page
│   │   ├── register/     # Register page
│   │   └── ...
│   ├── lib/              # Core logic and utilities
│   │   ├── api.ts        # Centralized Axios API client
│   │   ├── auth-api.ts   # Authentication related API calls
│   │   ├── auth.tsx      # Authentication context and hooks
│   │   └── ...
│   └── types/            # TypeScript type definitions
├── .gitignore
├── next.config.ts
├── package.json
├── README.md
└── tsconfig.json
```

## Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm, yarn, or pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd next-template
    ```
3.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

### Running the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Configuration

The backend API endpoint can be configured via an environment variable. Create a `.env.local` file in the root of the project and add the following:

```
NEXT_PUBLIC_BACKEND_URL=http://your-backend-api-url.com
```

If this variable is not set, it will default to `http://localhost:3000`.

## Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Creates a production build.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Runs the ESLint linter.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.