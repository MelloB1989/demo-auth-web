import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import mg from '../../lib/mailgun/mailer';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from "@prisma/client";

const JWT_SECRET=process.env.JWT_SECRET;
const prisma = new PrismaClient();


export default async function resetPassword(req: NextApiRequest, res: NextApiResponse) {
    const { password, token } = req.body;
    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.update({ where: { id: userId }, data: { password: passwordHash } });
    res.json({ message: 'Password updated' });
}