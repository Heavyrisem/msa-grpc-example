import fs from "fs";
import { join } from "path";

const getFilePaths = (path: string, exclude?: string[]): string[] => {
  const results = fs.readdirSync(path, { withFileTypes: true });

  const protoFiles = results
    .filter((item) => !exclude?.includes(item.name))
    .map((item) => {
      const name = join(path, item.name);
      if (item.isFile()) return name;
      else return getFilePaths(name, exclude);
    });

  return protoFiles.flat();
};

const generateProtoType = (
  savePath: string,
  sourcePath: string,
  typeName: string
) => {
  const protoFiles = getFilePaths(sourcePath, ["node_modules"])
    .filter((filePath) => filePath.endsWith(".proto"))
    .map((filePath) => filePath.replace(sourcePath, ""));
  const typeString = `export type ${typeName} = '${protoFiles.join("'|'")}';`;
  fs.writeFileSync(savePath, typeString);
};

const sourcePath = join(__dirname, "../src/");
const savePath = join(__dirname, "../src/proto.type.ts");

generateProtoType(savePath, sourcePath, "protos");
