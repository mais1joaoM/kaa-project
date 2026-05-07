import { Context } from 'koa'

import { AuthService } from '../services/auth.service'

import { generateToken } from '../utils/jwt'

export class AuthController {
  static async register(ctx: Context) {
    try {
      const { name, email, password } =
        ctx.request.body as any

      const user =
        await AuthService.register(
          name,
          email,
          password
        )

      ctx.status = 201

      ctx.body = {
        message: 'Usuário criado',
        user,
      }
    } catch (error: any) {
      ctx.status = 400

      ctx.body = {
        message: error.message,
      }
    }
  }

  static async login(ctx: Context) {
    try {
      const { email, password } =
        ctx.request.body as any

      const user =
        await AuthService.login(
          email,
          password
        )

      const token = generateToken({
        id: user.id,
        email: user.email,
      })

      ctx.body = {
        token,
      }
    } catch (error: any) {
      ctx.status = 401

      ctx.body = {
        message: error.message,
      }
    }
  }

    static async me(ctx: Context) {
        const user = (ctx as any).user;

        ctx.body = {
            user,
        }
    }
}