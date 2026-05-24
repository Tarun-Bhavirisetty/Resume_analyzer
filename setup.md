# Setup Instructions

Follow these steps to run the Full-Stack AI Resume Analyzer on your local machine.

## Prerequisites
1. **Node.js**: v18+ (for Next.js)
2. **Python**: 3.9+ (for FastAPI)
3. **Docker Desktop**: For running PostgreSQL and ChromaDB easily
4. **Tesseract OCR**: Needs to be installed on your system.
   - **Windows**: Download the installer from [UB-Mannheim/tesseract](https://github.com/UB-Mannheim/tesseract/wiki). Add `C:\Program Files\Tesseract-OCR` to your System PATH.

## Environment Variables
1. Copy `.env.example` to a new file named `.env` in the root folder (`c:/Proj_T/Resume_Analyzer/.env`).
2. Add your **Groq API Key**.
3. Create a project on [Clerk](https://clerk.com/), and add the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` to the `.env` file. We will copy this `.env` to both frontend and backend shortly, or you can create one inside `frontend/.env.local` and `backend/.env`.

## Backend Setup
1. Open a terminal and navigate to the `backend` folder.
2. Activate the virtual environment (if not already active):
   - Windows: `.\venv\Scripts\activate`
3. The dependencies are already installed. Run the backend server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will start at `http://localhost:8000`.

## Database Setup
1. In the root directory, start the Docker containers:
   ```bash
   docker-compose up -d
   ```
   This will start PostgreSQL on port 5432 and ChromaDB on port 8000.

## Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder.
2. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will start at `http://localhost:3000`.

## Ready!
Visit `http://localhost:3000` to interact with the web app.
