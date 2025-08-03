import { getSession } from "next-auth/react";
import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';

interface FetchExtraResponse {
  status: number;
  response?: any;
}

export async function fetchExtra(
    input: string,
    init: RequestInit = {},
    useAuth: boolean = true,
    context?: GetServerSidePropsContext
): Promise<FetchExtraResponse> {
  let session = null;

  if (useAuth) {
    if (context) {
      session = await getServerSession(context.req, context.res, authOptions);
    } else {
      try {
        session = await getSession();
      } catch (e) {
        console.warn("Couldn't get client session", e);
      }
    }

    if (session?.token) {
      if (!init.headers) {
        init.headers = {};
      }

      const headers = new Headers(init.headers);
      headers.set('Authorization', `Bearer ${session.token}`);
      init.headers = headers;
    }
  }

  try {
    const response = await fetch(`${baseURL}${input}`, init);

    switch (response.status) {
      case 200:
      case 201:
        return {
          status: response.status,
          response: await response.json(),
        };
      case 204:
        return {
          status: response.status,
        };
      case 429:
        throw { message: "Too many requests" };
      case 401:
        throw await response.json();
      case 404:
        throw await response.json();
      case 500:
        throw await response.json();
      default:
        throw await response.json();
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}