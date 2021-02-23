const fs = require("fs");

const fileName = process.argv.slice(2)[0];
// console.log(fileName);
function writeOutFile(data) {
    const filenameBits = fileName.split('/');
    const outputName = filenameBits[filenameBits.length - 1];
  fs.writeFile(`parsed-${outputName}`, JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("good job!");
    }
  });
}
function parseStuff(err, data) {
  if (err) {
    console.error(err);
  } else {
    const drawData = JSON.parse(data);
    const cleanedData = drawData.map((line) => {
      const cleanedLine = line.map((seg) => {
        const keys = Object.keys(seg);
        const cleanedSeg = {};
        keys.forEach((k) => {
          cleanedSeg[k] = +seg[k];
        });
        return cleanedSeg;
      });
      return cleanedLine;
    });
    writeOutFile(cleanedData);
  }
}

fs.readFile(fileName, "utf8", parseStuff);
