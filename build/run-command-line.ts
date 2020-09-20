import * as childProcess from "child_process";

export async function runCommandLine(
  command: string,
  cwd: string
): Promise<string> {
  return await new Promise((resolve, reject) => {
    childProcess.exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        reject(
          new Error(
            `Command "${command}" exited with code ${error.code} (stdout: "${stdout}"; stderr: "${stderr}").`
          )
        );
      } else {
        console.log(stderr);
        resolve(stdout);
      }
    });
  });
}
