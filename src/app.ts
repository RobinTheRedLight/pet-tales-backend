import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';

import notFound from './app/middlewares/notFound';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

// Application routes
app.use('/api', router);

// Global error handler
app.use(globalErrorHandler);

// Not Found handler
app.use((req: Request, res: Response, next: NextFunction) => {
  notFound(req, res, next);
});

export default app;
