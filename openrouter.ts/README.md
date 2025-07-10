# OpenRouter TypeScript Example

This project demonstrates how to use the OpenRouter API with TypeScript to make chat completion requests to various AI models.

## What is OpenRouter?

OpenRouter is a unified API that provides access to various AI models including:
- GPT-4 (OpenAI)
- Claude (Anthropic)
- Llama (Meta)
- And many others

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure your OpenRouter API key:**
   1. Visit [OpenRouter](https://openrouter.ai/), sign up, and get your API key.
   2. In your project folder, make a copy of the provided `env.template` file and name it `.env`:
      ```bash
      cp env.template .env
      ```
   3. Paste your OpenRouter API key into the `.env` file as instructed.
   4. Save the file.

3. **Run the example:**
   ```bash
   npm start
   ```
