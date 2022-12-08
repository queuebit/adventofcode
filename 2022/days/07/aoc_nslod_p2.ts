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
let wd = "";
let fs: FileInfo[] = [
  {
    name: "/",
    filetype: FILETYPES.directory,
    filesize: 0,
    parent: "",
  },
];

const fsInfo = (d: string) => {
  return Array.from(fs).filter((f) => f.name === d);
};
const fsChildren = (p: string) => {
  return Array.from(fs).filter((f) => f.parent === p);
};
const findParent = (wd: string) => {
  const fsParent = Array.from(fs).filter(
    (f) => f.filetype == FILETYPES.directory && f.name === wd
  );
  if (fsParent.length === 0) {
    // console.log(fs.filter((f) => f.filetype === FILETYPES.directory));
    return fsParent[0].parent;
  } else {
    return fsParent[0].parent;
  }
};

const isInFS = (name: string, filetype: number, parent: string) => {
  return (
    Array.from(fs).filter(
      (f) => f.name === name && f.filetype === filetype && f.parent === parent
    ).length > 0
  );
};

const parentPath = (p: string) => {
  if (p === "/") return "";
  let pathComponents = p.split("/");
  pathComponents.pop();
  console.log(pathComponents);
  if (pathComponents.length === 1 && pathComponents[0] === "") {
    return "/";
  } else {
    return pathComponents.join("/");
  }
};
const handleCommand = (command: string) => {
  // console.log(`COMMAND: ${command}`);
  if (command.startsWith("cd")) {
    const [_, path] = command.split(" ");
    activeCommand = COMMANDS.cd;
    if (path === "..") {
      wd = parentPath(wd);
    } else if (path === "/") {
      wd = "/";
    } else {
      wd += wd === "/" ? path : `/${path}`;
    }
  } else if (command.startsWith("ls")) {
    activeCommand = COMMANDS.ls;
  }
};

const handleInfo = (info: string) => {
  // console.log(`INFO: ${info}`);
  if (activeCommand === COMMANDS.cd) {
    console.warn("SYNTAX ERROR");
  } else if (activeCommand === COMMANDS.ls) {
    if (info.startsWith("dir")) {
      const [_, dirName] = info.split(" ");
      if (!isInFS(dirName, FILETYPES.directory, wd)) {
        fs.push({
          name: dirName,
          filetype: FILETYPES.directory,
          filesize: 0,
          parent: wd,
        });
      }
    } else {
      const [strSize, filename] = info.split(" ");
      if (!isInFS(filename, FILETYPES.file, wd)) {
        const filesize = Number(strSize);
        fs.push({
          name: filename,
          filetype: FILETYPES.file,
          filesize: filesize,
          parent: wd,
        });
      }
    }
  }
};

const dirSizes = () => {
  let ds: { [key: string]: number } = {};

  // handle files
  Array.from(fs).reduce((prev, cur) => {
    if (!Object.keys(prev).includes(cur.parent)) {
      prev[cur.parent] = 0;
    }
    prev[cur.parent] += cur.filesize;
    return prev;
  }, ds);

  // handle subdirectories
  // console.log(fsInfo("zdvj"));
  // console.log(fsChildren("zdvj"));
  console.log(ds);
  Object.keys(ds).forEach((d) => {
    if (d === "") {
      return;
    }
    let pp = parentPath(d);
    console.log({ d, pp });
    while (pp !== "") {
      ds[pp] += ds[d];
      pp = parentPath(pp);
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
  // console.log(JSON.stringify(fs.filter((f) => f.filetype === FILETYPES.file)));
  // console.log(
  //   JSON.stringify(fs.filter((f) => f.filetype === FILETYPES.directory))
  // );
  console.log(fs.length);
  const ds = dirSizes();
  console.log(ds);
  const smallDirs = Object.values(ds).filter((x) => x < 100000);
  console.log(smallDirs);
  console.log(smallDirs.reduce((a, b) => a + b, 0));

  const DISK_SIZE = 70000000;
  const SPACE_NEEDED = 30000000;
  const FREE_SPACE = DISK_SIZE - ds["/"];
  console.log(FREE_SPACE > SPACE_NEEDED);
  console.log(FREE_SPACE);

  const dirOrder: [d: string, f: number][] = Object.keys(ds).map((d) => {
    return [d, ds[d]];
  });
  console.log(dirOrder);
  const sDirs = dirOrder.sort((a, b) => a[1] - b[1]);
  console.log(sDirs);

  const makeRoom = sDirs.filter(
    ([name, size]) => FREE_SPACE + size > SPACE_NEEDED
  );
  console.log(makeRoom[0]);
});
