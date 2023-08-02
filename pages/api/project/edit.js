import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export default function handler(req, res) {
  const projectsfolder = join(process.cwd(), `/_projects/`);
  if (process.env.NODE_ENV === "development") {
    if (req.method === "POST") {
      const { title, tagline, preview, image } = req.body.variables;
      fs.writeFile(
        projectsfolder + req.body.slug + ".md",
        matter.stringify(req.body.content, {
          title,
          tagline,
          preview,
          image,
        }),
        "utf-8",
        (err) => console.log(err)
      );
      res.status(200).json({ status: "DONE" });
    } else {
      res
        .status(200)
        .json({ name: "This route works in development mode only" });
    }
  }
}
