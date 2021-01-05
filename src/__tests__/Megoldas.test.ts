import Megoldas from "../Megoldas";
import fs from "fs";

describe("Megoldás osztály unit tesztek", () => {
    const megoldas: Megoldas = new Megoldas("kep.txt");
    it("Megoldás osztálypéldány ellenőrzése", async () => {
        expect(megoldas).toBeInstanceOf(Megoldas);
    });
    it("Színkód keresés", async () => {
        expect(megoldas.SzinkodKeres(200, 96, 64)).toBe(true);
        expect(megoldas.SzinkodKeres(69, 96, 64)).toBe(false);
    });
    it("Adott szín számának megkeresése", async () => {
        expect(megoldas.SzinSzam[0]).toBe(29);
        expect(megoldas.SzinSzam[1]).toBe(50);
    });
    it("Leggyakoribb szín", async () => {
        expect(megoldas.legtobbSzin).toBe("Kék");
    });
    it("Kép keretének létrehozása", async () => {
        expect(megoldas.Rajz()).toBe("A kép módosult 3 pixel széles fekete kerettel");
    });
    it("Fájlok összehasonlítása", async () => {
        expect(fs.readFileSync("keretes.txt").toString()).toBe(fs.readFileSync("keretesOH.txt").toString());
    });
    it("Sárga téglalap", async () => {
        expect(megoldas.Sarga()).toBe("Kezdete: 31,12\nVége: 41,21\nKéppontok Száma: 110");
    });
});
