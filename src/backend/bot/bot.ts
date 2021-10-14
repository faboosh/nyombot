import initBot from "./init";
import CommandHandler from "./classes/command-handler";
import commands from "./commands/index";

const bot = initBot();
const c = new CommandHandler(bot);

commands.forEach(
  ([command, callback]: [command: string, callback: Function]) => {
    const wrappedCallback = (...args) => {
      console.log(`${command} ran with args:`, ...args);
      callback(...args);
    };
    c.on(command, wrappedCallback);
  }
);

c.listen();
