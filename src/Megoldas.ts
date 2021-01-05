import fs from "fs";
import SzinKod from "./SzinKod";

export default class Megoldas {
    private readonly _kep: SzinKod[][];

    // 2. feladat
    public SzinkodKeres(piros: number, zold: number, kek: number): boolean {
        let talalat: boolean = false;
        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++) {
                if (this._kep[i][j].piros === piros && this._kep[i][j].zold === zold && this._kep[i][j].kek === kek) {
                    talalat = true;
                }
            }
        }
        return talalat;
    }
    // 3. feladat

    public get SzinSzam(): number[] {
        let sordb: number = 0;
        let oszlopdb: number = 0;
        const keresett = this._kep[35 - 1][8 - 1];
        for (let i = 0; i < 50; i++) {
            if (this.PixelHasonlit(keresett, this._kep[35 - 1][i])) sordb++;
            if (this.PixelHasonlit(keresett, this._kep[i][8 - 1])) oszlopdb++;
        }
        return [sordb, oszlopdb];
    }
    // 4. feladat
    public get legtobbSzin(): string {
        let szin: string = "";
        const maxErtek: number[] = new Array(3).fill(0);
        let maxIndex: number = 0;
        const Piros: SzinKod = new SzinKod("255 0 0");
        const Zold = new SzinKod("0 255 0");
        const Kek = new SzinKod("0 0 255");

        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++) {
                if (this.PixelHasonlit(Piros, this._kep[i][j])) {
                    maxErtek[1]++;
                }
                if (this.PixelHasonlit(Zold, this._kep[i][j])) {
                    maxErtek[2]++;
                }
                if (this.PixelHasonlit(Kek, this._kep[i][j])) {
                    maxErtek[3]++;
                }
            }
        }
        // console.log(` Piros: ${maxErtek[0]}  Zöld:${maxErtek[1]} Kék: ${maxErtek[2]}`);
        for (let i = 0; i < maxErtek.length; i++) {
            if (maxErtek[i] > maxErtek[maxIndex]) {
                maxIndex = i;
            }
        }
        switch (maxIndex) {
            case 0:
                szin = "Vörös";
                break;
            case 1:
                szin = "Zöld";
                break;
            case 2:
                szin = "Kék";
                break;
            default:
                break;
        }
        return szin;
    }
    // 1. feladat
    constructor(forras: string) {
        this._kep = [];
        const adatok: string[] = fs.readFileSync(forras).toString().split("\n");

        const Pixelek: SzinKod[] = [];
        adatok.forEach(adat => {
            Pixelek.push(new SzinKod(adat.trim()));
        });
        for (let x = 0; x < 50; x++) {
            this._kep[x] = [];
            for (let y = 0; y < 50; y++) {
                this._kep[x][y] = Pixelek[x * 50 + y];
            }
        }
        // console.log(this._kep);
    }
    public PixelHasonlit(a: SzinKod, b: SzinKod): boolean {
        return a.piros === b.piros && a.zold === b.zold && a.kek === b.kek;
    }
    // 5. feladat
    public Rajz(): string {
        let szöveg: string = "";
        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++) {
                if (i < 3 || i > 46 || j < 3 || j > 46) {
                    this._kep[i][j] = new SzinKod("0 0 0");
                }
            }
        }
        const Pixel = new SzinKod("0 0 0");
        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++) {
                if (this.PixelHasonlit(Pixel, this._kep[i][j])) {
                    szöveg = "A kép módosult 3 pixel széles fekete kerettel";
                } else szöveg = "Hiba";
            }
        }
        // console.log(this._kep);
        return szöveg;
    }
    // 6. feladat
    public FajlbaIras(Fajlnev: string): string {
        let uzenet: string = "";
        const file = fs.createWriteStream(Fajlnev);
        file.on("error", function (err) {
            console.log(err);
        });
        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++) {
                file.write(`${this._kep[i][j].piros} ${this._kep[i][j].zold} ${this._kep[i][j].kek}\r\n`);
            }
        }
        file.end();
        uzenet = "Sikeres mentés";
        return uzenet;
    }
    // 7. feladat
    public Sarga(): string {
        const SargaPixel: SzinKod = new SzinKod("255 255 0");
        let kezdetSor: number = 0;
        let kezdetOszlop: number = 0;
        for (let x = 0; x < 50; x++) {
            for (let y = 0; y < 50; y++) {
                if (this.PixelHasonlit(this._kep[x][y], SargaPixel)) {
                    kezdetSor = x + 1;
                    kezdetOszlop = y + 1;
                    while (this.PixelHasonlit(this._kep[x++][y], SargaPixel));
                    while (this.PixelHasonlit(this._kep[kezdetSor][y++], SargaPixel));
                    let tömör = true;
                    for (let x_c = kezdetSor - 1; x_c < x - 1; x_c++) {
                        for (let y_c = kezdetOszlop - 1; y_c < y - 1; y_c++) {
                            if (!this.PixelHasonlit(this._kep[x_c][y_c], SargaPixel)) {
                                console.log("Lyuk: ");
                                console.log(x_c);
                                console.log(y_c);

                                tömör = false;
                            }
                        }
                    }
                    if (tömör) return `Kezdete: ${kezdetSor},${kezdetOszlop}\nVége: ${x - 1},${y - 1}\nKéppontok Száma: ${(x - kezdetSor) * (y - kezdetOszlop)}`;
                }
            }
        }
        return "Nincs sárga objektum";
    }
}
