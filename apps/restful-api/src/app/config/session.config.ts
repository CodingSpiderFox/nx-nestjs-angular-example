export const SessionConfig = {
  name: 'api-session' as const,
  secret: process.env.API_SESSION_SECRET
};
