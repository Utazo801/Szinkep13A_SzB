export default class SzinKod {
    private _piros: number;
    private _zold: number;
    private _kek: number;

    public get piros(): number {
        return this._piros;
    }
    public get zold(): number {
        return this._zold;
    }
    public get kek(): number {
        return this._kek;
    }

    constructor(sor: string) {
        const adatok: string[] = sor.split(" ");
        this._piros = parseInt(adatok[0]);
        this._zold = parseInt(adatok[1]);
        this._kek = parseInt(adatok[2]);
    }
}
