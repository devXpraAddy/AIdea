# AIdea - AI SaaS Platform

AIdea is a comprehensive AI Software-as-a-Service platform that provides multiple AI-powered creative and productive tools in one place. Built with modern web technologies and integrated with various AI services, AIdea offers a seamless experience for users to interact with different AI capabilities.

## Features

- 🤖 **AI Conversation**: Natural language interaction powered by OpenAI
- 🎨 **Image Generation**: Create unique images from text descriptions
- 💻 **Code Assistant**: Get help with coding and programming tasks
- 🎵 **Music Generation**: Create original music pieces using AI
- 🎥 **Video Generation**: Generate video content from prompts
- 📸 **Photo Enhancement**: Restore and enhance photos
- 💳 **Stripe Integration**: Subscription-based pricing model
- 🔐 **Authentication**: Secure user authentication with Clerk
- ✨ **Responsive Design**: Works seamlessly across all devices

## Tech Stack

- **Frontend**: Next.js 13, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Payments**: Stripe
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **AI Services**: OpenAI, Replicate
- **Deployment**: Vercel

## Getting Started

1. Clone the repository:
   `bash
git clone https://github.com/yourusername/airis.git
   `
2. Install dependencies:
`bash
npm install
`
3. Set up environment variables:


## Create a .env file with the following variables

- `DATABASE_URL=`  
  Database connection string.

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=`  
  Clerk publishable key.

- `CLERK_SECRET_KEY=`  
  Clerk secret key.

- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=`  
  URL for the sign-in page.

- `NEXT_PUBLIC_CLERK_SIGN_UP_URL=`  
  URL for the sign-up page.

- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=`  
  Redirect URL after sign-in.

- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=`  
  Redirect URL after sign-up.

- `OPENAI_API_KEY=`  
  API key for OpenAI services.

- `REPLICATE_API_TOKEN=`  
  Token for Replicate API.

- `STRIPE_API_KEY=`  
  Stripe secret API key.

- `STRIPE_WEBHOOK_SECRET=`  
  Secret for verifying Stripe webhook events.

- `NEXT_PUBLIC_APP_URL=`  
  Base URL of the application.

4. Run database migrations:
`bash
npx prisma db push`

5. Start the development server:
`bash
npm run dev
`

## Project Structure

- `app/` - Next.js 13 app directory containing routes and API endpoints
- `components/` - Reusable React components
- `lib/` - Utility functions and configurations
- `public/` - Static assets
- `prisma/` - Database schema and migrations

## Features in Detail

### Free Tier
- 5 generations per day
- Access to all AI tools
- Basic support

### Pro Tier
- Unlimited generations
- Priority support
- Early access to new features
- No daily limits

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vercel](https://vercel.com) for hosting
- [OpenAI](https://openai.com) for AI capabilities
- [Replicate](https://replicate.com) for AI models
- [Stripe](https://stripe.com) for payment processing
- [Clerk](https://clerk.dev) for authentication
