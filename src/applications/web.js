import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import prismaClient from './database.js';
import morganMiddleware from '../middlewares/morgan-middleware.js';
import errorMiddleware from '../middlewares/error-middleware.js';
import authRoute from '../routes/auth-route.js';
import userRoute from '../routes/user-route.js';
import pemetaanHutanRoute from '../routes/pemetaanHutan-route.js';
import pemetaanKebunRoute from '../routes/pemetaanKebun-route.js';
import legalitasLahanRoute from '../routes/legalitasLahan-route.js';
import invokeRoute from '../routes/invoke-route.js';

dotenv.config();

const FRONTEND_APP_URLS = process.env.FRONTEND_APP_URLS || 'http://localhost:5173';
const CORS_ALLOWED_ORIGINS = FRONTEND_APP_URLS.split(',');

const SESSION_SECRET = process.env.SESSION_SECRET || '$SeSsIoN-sEcReT$';
const store = new PrismaSessionStore(prismaClient, {
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

const web = express();

web.use(
  cors({
    credentials: true,
    origin: CORS_ALLOWED_ORIGINS,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  })
);

web.options('*', cors());

web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: 'auto',
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: store,
  })
);

web.use(morganMiddleware);
web.use(authRoute);
web.use(userRoute);
web.use(pemetaanHutanRoute);
web.use(invokeRoute);
web.use(pemetaanKebunRoute);
web.use(legalitasLahanRoute);
web.use(errorMiddleware);

export default web;
