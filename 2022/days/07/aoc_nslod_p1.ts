const { parse } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let COMMANDS = {
  cd: 0,
  ls: 1,
  noop: 99,
};
let FILETYPES = {
  directory: 0,
  file: 1,
};
type FileInfo = {
  name: string;
  filetype: number;
  filesize: number;
  parent: string;
};

let activeCommand = COMMANDS.noop;
let wd = "?";
let fs: FileInfo[] = [
  { name: "/", filetype: FILETYPES.directory, filesize: 0, parent: "" },
];

const handleCommand = (command: string) => {
  console.log(`COMMAND: ${command}`);
  if (command.startsWith("cd")) {
    const [_, path] = command.split(" ");
    wd = path;
    activeCommand = COMMANDS.cd;
  } else if (command.startsWith("ls")) {
    activeCommand = COMMANDS.ls;
  }
};

const handleInfo = (info: string) => {
  console.log(`INFO: ${info}`);
  if (activeCommand === COMMANDS.cd) {
    console.warn("SYNTAX ERROR");
  } else if (activeCommand === COMMANDS.ls) {
    if (info.startsWith("dir")) {
      const [_, dirName] = info.split(" ");
      fs.push({
        name: dirName,
        filetype: FILETYPES.directory,
        filesize: 0,
        parent: wd,
      });
    } else {
      const [strSize, filename] = info.split(" ");
      const filesize = Number(strSize);
      fs.push({
        name: filename,
        filetype: FILETYPES.file,
        filesize: filesize,
        parent: wd,
      });
    }
  }
};

const dirSizes = () => {
  let ds: { [key: string]: number } = {};

  // handle files
  fs.reduceRight((prev, cur) => {
    if (!Object.keys(prev).includes(cur.parent)) {
      prev[cur.parent] = 0;
    }
    prev[cur.parent] += cur.filesize;
    return prev;
  }, ds);

  // handle subdirectories
  Object.keys(ds).forEach((d) => {
    if (d === "") {
      return;
    }
    let fsd = fs.filter(
      (f) => f.filetype == FILETYPES.directory && f.name === d
    )[0];
    while (fsd.parent !== "") {
      ds[fsd.parent] += ds[d];
      fsd = fs.filter(
        (f) => f.filetype == FILETYPES.directory && f.name === fsd.parent
      )[0];
    }
  });

  return ds;
};

rl.on("line", (line: string) => {
  if (line.startsWith("$ ")) {
    handleCommand(line.slice(2));
  } else {
    handleInfo(line);
  }
});

rl.once("close", () => {
  console.log(fs);
  const ds = dirSizes();
  console.log(ds);
  const smallDirs = Object.values(ds).filter((x) => x < 100000);
  console.log(smallDirs.reduce((a, b) => a + b, 0));
});
