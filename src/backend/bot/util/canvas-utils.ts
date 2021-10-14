import {
  Canvas,
  createCanvas as createCanvasLib,
  Image,
  loadImage,
  NodeCanvasRenderingContext2D,
} from "canvas";
import { GuildMember, Message, MessageAttachment } from "discord.js";
import fetchFile from "../util/fetch-file";
import sharp from "sharp";
import { attachmentFromDataURI } from "./file-utils";

// export function createCanvas(width:number, height:number) {
//   const canvas = createCanvasLib(width, height);
//   const ctx = canvas.getContext("2d");

//   const percentW(percent:number) => width * (percent / 100)
//   const percentH(percent:number) => height * (percent / 100)

//   return {
//     canvas, ctx, percentW, percentH
//   }
// }

export class MemeCanvas {
  width: number;
  height: number;
  canvas: Canvas;
  ctx: NodeCanvasRenderingContext2D;
  message: Message;

  constructor(width: number, height: number, message: Message) {
    this.width = width;
    this.height = height;
    this.canvas = createCanvasLib(width, height);
    this.ctx = this.canvas.getContext("2d");
    this.message = message;
  }

  setFont(font: string = "Impact", sizePercent: number = 10) {
    this.ctx.font = `${this.percH(sizePercent)}px ${font}`;
  }

  percW(percent: number) {
    return this.width * (percent / 100);
  }

  percH(percent: number) {
    return this.height * (percent / 100);
  }

  drawText(text: string, x: number, y: number) {
    this.ctx.fillText(text, this.percW(x), this.percH(y));
  }

  async drawAvatar(
    guildMember: GuildMember,
    percentX: number,
    percentY: number,
    percentW: number
  ) {
    try {
      const url = guildMember.user.displayAvatarURL();
      const avatarWebpBuffer = await fetchFile(url);
      const avatarJpegBuffer = await sharp(avatarWebpBuffer).jpeg().toBuffer();
      const avatar = await loadImage(avatarJpegBuffer);
      this.drawImage(avatar, percentX, percentY, percentW);
    } catch (e) {
      console.error("Could not load avatar", e);
    }
  }

  drawImage(
    image: Image,
    percentX: number,
    percentY: number,
    percentW: number
  ) {
    const pxX = this.percW(percentX);
    const pxY = this.percH(percentY);
    const pxW = this.percW(percentW);
    const pxH = pxW * (image.height / image.width);
    console.log({
      pxX,
      pxY,
      pxH,
      pxW,
      aspect: image.height / image.width,
    });
    this.ctx.drawImage(image, pxX, pxY, pxW, pxH);
  }

  toMessageAttachment(name: string): Promise<MessageAttachment> {
    return new Promise((resolve, reject) => {
      this.canvas.toDataURL("image/jpeg", (err, jpeg) => {
        if (err) reject(err);
        if (typeof jpeg === "string") {
          const fileName = `${name}.jpeg`;
          const file = attachmentFromDataURI(jpeg, fileName);
          resolve(file);
        }
      });
    });
  }
}
