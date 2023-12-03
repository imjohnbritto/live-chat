import mongoose from 'mongoose';
import { SessionOptions } from 'express-session';
import MongoStore from 'connect-mongo';
import { logger } from './logger';

const DB_NAME = 'teams-chat';

export async function connectToDatabase() {
  const dbConnectionString = process.env.DB_CONNECTION;
  try {
    if (!dbConnectionString) {
      throw new Error('DB Connection string not found');
    }
    await mongoose.connect(dbConnectionString, {
      dbName: DB_NAME,
      autoIndex: false,
      minPoolSize: 10,
      maxPoolSize: 100,
      maxIdleTimeMS: 1000
    });
    logger.info('Connected to database');
  } catch (e) {
    logger.error({ e, message: 'Failed to connect to database. Goodbye' });
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close();
  logger.info('Disconnected from database');
}

export const getSessionOptions = () => {
  const sessionStore = MongoStore.create({
    mongoUrl: process.env.DB_CONNECTION,
    collectionName: 'sessions',
    dbName: DB_NAME,
    touchAfter: 6 * 60 * 60, // 6 hrs
    mongoOptions: {
      maxPoolSize: 5
    }
  });

  const sessionOptions: SessionOptions = {
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      signed: true,
      sameSite: 'strict'
    }
  };
  return sessionOptions;
};
