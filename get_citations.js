import fs from "fs";

import { setTimeout } from "timers/promises";

const data = JSON.parse(fs.readFileSync("LINKS.json", "utf8"));

(async () => {
  let timeout = 1000;
  for (let i = 0; i < data.links.length; ) {
    const d = data.links[i];

    try {
      if (d.pub) {
        const doi = d.pub.doi;
        if (
          doi.includes("zenodo") ||
          doi.includes("figshare") ||
          doi.includes("10.13140/RG.2.2.15289.39522") ||
          doi.includes("micropub")
        ) {
          i++;
          continue;
        }

        if (d.pub.year && !process.env.ALL_CITATIONS) {
          i++;
          continue;
        }
        console.log(
          i + "/" + data.links.length,
          "curr waittime",
          timeout,
          "doi",
          doi,
        );
        const url = doi.startsWith("http") ? doi : "https://doi.org/" + doi;
        const response = await fetch(url, {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) {
          throw new Error(
            `failed ${response.statusText} ${await response.text()}`,
          );
        }
        const json = await response.json();
        d.pub.year = +json.published["date-parts"][0][0];
        d.pub.title = json.title;
        d.pub.citations = +json["is-referenced-by-count"];
        timeout = 1000;
      }
      i++;
    } catch (e) {
      console.error("got error, retrying", e);
      await setTimeout(timeout);
      timeout = timeout * 2;
      if (timeout >= 4000) {
        i++;
      }
    }
  }
  fs.writeFileSync("LINKS.json", JSON.stringify(data, null, 2));
})();
