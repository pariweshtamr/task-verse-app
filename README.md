# TaskVerse: Next.js 14, React, Server Components, Tailwind

![App Screenshot](https://github.com/pariweshtamr/task-verse-app/blob/main/public/1.png?raw=true)

### Demo

[LINK TO DEMO](https://task-verse-app.vercel.app/)

### Features

- Secure Sign up / Sign in through Clerk
- Create, edit or delete tasks
- Mark a task as important or complete
- View important, overdue, completed and due soon tasks
- Light/dark mode based on user's system/browser preference
- User profile management through clerk
- TailwindCSS
- Shadcn-ui

### Cloning the repository

```bash
git clone https://github.com/pariweshtamr/task-verse-app
```

### Install packages

```bash
npm install
```

### Setup .env file

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=`

`CLERK_SECRET_KEY=`

`NEXT_PUBLIC_CLERK_SIGN_IN_URL =/sign-in`

`NEXT_PUBLIC_CLERK_SIGN_UP_URL =`

`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=`

`NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=`

`DATABASE_URL`

### Start the app

```bash
npm run dev
```

### Available commands

Running commands with npm `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |
