import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from "@prisma/client";

const JWT_RST_SECRET=process.env.JWT_RST_SECRET;
const prisma = new PrismaClient();


export default async function resetPassword(req: NextApiRequest, res: NextApiResponse) {
    const { password, token } = req.body;
    try{
        const { id } = jwt.verify(token, JWT_RST_SECRET!) as { id: string };
        const passwordHash = await bcrypt.hash(password, 10);
        await prisma.user.update({ where: { id: Number(id) }, data: { password: passwordHash } });
        res.json({ message: 'Password updated' });
    } catch {
        res.json({message: `Invalid JWT! Don't try to mess around`});
    }
}