"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var images_1 = __importDefault(require("./api/images"));
var router = (0, express_1.Router)();
router.use('/image', images_1.default);
router.get('/', function (req, res) {
    var message = "<h1>Welcome to image resize processing </h1>";
    res.send(message);
});
exports.default = router;
