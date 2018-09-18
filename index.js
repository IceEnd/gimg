#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const package_json_1 = __importDefault(require("./package.json"));
commander_1.default
    .version(package_json_1.default.version);
commander_1.default
    .command('create <name>')
    .description('Generate image')
    .usage('[options] <file ...>')
    .option('-s, --size <size>', 'Image size', /^d+xd+$/i, '500x500')
    .option('-t, --text <text>', 'Text')
    .option('-o, --out <path>', 'Out file path')
    .action((...args) => {
    const [name, options] = args;
    console.log(name, options);
});
commander_1.default
    .command('help')
    .description('Print this help')
    .action(() => {
    commander_1.default.outputHelp();
})
    .parse(process.argv);
commander_1.default
    .parse(process.argv);
if (process.argv.length === 2) {
    commander_1.default.outputHelp();
}
