import { Context, Next } from "koa";
import jwt from 'jsonwebtoken';

export async function authMiddleware(ctx: Context, next: Next){
    const authHeader = ctx.headers.authorization;

    if(!authHeader){
        ctx.status = 401;
        ctx.body = { message: 'Token de autenticação não fornecido.' };
        return;
    }

    const [, token ] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (ctx as any).user = decoded;
        await next();
    } catch {
        ctx.status = 401;
        ctx.body = { message: 'Token de autenticação inválido.' };
    }
}