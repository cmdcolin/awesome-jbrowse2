//run this in the static dir folder
//identify -format "%f %wx%h\n" *.jpg *.png > ../../dims.txt
import fs from "fs";
const data = JSON.parse(fs.readFileSync("LINKS.json", "utf8"));
const d2 = Object.fromEntries(
  fs
    .readFileSync("dims.txt", "utf8")
    .split("\n")
    .filter((f) => !!f)
    .map((line) => line.split(" "))
);

data.links = data.links.map((d) => {
  if (d2[d.img]) {
    const entry = d2[d.img];
    const [width, height] = entry.split("x");
    return { ...d, width: +width, height: +height };
  } else {
    return d;
  }
});

fs.writeFileSync("LINKS.json", JSON.stringify(data, null, 2));
