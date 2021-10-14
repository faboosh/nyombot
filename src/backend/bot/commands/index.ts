import nyom from "./nyom";
import mrrp from "./mrrp";
import bonk from "./bonk";
import idiot from "./idiot";

const commands: [command: string, callback: Function][] = [
  ["nyom", nyom],
  ["mrrp", mrrp],
  ["bonk", bonk],
  ["idiot", idiot],
];

export default commands;
