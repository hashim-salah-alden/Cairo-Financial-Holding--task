import jwt from "jsonwebtoken";

import express from "express";

export const generateToken = (userId: string, res: express.Response): void => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // prevent XSS attacks (Cross-Site Scripting)
    sameSite: "strict", // prevent CSRF attacks (Cross-Site Request Forgery)
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in non-development environments
  });
};
