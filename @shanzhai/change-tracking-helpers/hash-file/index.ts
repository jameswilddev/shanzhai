import * as fs from "fs";
import * as crypto from "crypto";

export async function hashFile(filePath: string): Promise<string> {
  const hash = crypto.createHash(`sha1`);

  const stream = fs.createReadStream(filePath);
  stream.on(`data`, (chunk) => hash.update(chunk));
  await new Promise((resolve, reject) => {
    stream.on(`end`, resolve);
    stream.on(`error`, reject);
  });

  return hash.digest(`hex`);
}
