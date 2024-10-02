export const USER_ROLE = {
  user: 'user',
  admin: 'admin',
} as const;

export const PASSWORD_RESET = {
  TOKEN_EXPIRES_IN_MS: 10 * 60 * 1000,
  TOKEN_LENGTH: 32,
} as const;
