import { Client, Message } from "discord.js";

class Command {
  command: string;
  callback: Function;

  constructor(command: string, callback: Function) {
    this.command = command;
    this.callback = callback;
  }

  run(message: Message) {
    this.callback(message);
  }
}

class CommandHandler {
  client: Client;
  commands: Command[];
  leaderChar: string;
  constructor(client: Client) {
    this.client = client;
    this.commands = [];
    this.leaderChar = "!";
  }

  on(command: string, callback: Function) {
    this.commands.push(new Command(command, callback));
  }

  _handleCallback(message: Message, command: Command) {
    const cmdRegex = new RegExp(`${this.leaderChar}${command.command}`);
    if (cmdRegex.test(message.content)) {
      const args = message.content
        .split(" ")
        .filter((str: string) => !cmdRegex.test(str));
      command.callback(message, args);
    }
  }

  listen() {
    this.client.on("messageCreate", (message: Message) => {
      if (message.author.bot) return;

      this.commands.forEach((command) =>
        this._handleCallback(message, command)
      );
    });
  }
}

export default CommandHandler;
