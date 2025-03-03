"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173'
}));
app.use(express_1.default.json());
const PORT = 4000;
const dbPath = path_1.default.join(__dirname, '..', 'data', 'db.json');
const getWords = () => {
    try {
        const data = fs_1.default.readFileSync(dbPath, 'utf-8');
        const json = JSON.parse(data);
        console.log(json.words);
        return json.words;
    }
    catch (error) {
        console.error('Error reading db.json:', error);
        return [];
    }
};
app.get('/words', (_req, res) => {
    const words = getWords();
    res.json({ words });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
