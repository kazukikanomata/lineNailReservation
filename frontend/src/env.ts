interface Env {
  readonly API_BASE_URL: string;
}

export const env: Env = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL as string,
};
