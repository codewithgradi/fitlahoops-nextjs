import jwt, { Secret } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "supersecret";

type JWTPayload = { [key: string]: any };

// Sign a JWT
export function signJWT(payload: JWTPayload, expiresIn: string | number = "1d"): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: expiresIn as unknown as jwt.SignOptions["expiresIn"], 
  });
}

// Verify a JWT
export function verifyJWT(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") return { data: decoded };
    return decoded as JWTPayload;
  } catch {
    return null;
  }
}
