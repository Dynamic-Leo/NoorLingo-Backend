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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
// const saveImage = function saveBase64Image(base64Data: String) {
//     const __dirname = "./public/images";
//     const timestamp = Date.now(); // Get the current timestamp
//     const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
//     const filename = `image_${timestamp}_${randomString}.png`;
//     const filePath = path.join(__dirname, filename); // Set the file path to the current directory
//     // Remove the data URL header from the base64 data
//     const imageData = base64Data.replace(/^data:image\/png;base64,/, "");
//     // Save the image to the file system
//     fs.writeFile(filePath, imageData, "base64", function (err: Error) {
//         if (err) {
//             console.error("Error saving the file:", err);
//         } else {
//             console.log("File saved successfully:", filePath);
//         }
//     });
//     return `images/${filename}`
// }
const util_1 = require("util");
const writeFile = (0, util_1.promisify)(fs.writeFile);
const uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = file.match(/^data:(.+);base64,(.+)$/);
        if (!match) {
            throw new Error("Invalid file format");
        }
        const [, fileType, fileData] = match;
        const [fileMainType, fileSubType] = fileType.split("/");
        const fileBuffer = Buffer.from(fileData, "base64");
        const fileName = Date.now() + "." + fileSubType;
        let filePath = null;
        let filePathPrefix = null;
        if (fileMainType === "image") {
            filePathPrefix = "images/";
            filePath = "./public/images/" + fileName;
        }
        else if (fileMainType === "video") {
            filePathPrefix = "videos/";
            filePath = "./public/videos/" + fileName;
        }
        else {
            filePathPrefix = "files/";
            filePath = "./public/files/" + fileName;
        }
        yield writeFile(filePath, fileBuffer);
        const path = filePathPrefix + fileName;
        return path;
    }
    catch (err) {
        console.log(err);
        // return null;
    }
});
exports.default = uploadFile;
// export default { saveImage };
