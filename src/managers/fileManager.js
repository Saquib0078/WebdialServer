const fs = require("fs");
const path = require("path");

const rawDataPath = "../../data";
console.log(rawDataPath)

const dataPath = path.join(__dirname, rawDataPath);
// const usersPath = path.join(__dirname, rawDataPath + "/users/");

const categoryPath = path.join(__dirname, rawDataPath + "/category/");
console.log(categoryPath)


const deleteBroadcastImage = (broadcastID, type, callback) => {
    fs.unlink(categoryPath + broadcastID + "." + type, (err) => {
        callback();

        
    });
}

module.exports = {
    dataPath,categoryPath
}