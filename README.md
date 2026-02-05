# TimeKeeper Frontend Take-Home Project

Build a React UI for a digital bank's account management system.

## Prerequisites

- Node.js (>= 22.0.0)
- npm (>= 10.0.0)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/TimeKeeper-co-uk/timekeeper-frontend-takehome.git
   cd timekeeper-frontend-takehome
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the API server (Terminal 1):
   ```bash
   npm run start:api
   ```

4. Start the frontend dev server (Terminal 2):
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and the API at `http://localhost:3001`.

## Your Task

The application currently displays **static sample data**. Your task is to make it fully functional by connecting it to the API and implementing the required features.

### Requirements

1. **Make the account list dynamic** - Replace the static `SAMPLE_ACCOUNTS` data with real data fetched from the API
2. **View account details** - Clicking an account should display its details (name, branch, balance)
3. **Create an account** - Implement the form to create a new account with customer name (required) and branch (optional)
4. **Make transactions** - Allow deposits and withdrawals on an account (updates the balance)

### Technical Requirements

- Use **TypeScript** throughout your solution
- API helper functions are provided in `src/api/accounts.ts`
- Types are defined in `src/types/index.ts`

## API Reference

Base URL: `http://localhost:3001`

| Method | Endpoint        | Description           |
|--------|-----------------|----------------------|
| GET    | /accounts       | List all accounts    |
| GET    | /accounts/:id   | Get a single account |
| POST   | /accounts       | Create a new account |
| PUT    | /accounts/:id   | Update an account    |
| DELETE | /accounts/:id   | Delete an account    |

### Account Schema

```json
{
  "id": 1,
  "name": "John Doe",
  "branch": "Downtown",
  "balance": 1000
}
```

- `id` - Auto-generated unique identifier
- `name` - Customer name (required)
- `branch` - Bank branch identifier (optional)
- `balance` - Current account balance

## Available Scripts

| Command           | Description                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Start frontend dev server            |
| `npm run build`   | Build for production                 |
| `npm run lint`    | Run ESLint                           |
| `npm run format`  | Format code with Prettier            |
| `npm run start:api` | Start the JSON Server mock API     |

## Time Guideline

We expect this exercise to take approximately **3-4 hours**. If you run out of time, document what additional features or improvements you would have made given more time.

## Submission

1. Push your solution to your own GitHub repository
2. Include any notes about your implementation decisions
3. Share the repository link with us

## Notes

- **React**, **Tailwind CSS**, **axios**, and **TypeScript** are pre-configured
- API functions are ready to use in `src/api/accounts.ts`
- No authentication is required
- Feel free to add any additional libraries you find useful
- Focus on functionality first, but clean code and good UX are appreciated
- Design is not being evaluated
