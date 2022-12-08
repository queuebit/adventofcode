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

const handleCommand = (command: string) => {
  // console.log(`COMMAND: ${command}`);
  if (command.startsWith("cd")) {
    const [_, path] = command.split(" ");
    activeCommand = COMMANDS.cd;
    if (path === "..") {
      wd = findParent(wd);
    } else {
      wd = path;
    }
  } else if (command.startsWith("ls")) {
    activeCommand = COMMANDS.ls;
  }
  if (command.includes("zdvj")) {
    console.log(`DEBUG: ${command} -- wd: ${wd}`);
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
      console.log(info);
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
  console.log(fsInfo("zdvj"));
  console.log(fsChildren("zdvj"));
  Object.keys(ds).forEach((d) => {
    if (d === "") {
      return;
    }
    let fsd = Array.from(fs).filter(
      (f) => f.filetype == FILETYPES.directory && f.name === d
    )[0];
    while (fsd.parent !== "") {
      if (d === "gbzfpfq") {
        console.log(ds[d]);
      }
      ds[fsd.parent] += ds[d];
      fsd = Array.from(fs).filter(
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
  // console.log(JSON.stringify(fs.filter((f) => f.filetype === FILETYPES.file)));
  // console.log(
  //   JSON.stringify(fs.filter((f) => f.filetype === FILETYPES.directory))
  // );
  // console.log(fs.length);
  const ds = dirSizes();
  console.log(ds);
  const smallDirs = Object.values(ds).filter((x) => x < 100000);
  console.log(smallDirs);
  console.log(smallDirs.reduce((a, b) => a + b, 0));
  /* That's not the right answer; your answer is too low.
  If you're stuck, make sure you're using the full input data; there are also some general tips on the about page, 
  or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 774391.) */
  /* That's not the right answer; your answer is too low.
  If you're stuck, make sure you're using the full input data; there are also some general tips on the about page,
  or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 756536.) [Return to Day 7] */
  /* That's not the right answer; your answer is too low.
  If you're stuck, make sure you're using the full input data; there are also some general tips on the about page,
  or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 450644.) [Return to Day 7] */
});
