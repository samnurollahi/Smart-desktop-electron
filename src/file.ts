import { readFile, writeFile } from "fs";
import path from "path";

export class DataBase {
  static set(
    data: {
      keys: string;
      keyB: string;
      filePath: string;
    },
    callback: (err: Error | null) => void
  ) {
    readFile(path.join(__dirname, "..", "shortCut.json"), (err, d) => {
      if (err) {
        console.log(err);
      } else {
        const content: any[] = JSON.parse(d.toString());
        content.push(data);

        writeFile(
          path.join(__dirname, "..", "shortCut.json"),
          JSON.stringify(content),
          (err) => {
            callback(err);
          }
        );
      }
    });
  }

  static gets(callback: (err: Error | null, data: any[] | null) => void) {
    readFile(path.join(__dirname, "..", "shortCut.json"), (err, d) => {
      if (err) callback(err, null);
      else callback(null, JSON.parse(d.toString()));
    });
  }

  static remove(
    keys: string,
    keyB: string,
    callback: (err: Error | null) => void
  ) {
    readFile(path.join(__dirname, "..", "shortCut.json"), (err, d) => {
      if (err) console.log(err);
      else if (d) {
        let data: any[] = JSON.parse(d.toString());

        data = data.filter((item) => {
          return item.keys == keys && item.keyB == keyB ? false : item;
        });


        writeFile(
          path.join(__dirname, "..", "shortCut.json"),
          JSON.stringify(data),
          (err) => {
            callback(err);
          }
        );
      }
    });
  }
}
