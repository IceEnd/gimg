import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

interface IOptions {
  size: string;
  text?: string;
  out?: string;
  type: 'jpg' | 'jpeg' | 'png' | 'gif' | 'svg';
  background?: string;
  color?: string;
}

interface IImageInfo {
  width: number;
  height: number;
  text: string;
  outpath: string;
  name: string;
  type: 'jpg' | 'jpeg' | 'png' | 'gif' | 'svg';
  background: string;
  color: string;
}

interface ISize {
  width: number;
  height: number;
}

interface InterfaceCanvas {
  width: number;
  height: number;
  text: string;
  outpath: string;
  name: string;
  filetype: string;
  background: string;
  color: string;
}

export default class Canvas implements InterfaceCanvas {
  public width = 200;
  public height = 200;
  public name = 'image';
  public text = '';
  public outpath = './';
  public filetype = 'png';
  public background = '#000000';
  public color = '#ffffff';
  public canvas;
  public scale = 1;

  constructor(name: string, options: IOptions) {
    this.fromatOptions(name, options);
  }

  public genarator() {
    const checked = this.preCheck();
    const { name, filetype } = this;
    if (checked) {
      this.drawImage();
    } else {
      inquirer
        .prompt([{
          name: 'overwrite',
          message: `Overwrite ${name}.${filetype}?`,
          type: 'confirm',
        }])
        .then((answers: any) => {
          if (answers.overwrite) {
            this.drawImage();
          }
        });
    }
  }

  /**
   * draw image
   */
  public drawImage() {
    const { width, height, background, text, color } = this;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // this.fixCanvas(ctx);

    // draw background
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    // draw text
    const textLength = text.length;
    const maxWidth = width * 0.8;
    const maxHeight = height * 0.8;
    let fontSize = Math.floor(maxWidth / textLength);
    if (fontSize > maxHeight) {
      fontSize = maxHeight;
    }
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = color;
    const textWidth = ctx.measureText(text).width;
    const textX = (width - textWidth) / 2;
    const textY = (height + fontSize) / 2;
    ctx.fillText(text, textX, textY);

    const base64 = canvas.toDataURL();
    this.saveImage(base64);
  }

  public saveImage(base64) {
    const { outpath, name, filetype } = this;
    const file = `${outpath}/${name}.${filetype}`;
    const data = base64.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(file, data, { encoding: 'base64' });
  }

  /**
   * check has file
   */
  public preCheck() {
    const { outpath, name, filetype } = this;
    const file = `${outpath}/${name}.${filetype}`;
    if (fs.existsSync(file)) {
      return false;
    }
    return true;
  }

  /**
   * Get image width & heigth
   * @param String size image size, like 200x200
   */
  public getSize(size: string = '200x200'): ISize {
    let width = '200';
    let height = '200';
    if (size && /^\d+x\d+$/.test(size)) {
      [width, height] = size.toLocaleLowerCase().split('x');
    }
    return {
      height: parseInt(height, 10),
      width: parseInt(width, 10),
    };
  }

  /**
   * format data
   */
  public fromatOptions(name: string = 'image', options: IOptions) {
    const { size, text, out, type, background, color } = options;
    const { width, height } = this.getSize(size);
    this.width = width;
    this.height = height;
    this.name = name;
    this.text = text || size;
    this.filetype = type || 'png';
    this.outpath = this.getPath(out || './');
    this.background = background || '#000000';
    this.color = color || '#ffffff';
  }

  /**
   * get out path
   * @param String out input out path
   */
  public getPath(out: string): string {
    if (/^\//.test(out)) { // absolute path
      return out;
    }
    return path.resolve(process.cwd(), out.replace(/\/$/, ''));
  }
}
