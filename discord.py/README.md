# Setting Up the Project

Follow these instructions to setup the project properly

## Setting up the conda

Follow these steps to set up the repository using [Conda](https://docs.conda.io/en/latest/):

### 1. Download and Install Conda

If you don't have Conda installed, download and install [Miniconda](https://docs.conda.io/en/latest/miniconda.html) or [Anaconda](https://www.anaconda.com/products/distribution) for your operating system.

- **Miniconda (recommended for minimal install):**
  - [Miniconda Download Page](https://docs.conda.io/en/latest/miniconda.html)

Follow the installation instructions for your OS.

### 2. Create a New Conda Environment

Open your terminal or command prompt and run:
```bash
    conda create python=3.13.5 -y --name discord
```

### 3. Activate the Conda Environment:
```bash
    conda activate discord
```

### 4. Install the requirements to that environment:
```bash
    pip install -r requirements.txt
```

## Discord Bot Setup Guide

This guide will help you set up and run your Discord bot using Python.

---

### 1. Create a Discord Application and Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **"New Application"**.
3. Name your application and click **"Create"**.
4. In the left sidebar, click **"Bot"**.
5. Enable all the ``Privileged Gateway Intent``'s and save the changes
5. Under the **"Token"** section, click **"Copy"** to copy your bot token.  
   **Keep this token secret!**

---

### 2. Configure the Bot Token

1. In your project folder, make a copy of the provided `env.template` file and name it `.env`:
```
cp env.template .env
```
2. Insert the Discord API token to it
3. Save the file

---

### 3. Invite the Bot to Your Server

1. In the Developer Portal, go to **"OAuth2" > "URL Generator"**.
2. Under **"Scopes"**, select `bot`.
3. Under **"Bot Permissions"**, select the permissions your bot needs (for this example, at least `Send Messages` and `Read Messages`).
4. Copy the generated URL, open it in your browser, and invite the bot to your server.

----

### 4. Run the discord bot:
```bash
    python main.py
```

### 5. Send a *direct message* to the bot: $hello
You should receive an answer.
