import jwt, { Secret, SignOptions } from "jsonwebtoken";

// Function that generates our JWTs
export const generateJWT = (userId: string) => {
  // We type cast passed arguments to match exprected types or sign
  const secret: Secret = process.env.JWT_SECRET!;
  // We console TS that we're passing a valid value for expiresIn
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"],
  };
  return jwt.sign({ id: userId }, secret, options);
};
