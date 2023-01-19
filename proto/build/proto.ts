import { findAllProtoFiles, sourcePath } from "./paths";
import { sync } from "cross-spawn";
import { SpawnSyncOptions } from "child_process";
import { join, normalize } from "path";

const execute = (
  command: string,
  args: string[],
  options?: SpawnSyncOptions
) => {
  console.log("Running command:", [command, args.join(" ")].join(" "), options);
  const ps = sync(command, args, options);

  if (ps.error) {
    console.log(ps.error);
    throw ps.error;
  } else if (ps.status !== 0) {
    console.log(ps.output.toString());
    throw new Error(
      `Non-zero Exit Code: ${ps.status}, ${command} ${args.join(" ")}`
    );
  } else {
    return ps;
  }
};

const buildAllProto = () => {
  const protoFiles = findAllProtoFiles(sourcePath);
  protoFiles.forEach((protoPath) => {
    const result = execute(
      "npx",
      [
        "protoc",
        "--ts_out",
        "./src",
        "--proto_path",
        "./src",
        normalize(join("./src/", protoPath)),
      ],
      { cwd: join(__dirname, "..") }
    );
    if (result.error) console.log(result.stderr.toString());
  });
};

buildAllProto();
