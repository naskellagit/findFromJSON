"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = require("./validator");
const handleValidationErrors_1 = __importDefault(require("./handleValidationErrors"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = 5005;
const filePath = path_1.default.join(__dirname, '../', 'data.json');
const sleep = (ms) => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise((resolve) => {
        setTimeout(() => {
            resolve(ms);
        }, ms);
    });
});
app.use((0, cors_1.default)());
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../', 'front', 'build')));
app.get('/api', validator_1.queryValidator, handleValidationErrors_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone } = req.query;
    yield sleep(5000);
    const dataJson = fs_1.default.readFileSync(filePath, { encoding: 'utf8' });
    const data = JSON.parse(dataJson);
    const filteredData = data.filter(elem => {
        if (phone)
            return elem.email === email && elem.number === Number(phone);
        return elem.email === email;
    });
    return res.json(filteredData);
}));
app.listen(PORT, () => {
    console.log('Server is started on port ' + PORT);
});
