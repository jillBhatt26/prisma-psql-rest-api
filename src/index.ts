// module imports
import express, { Application } from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

// app router imports
import appRouter from './routes';

// error handler middleware
import { errorHandler } from './middleware';

// app init and middleware
const app: Application = express();

// requests parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

// app listen
const PORT: number = parseInt(process.env.PORT!);
const HOST: string = process.env.HOST!;

app.listen(PORT, HOST, () => {
    console.log(`Backend live on URL: http://${HOST}:${PORT}`);
});

// app routes middleware
app.use(appRouter);

// error handler middleware
app.use(errorHandler);
