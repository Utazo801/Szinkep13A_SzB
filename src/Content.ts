import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from "./Megoldas";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Színkód13A_SzabóBence</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->
        res.write("1. feladat: fájl beolvasása\n");
        const megold: Megoldas = new Megoldas("kep.txt");
        res.write("\n2. feladat\n");
        let piros: number = parseInt(params.piros as string);
        if (isNaN(piros)) piros = 200;

        res.write(`Kérem a piros szín kodját: <input type='number' name='piros' value=${piros} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        let zold: number = parseInt(params.zold as string);
        if (isNaN(zold)) zold = 96;

        res.write(`Kérem a zöld szín kodját: <input type='number' name='zold' value=${zold} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        let kek: number = parseInt(params.kek as string);
        if (isNaN(kek)) kek = 64;

        res.write(`Kérem a kék szín kodját: <input type='number' name='kek' value=${kek} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        res.write(`Keresett színkód: ${piros} ${zold} ${kek}`);

        res.write(`${megold.SzinkodKeres(piros, zold, kek) ? "\nVolt ilyen szín a képen" : "\nNem volt ilyen szín a képen"}\n`);

        res.write("\n3. feladat\nKeresett szín koordinátája: [35,8]\n");
        res.write(`Sorban ${megold.SzinSzam[0]} Oszlopban: ${megold.SzinSzam[1]}\n`);

        res.write("\n4. feladat:\nLeggyakoribb szín:\n");
        res.write(`${megold.legtobbSzin}\n`);

        res.write("\n5. feladat:\nKeret hozzáadása: \n");
        res.write(`${megold.Rajz()}\n`);

        res.write(`\n6. feladat: \nFájlba írás\n${megold.FajlbaIras("keretes.txt")}\n`);
        res.write(`\n7. feladat: \nSárga téglalap\n${megold.Sarga()}\n`);
        res.write("<br/>");
        res.write("<a href='https://github.com/Utazo801/Szinkep13A_SzB' target='_blank'>Github</a>");
        // <---- Fejezd be a kódolást>

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
