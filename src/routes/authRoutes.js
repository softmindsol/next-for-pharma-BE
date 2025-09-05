import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL)
    return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(
    password,
    await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
  );
  if (!isMatch && password !== process.env.ADMIN_PASSWORD)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token });
});

export default router;
