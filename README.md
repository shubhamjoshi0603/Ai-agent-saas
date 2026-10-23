# Health AI Call Agent SaaS

Starter project for a clinic operations dashboard and AI voice-agent SaaS, built with Next.js, TypeScript, Supabase, Stripe, and a planned Vapi integration.

## Run locally
1. Install Node.js LTS and Git.
2. Clone this repository and open it in VS Code.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local` and fill in only the services you have configured.
5. Run `npm run dev` and open http://localhost:3000.

## Current status
- Clinic dashboard UI uses demo data.
- Appointment API is an in-memory starter and resets when the server restarts.
- Supabase schema is a starting point; authenticated tenant-scoped queries and policies still need to be completed.
- Voice webhook and Stripe checkout are integration scaffolds, not production-ready integrations.
- Do not store real patient data until authentication, tenant isolation, authorization, audit logging, and applicable healthcare privacy/compliance requirements are reviewed.
- Never commit `.env.local`, secrets, real patient data, or API keys.
