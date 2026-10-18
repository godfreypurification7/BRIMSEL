+-----------------------------------------------------------------------------------+
|                                React.js Frontend                                  |
|   (Vite + Custom Kid-Friendly UI, ChatWindow, ProgressDashboard, Header, CSS)     |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          | REST API (JSON over HTTPS)
                                          v
+-----------------------------------------------------------------------------------+
|                            Node.js & Express Backend                              |
|                                                                                   |
|  +--------------------+  +------------------+  +-------------------------------+  |
|  |  Security/Helmet   |  |  Rate Limiting   |  |   Validation Middleware       |  |
|  +--------------------+  +------------------+  +-------------------------------+  |
|                                          |                                        |
|                                          v                                        |
|  +------------------------------------------------------------------------------+ |
|  |                            API Routing & Controllers                         | |
|  |   • /api/v1/health   • /api/v1/chat   • /api/v1/progress/:childId            | |
|  +------------------------------------------------------------------------------+ |
|                                          |                                        |
|                                          v                                        |
|  +------------------------------------------------------------------------------+ |
|  |                             Core Business Services                           | |
|  |   • Mode Detection (Learning, Support, Engagement, Conversation)             | |
|  |   • Lesson Engine (Multi-level progressive questions, streak/level unlock)   | |
|  +------------------------------------------------------------------------------+ |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          | Mongoose ODM
                                          v
+-----------------------------------------------------------------------------------+
|                              MongoDB (NoSQL Database)                             |
|         Child Schema (childId, level, correctStreak, totalCorrect, etc.)          |
+-----------------------------------------------------------------------------------+


README & Setup Instructions
Prerequisites
Node.js (v18+ recommended)

MongoDB (Running locally or MongoDB Atlas URI)

Local Development Setup
Clone and Setup Backend:

Bash
cd backend
npm install
cp .env.example .env  # Configure PORT=5000 and MONGODB_URL
npm run dev
Clone and Setup Frontend:

Bash
cd frontend
npm install
npm run dev
Deployment Instructions (Live Deployed URL requirement)
Backend Deployment: Deploy the Node.js service to platforms like Render, Railway, or Fly.io, setting the MONGODB_URL environment variable.

Frontend Deployment: Build and deploy the React application using Vercel, Netlify, or AWS Amplify, setting VITE_API_URL to point to your live backend endpoint.
