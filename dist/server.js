"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
require("dotenv-expand/config");
//
// import authRouter from "./routes/auth.js";
// import notesRouter from "./routes/notes.js";
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
// app.use('/api', authRouter);
// app.use('/api/notes', notesRouter);
// Connect to database
mongoose_1.default
    .connect((_a = process.env.DB_URI) !== null && _a !== void 0 ? _a : "")
    .then(() => {
    console.log("Connected with MongoDB");
    // Listen for requests once connection with db is established
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    });
})
    .catch((err) => {
    console.error(err);
});
