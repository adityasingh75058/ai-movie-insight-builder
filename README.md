# AI Movie Insight Builder

## Live Demo
https://ai-movie-insight-builder-three.vercel.app/

##  Overview
AI Movie Insight Builder allows users to enter an IMDb movie ID and retrieve detailed movie information along with AI-generated audience sentiment insights.

##  Tech Stack
- Frontend: Next.js (React)
- Backend: Next.js API Routes (Node.js)
- Movie Data: OMDb API
- Deployment: Vercel

## Features
- Fetch movie details using IMDb ID
- Display poster, cast, rating, release year, plot
- AI-based sentiment classification
- Responsive modern UI
- Loading spinner
- Proper error handling
- Sentiment badge (Positive / Mixed / Negative)

## Setup Instructions

1. Clone repository
2. Install dependencies:
   npm install
3. Create `.env.local` file:
   OMDB_API_KEY=your_key
   OPENAI_API_KEY=your_key (if used)
4. Run project:
   npm run dev

## Assumptions
- OMDb free tier used
- Sentiment classification based on rating logic

## Deployment
Hosted on Vercel with environment variables configured.
