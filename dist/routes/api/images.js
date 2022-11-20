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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var data_1 = require("../../utils/data");
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var imageRouter = (0, express_1.Router)();
var output = path_1.default.resolve('./') + "/public/thumbnail/";
imageRouter.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, width, height, imagePath, image, resizedImageName, resizedImagePath, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                name_1 = req.query.name;
                if (!name_1) {
                    return [2 /*return*/, res.status(404).send('must add Image name to URL ')];
                }
                width = Number(req.query.width);
                if (!width) {
                    return [2 /*return*/, res
                            .status(404)
                            .send('width is not found, you must add width to URL')];
                }
                height = Number(req.query.height);
                if (!height) {
                    return [2 /*return*/, res
                            .status(404)
                            .send('height is not found, you must add height to URL')];
                }
                imagePath = path_1.default.resolve('./') + "/public/images/".concat(name_1, ".jpg");
                if (fs_1.default.existsSync(imagePath) === false) {
                    return [2 /*return*/, res.status(404).send('image is not found')];
                }
                image = data_1.imageList.includes(name_1);
                if (image === false) {
                    return [2 /*return*/, res.status(404).send('image is not found')];
                }
                resizedImageName = "".concat(name_1, "-").concat(width, "x").concat(height, ".jpg");
                if (!fs_1.default.existsSync(output)) {
                    fs_1.default.mkdirSync(output);
                }
                resizedImagePath = output + resizedImageName;
                if (data_1.resizedImageList.includes(resizedImageName)) {
                    return [2 /*return*/, res.status(200).sendFile(resizedImagePath)];
                }
                return [4 /*yield*/, (0, sharp_1.default)(imagePath).resize(width, height).toFile(resizedImagePath)];
            case 1:
                _a.sent();
                data_1.resizedImageList.push(resizedImageName);
                res.status(200).sendFile(resizedImagePath);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500).send(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = imageRouter;