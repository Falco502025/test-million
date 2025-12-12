# Real Estate Management Platform

A modern real estate management application with a .NET backend API and Next.js frontend.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Database Setup](#database-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)

## Prerequisites

### Backend Requirements

- **.NET 9.0 or higher**
- **Visual Studio 2022** or Visual Studio Code with C# extension
- **MongoDB** (for database)

### Frontend Requirements

- **Node.js 18.0** or higher
- **npm 9.0** or higher

## Backend Setup

### 1. Open and Build the Solution

1. Navigate to the `/Backend` folder
2. Open `backend.sln` in Visual Studio 2022
3. The solution will automatically restore NuGet packages
4. Alternatively, you can restore packages manually:
   ```bash
   dotnet restore
   ```

### 2. Build the Project

```bash
dotnet build
```

## Database Setup

### Prerequisites

- **MongoDB Community Edition** must be installed and running
- MongoDB default connection: `mongodb://localhost:27017`

### Restore Database from Backup

The database backup is located in the `/database` folder and was created using `mongodump`.

#### Using mongorestore

Run the following command to restore the database:

```bash
mongorestore --db RealEstateMillion ./database/RealEstateMillion
```

Or if your backup is in a different location:

```bash
mongorestore --db RealEstateMillion /path/to/backup/RealEstateMillion
```

If using custom MongoDB credentials:

```bash
mongorestore --uri "mongodb://username:password@localhost:27017" --db RealEstateMillion ./database
```

Verify the restoration was successful by connecting to MongoDB:

```bash
mongosh mongodb://localhost:27017/RealEstateMillion
```

#### Creating a Backup (Optional)

If you need to backup the database in the future:

```bash
mongodump --db RealEstateMillion --out ./backup
```

## Frontend Setup

### 1. Install Dependencies

Navigate to the frontend folder:

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Create or update the `.env.local` file in the `/frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5281/api
```

**Note:** Update the URL to match your backend server address if running on a different host/port.

## Running the Application

### Start the Backend

1. In Visual Studio 2022:

   - Press `F5` to run with debugging, or
   - Press `Ctrl+F5` to run without debugging

2. The API will start on `http://localhost:5281/api` (or the configured port)

### Start MongoDB

Ensure MongoDB is running:

```bash
# Windows
net start MongoDB

# macOS (if installed via Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Start the Frontend

In the `/frontend` folder:

```bash
# Development mode (with hot reload)
npm run dev

# Production build
npm run build
npm run start
```

The frontend will be available at `http://localhost:3000` by default.

## Testing

### Frontend Tests

Run all frontend tests:

```bash
cd frontend
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

### Test Statistics

- **Test Suites:** 10
- **Total Tests:** 109
- **Framework:** Jest + React Testing Library

## Project Structure

```
project/
├── Backend/
│   ├── Application.API/           # Main API project
│   ├── Domain/                    # Domain models and interfaces
│   └── backend.sln                # Visual Studio solution
├── frontend/                      # Next.js application
│   ├── src/
│   │   ├── app/                   # Next.js app directory
│   │   ├── components/            # React components
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── services/              # API services
│   │   └── types/                 # TypeScript type definitions
│   ├── tests/                     # Jest test suites
│   ├── package.json
│   └── jest.config.js
├── database/                      # MongoDB backup/restore
└── README.md                      # This file
```

## Environment Configuration

### Backend Configuration

Update `appsettings.json` or `appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "mongodb://localhost:27017"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

### Frontend Configuration

The frontend requires the following environment variable in `.env.local`:

- `NEXT_PUBLIC_API_URL` - Backend API URL (e.g., `http://localhost:5281/api`)

## Troubleshooting

### Backend Issues

**Port already in use:**

- Change the port in `launchSettings.json` or appsettings

**MongoDB connection failed:**

- Verify MongoDB is running: `mongosh` or `mongo`
- Check connection string in appsettings.json
- Ensure MongoDB service is started

### Frontend Issues

**API calls timeout:**

- Check if backend is running on the correct URL
- Verify `REACT_APP_API_URL` in `.env.local`
- Default timeout is 120 seconds, adjust in `src/services/api/client.ts` if needed

**Port 3000 already in use:**

```bash
npm run dev -- -p 3001
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `npm test`
4. Build: `npm run build`
5. Submit a pull request

## Support

For issues or questions, please check:

1. Backend logs in Visual Studio output window
2. Frontend console in browser DevTools
3. MongoDB logs in MongoDB installation folder
