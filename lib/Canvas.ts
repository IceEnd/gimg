import { createCanvas, loadImage } from 'canvas';

interface IOptions {
  size: string;
  text?: string;
  out?: string;
}

interface IImageInfo {
  width: number;
  height: number;
  text: string;
  path: string;
  name: string;
  type: 'jpg' | 'jpeg' | 'png' | 'gif' | 'svg';
}

export default function canvas(name: string, options: IOptions) {
  const imageInfo: IImageInfo = fromatOptions(name, options);
}

/**
 * format data
 */
export function fromatOptions(name: string, options: IOptions): IImageInfo {
  const res: IImageInfo = {};
  return res;
}

/**
 * Get image width & heigth
 * @param String size image size, like 100x100
 */
export function getSize(size: string) {
}
