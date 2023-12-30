import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';

const JWT_SECRET=process.env.JWT_SECRET;
const prisma = new PrismaClient();

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET!, { expiresIn: '1d' });
    res.json({ token });
}