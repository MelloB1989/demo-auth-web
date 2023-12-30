import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';

const JWT_SECRET=process.env.JWT_SECRET;
const prisma = new PrismaClient();

export default async function Register(req: NextApiRequest, res: NextApiResponse) {

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user) {
        return res.status(401).json({ message: 'Email already registered' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({ data: { email: email, password: passwordHash } });
    //Set jwt token as set-cookie header in response
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET!, { expiresIn: '1d' });
    res.setHeader('Set-Cookie', cookie.serialize('auth', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 86400,
        path: '/',
    }));
    //res.json({ token });
}