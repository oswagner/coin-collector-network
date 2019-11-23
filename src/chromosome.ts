export class Chromosome {

    public genes: number[];
    public score: number;

    constructor(genesCount: number) {
        this.genes = new Array(genesCount);
        this.score = 0;

        for (let i = 0; i < genesCount; i++)
            this.setRandomGeneAt(i);
    }

    public setRandomGeneAt(index: number) {
        if (index >= 0 && index < this.genes.length)
            this.genes[index] = Math.random();

}