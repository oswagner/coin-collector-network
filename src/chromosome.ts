export class Chromosome {

    public genes: number[];
    public score: number;

    /**
     * 
     * @param genes pode ser number ou number[]. Caso seja number, inicia um array 
     * de genes com esse tamanho e com valores aleatórios. Caso seja number[], atribui
     * esse mesmo array a this.genes
     */
    constructor(genes: number | number[]) {
        if (typeof (genes) === "number") {
            this.genes = new Array(genes);
            for (let i = 0; i < genes; i++)
                this.setRandomGeneAt(i);
        } else {
            this.genes = genes;
        }
        this.score = 0;
    }

    public setRandomGeneAt(index: number) {
        if (index >= 0 && index < this.genes.length)
            this.genes[index] = Math.random();
    }

}