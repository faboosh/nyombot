import nyom from "./nyom";
import mrrp from "./mrrp";
import bonk from "./bonk";

const commands: [command: string, callback: Function][] = [
  ["nyom", nyom],
  ["mrrp", mrrp],
  ["bonk", bonk],
];

export default commands;
