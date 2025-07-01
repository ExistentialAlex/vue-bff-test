import express from 'express';
import userRouter from './user';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use('/api/users', userRouter);

const server = app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});
