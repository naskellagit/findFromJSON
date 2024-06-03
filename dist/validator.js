"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryValidator = void 0;
const express_validator_1 = require("express-validator");
exports.queryValidator = [
    (0, express_validator_1.query)('email', 'Некорректный email').isEmail(),
    (0, express_validator_1.query)('phone', 'Некоректный номер').isString().isLength({
        min: 6,
        max: 6
    }).optional()
];
