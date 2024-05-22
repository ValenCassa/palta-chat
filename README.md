<!-- PROJECT LOGO -->

[![Palta](https://i.imgur.com/Pd1AHlC.png)](https://app.palta.chat)

> [!CAUTION]
> The project is in development. When self-hosting it, you'll need to manually add credits to your user in the database. This will be automated in the future.

## About the project

<img width="100%" alt="Project's thumbnail" src="https://i.imgur.com/olBE9wf.png">

# Your hub for LLMs

Hey there! Are you curious about the latest advancements in AI? Want to chat with the most cutting-edge language models out there? Look no further than Palta!

Our platform is a hub for all the latest Large Language Models (LLMs), where you can discover and chat with the latest models. From GPT-3.5 to Llama 3 and beyond, we've got them all in one place.

### Built with

- [NextJS](https://nextjs.org/?ref=app.palta.chat)
- [Turso](https://turso.tech/?ref=app.palta.chat)
- [Clerk](https://clerk.com/?ref=app.palta.chat)
- [Tailwind CSS](https://tailwindcss.com/?ref=app.palta.chat)
- [Drizzle](https://orm.drizzle.team/?ref=app.palta.chat)

## Contact me

Meet me for any commercial inquiries or to discuss your project.

<a href="https://cal.com/valen-cassa/let-s-chat-about-your-idea"><img src="https://cal.com/book-with-cal-dark.svg" alt="Book us with Cal.com"></a>

### Prerequisites

Here is what you need in order to run Palta.

- Node.js (Version: >=18.x)
- A Turso project setup
- A Clerk project setup
- A [OpenAI](https://openai.com/) API key
- A [Fireworks](https://fireworks.ai/) API key
- A [Groq](https://console.groq.com/) API key

## Development

### Setup

1. Clone the repo into a public GitHub repository (or fork https://github.com/ValenCassa/palta-chat/fork). If you plan to distribute the code, keep the source code public to comply with [AGPLv3](https://github.com/ValenCassa/palta-chat/blob/main/LICENSE).

   ```sh
   git clone https://github.com/ValenCassa/palta-chat.git
   ```

2. Go to the project folder

   ```sh
   cd palta-chat
   ```

3. Install packages with npm

   ```sh
   npm install
   ```

4. Set up your `.env` file

   - Duplicate `.env.example` to `.env`
   - Fill in the required environment variables

5. Setup Node
   If your Node version does not meet the project's requirements as instructed by the docs, "nvm" (Node Version Manager) allows using Node at the version required by the project:

   ```sh
   nvm use
   ```

   You first might need to install the specific version and then use it:

   ```sh
   nvm install && nvm use
   ```

   You can install nvm from [here](https://github.com/nvm-sh/nvm).

6. Push schema to the database

   ```sh
   npm run db:push
   ```

7. Run the project in development mode

   ```sh
   npm run dev
   ```
