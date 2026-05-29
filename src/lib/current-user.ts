import { cookies } from "next/headers";
import { getAuthCookieName, verifyAuthToken } from "@/lib/jwt";

export async function getCurrentUser() {
  const token = cookies().get(getAuthCookieName())?.value;

  if (!token) {
    return null;
  }

  const user = await verifyAuthToken(token);

  return user;
}