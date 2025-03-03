import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173' 
}));
app.use(express.json());

const PORT = 4000;

const dbPath = path.join(__dirname, '..', 'data', 'db.json');

const getWords = (): string[] => {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const json = JSON.parse(data);
    console.log(json.words)
    return json.words;
  } catch (error) {
    console.error('Error reading db.json:', error);
    return [];
  }
};

app.get('/words', (_req: Request, res: Response) => {
    const words = getWords();
    res.json({ words });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});