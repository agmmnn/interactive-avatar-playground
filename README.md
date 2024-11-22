# Interactive Avatar Next.js Demo

<img src="https://github.com/agmmnn/streaming-avatar-nextjs-starter/assets/16024979/ba6173db-2d12-4c04-a269-19d3c3e5d0a7" height="60"/>

## Overview

This project showcases the implementation of HeyGen's [Interactive Streaming Avatar](https://docs.heygen.com/docs/streaming-api) service in a Next.js application. It serves as both a demonstration and a starting point for building advanced avatar-based interactive applications.

https://github.com/agmmnn/streaming-avatar-playground/assets/16024979/76c08640-189d-4354-a1b7-397b80d2f197

## Features

### Implemented

- **Background Removal:** Real-time green screen background removal
- **Screenshot Capture:** Instant frame capture functionality
- **Video Recording:** Stream recording with download capability
- **Custom Background:** Support for custom image/video backgrounds

### Coming Soon

- **Multiple LLM Support:** Integration with various AI models
- **Speech-to-Text:** Real-time speech transcription
- **Interactive Chatbox:** Enhanced communication interface
- **Conversation History:** Persistent chat storage and retrieval

## Tech Stack

- **Frontend:** Next.js 15, React 18, TS
- **Styling:** shadcn/ui, Tailwind CSS
- **State Management:** Jotai
- **AI Integration:** Vercel AI SDK (@ai-sdk/\*)
- **Avatar Service:** HeyGen Interactive/Streaming Avatar
- **Package Manager:** Bun

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/interactive-avatar-playground.git
cd interactive-avatar-playground
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

The project uses environment variables for configuration. Copy `.env.example` to `.env` and update the values:

```env
# Required API keys and configurations
HEYGEN_API_KEY=your_api_key_here
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [HeyGen API Documentation](https://docs.heygen.com/)
- [shadcn/ui](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/docs)

## Deployment

Deploy easily on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the platform from Next.js creators.

## License

This project is MIT licensed.

---

Built with using Next.js and HeyGen
