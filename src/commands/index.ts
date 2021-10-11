import nyom from "./nyom";
import mrrp from "./mrrp";

const commands: [command: string, callback: Function][] = [
  ["nyom", nyom],
  ["mrrp", mrrp],
];

export default commands;
