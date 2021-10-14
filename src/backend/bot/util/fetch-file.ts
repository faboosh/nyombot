import fetch from "node-fetch";

export default async function fetchFile(url: string) {
  try {
    const res = await fetch(url);
    const buffer = res.buffer();
    return buffer;
  } catch (e) {
    throw e;
  }
}
