export const SessionConfig = {
  name: 'admin-session' as const,
  secret: process.env.ADMIN_SESSION_SECRET
};
