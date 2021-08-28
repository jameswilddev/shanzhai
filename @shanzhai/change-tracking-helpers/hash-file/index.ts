import * as fs from "fs";
import * as crypto from "crypto";

/**
 * Calculates the SHA1 hash of a file's contents.
 * @param filePath The path to the file to hash.
 * @returns A Promise resolving to a {@link String} containing the file's SHA1
 * hash in hexadecimal.
 */
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
