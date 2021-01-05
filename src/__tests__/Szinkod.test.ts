import SzinKod from "../SzinKod";

describe("Színkód feladatsor unit tesztek", () => {
    const Pixel1: SzinKod = new SzinKod("200 96 0");
    const Pixel2: SzinKod = new SzinKod("100 156 79");

    it("Színkód osztálypéldány ellenőrzése:", async () => {
        expect(Pixel1).toBeInstanceOf(SzinKod);
        expect(Pixel2).toBeInstanceOf(SzinKod);
    });
});
