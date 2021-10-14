import { Message } from "discord.js";
import { join } from "path";
import { MessageEmbed, MessageAttachment } from "discord.js";
import { createCanvas, loadImage } from "canvas";

import { MemeCanvas } from "../util/canvas-utils";

async function idiot(message: Message, args: string[]) {
  const templatePath = join(
    __dirname,
    "../../../../public/templates/idiot.png"
  );
  const template = await loadImage(templatePath);
  const canvas = new MemeCanvas(template.width, template.height, message);

  const text = args.join(" ");

  canvas.setFont("Impact", 3);
  canvas.setTextAlign("center");
  canvas.drawImage(template, 0, 0, 100);
  canvas.drawTextBox(text, 25, 58, 48);

  const file = await canvas.toMessageAttachment("idiot");

  const embed = new MessageEmbed().setImage(`attachment://${file.name}`);
  message.channel.send({ embeds: [embed], files: [file] });
}

export default idiot;
