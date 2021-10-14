import { Message } from "discord.js";
import { join } from "path";
import { MessageEmbed, MessageAttachment } from "discord.js";
import { createCanvas, loadImage } from "canvas";

import { MemeCanvas } from "../util/canvas-utils";

async function bonk(message: Message, args: string[]) {
  const width = 1280;
  const height = 720;
  const canvas = new MemeCanvas(width, height, message);
  const templatePath = join(__dirname, "../../../../public/templates/bonk.png");
  const template = await loadImage(templatePath);

  const subject = message.mentions.members?.first();
  const subjectName = subject?.nickname
    ? subject.nickname
    : subject?.user?.username;
  const fallbackSubject = args[0] ?? "";

  canvas.setFont("Impact", 8);
  canvas.drawImage(template, 0, 0, 100);
  canvas.drawText(
    `go to horny jail ${subjectName ? subjectName : fallbackSubject}`,
    8,
    16
  );

  if (subject) {
    await canvas.drawAvatar(subject, 70, 70, 15);
  }

  const file = await canvas.toMessageAttachment("bonk");

  const embed = new MessageEmbed().setImage(`attachment://${file.name}`);
  message.channel.send({ embeds: [embed], files: [file] });
}

export default bonk;
