const fs = require("fs");
const draw= require("../common/Draw.js");
const {createCanvas}=require("canvas");
const canvas=createCanvas(400,400);
const ctx=canvas.getContext("2d");
const constants=require("../common/Constants.js");

const fileNames= fs.readdirSync(constants.RAW_DIR);
const samples=[];
let id=1;
fileNames.forEach(file => {
    const content = fs.readFileSync(constants.RAW_DIR+"/"+file);
    const {session, student,drawings} = JSON.parse(content);
    for(let label of Object.keys(drawings)){
        samples.push({
            id,
            label,
            student,
            session
        });
        let paths = drawings[label];
        fs.writeFileSync(
            constants.JSON_DIR+"/"+id+".json",
            JSON.stringify(paths)
        );
        generateImageFile(
            constants.IMG_DIR+"/"+id+".png",
            paths
        );
        id++;
    }

});
fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

function generateImageFile(outFile,paths){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw.paths(ctx,paths);
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(outFile, buffer);
}