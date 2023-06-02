"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const environment_1 = __importDefault(require("./utils/environment"));
const routes_1 = __importDefault(require("./routes"));
const controllers_1 = require("./Http/helperCheck/controllers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('combined'));
app.use((req, res, next) => {
    console.log("method", req.method);
    console.log("path", req.path);
    console.log("body", req.body);
    next();
});
app.get('/', controllers_1.helperCheck);
app.use(environment_1.default.BASE_PATH, routes_1.default);
app.listen(environment_1.default.NODE_PORT, () => {
    console.log("server listening on port", environment_1.default.NODE_HOST + "::" + environment_1.default.NODE_PORT + environment_1.default.BASE_PATH);
});
