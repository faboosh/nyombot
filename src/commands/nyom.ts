import { Message } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { MessageAttachment, MessageEmbed } from "discord.js";

function nyom(message: Message, args: string[]) {
  const search = args[0];
  const basePath = join(__dirname, "../assets/nemo");
  const images = readdirSync(basePath).filter((name: string) => {
    if (!search) return true;
    const regex = new RegExp(search, "gi");
    return regex.test(name);
  });
  const imageName = images[Math.floor(images.length * Math.random())];

  if (imageName) {
    const file = new MessageAttachment(join(basePath, imageName));
    const embed = new MessageEmbed().setImage(`attachment://${imageName}`);

    message.channel.send({ embeds: [embed], files: [file] });
  } else {
    message.channel.send({ content: "No Nyom matched your search" });
  }
}

export default nyom;
