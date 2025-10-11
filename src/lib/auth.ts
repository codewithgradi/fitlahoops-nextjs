import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

// Create JWT token
export function createToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
}

// Verify token
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    return null;
  }
}

export async function getAdminFromCookie(): Promise<JwtPayload | null> {
  try {
    const cookieStore = await cookies(); 
    const token = cookieStore.get("admin_token")?.value;

    if (!token) return null;
    return verifyToken(token);
  } catch (err) {
    console.error("Error reading cookie:", err);
    return null;
  }
}
