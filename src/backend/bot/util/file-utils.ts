import { MessageAttachment } from "discord.js";

export function attachmentFromDataURI(
  uri: string,
  name: string
): MessageAttachment {
  const uriData = uri.match(/^data:.+\/(.+);base64,(.*)$/)![2];
  const attachment = new MessageAttachment(Buffer.from(uriData, "base64"));
  attachment.setName(name);

  return attachment;
}
