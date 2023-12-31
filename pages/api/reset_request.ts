import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import send_link from '../../lib/mailgun/mailer';
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from "@prisma/client";

const BASE_URL=process.env.BASE_URL;
const JWT_RST_SECRET=process.env.JWT_RST_SECRET;
const prisma = new PrismaClient();

export default async function resetPassword(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.body;
    try{
        const user = await prisma.user.findUnique({ where: { email: email } });
        if(user){
            const token = jwt.sign({ id: user.id }, JWT_RST_SECRET!, { expiresIn: '5h' });
            const link = `${BASE_URL}/reset-password?token=${token}`;
            send_link(email, link);
        }
        res.json({ message: 'Check your email to reset your password, link expires in 5 hours!' });
    } catch {
        res.json({message: `Unexpected error!`});
    }
}