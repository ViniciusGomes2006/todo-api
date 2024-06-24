import fs from "fs";
import { parse } from "csv-parse";

export function parseCSV() {
  const readStream = fs.createReadStream("src/Stream/tasks.csv");

  readStream
    .pipe(parse())

    .on("data", (row: [title: string, description: string]) => {
      const [title, description] = row;
      
      const checkRequest = title !== "title" && description !== "description"

      if (!checkRequest) return

      fetch("http://localhost:3000/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      })
    })
    .on("error", (error) => console.log(error))
    .on("end", () => console.log("CSV file successfully processed"));
}