# Interview Questions Tracker

A React and JSON Server app for organizing interview questions by topic, tracking practice status, and revisiting questions that need work.

## Requirements

- Node.js and npm

## Run locally

Install dependencies once:

```sh
npm install
```

Start the JSON Server API in one terminal:

```sh
npm run server
```

The API is available at `http://localhost:5000/questions`.

Start the React development server in a second terminal:

```sh
npm run dev
```

Vite prints the local URL when it starts. If its default port is already busy, Vite automatically selects another available port.

## Features

- Add, edit, view, and delete questions
- Track Solved, To Revise, and Not Solved progress
- Search titles and notes; combine category, difficulty, and status filters
- View live summary counts and solved percentage
- Store question records in `db.json` through JSON Server

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/questions` | List questions |
| GET | `/questions/:id` | Get one question |
| POST | `/questions` | Add a question |
| PUT | `/questions/:id` | Replace a question |
| PATCH | `/questions/:id` | Update question fields or status |
| DELETE | `/questions/:id` | Delete a question |

Create a production build with `npm run build`.