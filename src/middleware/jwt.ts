import { RequestHandler } from "express";
import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../libs/prisma";
import { User } from "../types/User";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY!,
};

const strategy = new JWTStrategy(options, async (payload, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (user) return done(null, user);
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
});

passport.use("jwt", strategy);

export const jwtStrategyAuth: RequestHandler = (req, res, next) => {
  passport.authenticate("jwt", (err: any, user: User | false) => {
    if (user) {
      req.user = user;
      return next();
    }
    return res.status(401).json({ error: "Não autorizado" });
  })(req, res, next);
};
