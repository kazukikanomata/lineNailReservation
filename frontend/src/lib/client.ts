import { env } from "@/env";

type CreateHttpClientOptions = {
  baseUrl: string;
  defaultHeaders?: HeadersInit;
};

export function createHttpClient({
  baseUrl,
  defaultHeaders,
}: CreateHttpClientOptions) {
  const request = (path: string, init?: RequestInit) =>
    fetch(`${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`, {
      ...init,
      headers: {
        ...defaultHeaders,
        ...init?.headers,
      },
    });
  return { baseUrl, request };
}

export const httpClient = createHttpClient({
  baseUrl: env.API_BASE_URL,
  defaultHeaders: {
    Accept: "application/json",
  },
});
