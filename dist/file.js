"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
class DataBase {
    static set(data, callback) {
        (0, fs_1.readFile)(path_1.default.join(__dirname, "..", "shortCut.json"), (err, d) => {
            if (err) {
                console.log(err);
            }
            else {
                const content = JSON.parse(d.toString());
                content.push(data);
                (0, fs_1.writeFile)(path_1.default.join(__dirname, "..", "shortCut.json"), JSON.stringify(content), (err) => {
                    callback(err);
                });
            }
        });
    }
    static gets(callback) {
        (0, fs_1.readFile)(path_1.default.join(__dirname, "..", "shortCut.json"), (err, d) => {
            if (err)
                callback(err, null);
            else
                callback(null, JSON.parse(d.toString()));
        });
    }
    static remove(keys, keyB, callback) {
        (0, fs_1.readFile)(path_1.default.join(__dirname, "..", "shortCut.json"), (err, d) => {
            if (err)
                console.log(err);
            else if (d) {
                let data = JSON.parse(d.toString());
                data = data.filter((item) => {
                    return item.keys == keys && item.keyB == keyB ? false : item;
                });
                (0, fs_1.writeFile)(path_1.default.join(__dirname, "..", "shortCut.json"), JSON.stringify(data), (err) => {
                    callback(err);
                });
            }
        });
    }
}
exports.DataBase = DataBase;
