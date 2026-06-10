# AI Video Generator

A full-stack SaaS web application for generating AI videos from text prompts and images.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), TailwindCSS
- **Backend:** Next.js API Routes
- **AI Worker:** Google Colab with CogVideoX-2B
- **Tunnel:** ngrok

## Features

- Text-to-video generation
- Image-to-video generation
- Dark futuristic UI with glassmorphism
- Collapsible sidebar navigation
- Generation progress overlay
- Video history with local storage
- Settings modal

## Environment Variables

| Variable | Description |
|----------|-------------|
| `COLAB_URL` | Your Colab ngrok URL (optional - uses placeholder if not set) |

## Deploy to Vercel

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add `COLAB_URL` environment variable if using Colab
4. Deploy

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Colab Setup

1. Open `colab_server.ipynb` in Google Colab
2. Enable GPU (Runtime → Change runtime type → T4 GPU)
3. Run all cells
4. Copy the ngrok URL
5. Set as `COLAB_URL` environment variable
