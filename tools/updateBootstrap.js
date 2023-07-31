import fs from "node:fs/promises";

try {
  await fs.copyFile(
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "static/css/bootstrap.min.css",
  );
  console.info("bootstrap.min.css was copied to static/css/");
} catch (e) {
  console.error("The files could not be copied", e);
}
