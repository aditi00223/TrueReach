# TrueReach — Purchase-Intent Signal Scorer.

An AI-powered dashboard that analyzes creator comment sections to identify genuine **purchase intent** — not just engagement.

Instead of relying on vanity metrics like likes or follower count, TrueReach uses Gemini to classify every comment into **High Intent**, **Curious**, or **Generic**, helping brands choose the creator whose audience is most likely to actually buy.

## Features.

- 📊 Creator cards with intent scores and comment breakdown
- 📈 Side-by-side intent comparison chart
- 💬 Sample comment viewer, tagged by category
- 🏆 Automatic "Best Pick" recommendation banner
- ⚡ Live connection to backend AI classification API

## Tech Stack

- React
- Recharts (data visualization)
- Axios (API calls)

## Getting Started

```bash
cd frontend
npm install
npm start
```

The app runs on [http://localhost:3000](http://localhost:3000). Make sure the backend server is running on `http://localhost:5000` for live data.

## Project Structure

```
frontend/
  src/
    components/   → CreatorCard, IntentChart, CommentViewer, BestPickBanner
    services/     → API call logic (api.js)
    data/         → mock data (used during development)
```
