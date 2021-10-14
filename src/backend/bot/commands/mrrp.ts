import { Message } from "discord.js";

function mrrp(message: Message) {
  message.channel.send({ content: "mrrp" });
}

export default mrrp;
