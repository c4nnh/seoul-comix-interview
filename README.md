# Can Ngo - Seoul Comix Interview

## Overview

This project is built using Next.js with several key libraries for authentication, state management, form handling, database management, and UI components. Below is an overview of the main libraries used in this project.

[Demo](https://seoul-comix-interview.vercel.app/)
Use these accounts

- `username1 - password`
- `username2 - password`
- `username3 - password`

## Prerequisites

- Node.js 18 or later
- pnpm 8 or later

### Install pnpm globally

If you don't have `pnpm` installed, you can install it globally using `npm`:

```sh
npm install -g pnpm
```

## Main Libraries

### **Framework & Core Dependencies**

- [Next.js](https://nextjs.org/): The core framework for building React applications with server-side rendering and static site generation.
- [React](https://react.dev/) & [React DOM](https://react.dev/): The main libraries for building UI components.

### **Authentication**

- [NextAuth.js](https://next-auth.js.org/): Provides authentication for Next.js applications, supporting multiple providers.
- [@auth/prisma-adapter](https://www.npmjs.com/package/@auth/prisma-adapter): An adapter for NextAuth to use Prisma as the database backend.

### **Database & ORM**

- [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client): The Prisma client for interacting with the database.
- [Prisma](https://www.prisma.io/docs/): The Prisma ORM for database schema management and migrations.

### **State Management**

- [Zustand](https://github.com/pmndrs/zustand): A lightweight and flexible state management library for React applications.
- [TanStack React Query](https://tanstack.com/query/latest): A library for managing server-state in React applications.

### **API Handling**

- [tRPC](https://trpc.io/): Provides a type-safe way to build APIs with tRPC.
- [SuperJSON](https://github.com/blitz-js/superjson): Used for serializing complex data structures between server and client.

### **Form Handling & Validation**

- [React Hook Form](https://react-hook-form.com/): A lightweight form validation library for React.
- [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers): Connects validation libraries like Zod to react-hook-form.
- [Zod](https://zod.dev/): A schema validation library for TypeScript.

### **Styling**

- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for styling components.
- [Tailwind Merge](https://www.npmjs.com/package/tailwind-merge): Merges Tailwind CSS classes dynamically.
- [Class Variance Authority](https://www.npmjs.com/package/class-variance-authority): Helps manage Tailwind class variations.
- [clsx](https://github.com/lukeed/clsx): A utility for conditionally joining class names.

### **UI Components**

- [Radix UI](https://www.radix-ui.com/): A collection of accessible and customizable UI primitives.

### **Localization**

- [Next Intl](https://next-intl-docs.vercel.app/): A library for internationalization and localization in Next.js applications.

### **Logging & Monitoring**

- [@logtail/next](https://www.npmjs.com/package/@logtail/next): A logging library for structured logs with Logtail in Next.js applications.

### **Utility Libraries**

- [UUID](https://www.npmjs.com/package/uuid): Generates unique identifiers.

### **Environment Management**

- [@t3-oss/env-nextjs](https://www.npmjs.com/package/@t3-oss/env-nextjs): A library for managing environment variables in Next.js projects.

### **Development Tools**

- [ESLint](https://eslint.org/) & [ESLint Config Next](https://www.npmjs.com/package/eslint-config-next): Linting tools to enforce coding standards.
- [Prettier](https://prettier.io/) & [Prettier Plugin TailwindCSS](https://www.npmjs.com/package/prettier-plugin-tailwindcss): Code formatting tools.
- [TypeScript](https://www.typescriptlang.org/) & [ts-node](https://typestrong.org/ts-node/): TypeScript support.
- [tsx](https://www.npmjs.com/package/tsx): A fast TypeScript execution environment.
- [PostCSS](https://postcss.org/): A tool for transforming CSS with JavaScript plugins.

## Setup & Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/seoul-comix-interview.git
   cd seoul-comix-interview
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Set up environment variables.
4. Run database migrations:
   ```sh
   pnpm prisma migrate dev
   ```
5. Start the development server:
   ```sh
   pnpm dev
   ```

## Scripts

- `pnpm dev` - Start the development server with TurboPack.
- `pnpm build` - Build the application.
- `pnpm start` - Start the production server.
- `pnpm lint` - Run linting.

## Mocking data

1. Run database seed
   ```sh
   pnpm prisma db seed
   ```
2. Login
   There're 3 accounts that you can you to login

- `username1 - password`
- `username2 - password`
- `username3 - password`
