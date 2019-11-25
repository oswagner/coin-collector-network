import { Labyrinth } from "./labyrinth"
import { Chromosome } from "./chromosome"

export class EvolutionSimulator {

    private labyrinth?: Labyrinth;
    private generationsLimit?: number;
    private stopsWhenConverging: boolean = false;
    // Intervalo de gerações para logar na tela as informações atuais
    private printInterval: number = 1;
    private bestScores?: number[];
    private currentGeneration: number = 0;
    private population: Chromosome[];
    private populationSize: number;

    constructor(
        populationSize: number,
        labyrinth: Labyrinth,
        printInterval: number = 1,
        generationsLimit?: number,
        stopsWhenConverging: boolean = true
    ) {
        this.generationsLimit = generationsLimit;
        this.stopsWhenConverging = stopsWhenConverging;
        this.labyrinth = labyrinth;
        this.population = [];
        this.printInterval = printInterval;
        this.populationSize = populationSize;

        for (let i = 0; i < populationSize; i++)
            this.population.push(new Chromosome(40));

        if (stopsWhenConverging) 
            this.bestScores = new Array(5);
    }

    public run() {
        while (this.currentGeneration != this.generationsLimit) {

            this.applyFitnessFunction();
            this.crossover();
            this.mutate();

            if (this.stopsWhenConverging) {
                // TODO: Adiciona o melhor score da geração ao final
                this.bestScores!.push();
                // Remove o primeiro elemento
                this.bestScores!.shift();

                let isConverging = true;
                let firstScore = this.bestScores![0];
                this.bestScores!.forEach(score => {
                    isConverging = isConverging && firstScore == score;
                });

                if (isConverging) {
                    console.log("Os scores estão convergindo");
                    break
                }
            }

            this.currentGeneration++;
        }
    }

    private applyFitnessFunction() {

    }

    private crossover() {
        this.population.sort((chromosomeA, chromosomeB) => {
            return chromosomeB.score - chromosomeA.score;
        })

        let elite = this.population.shift();
        let newPopulation: Chromosome[] = [];

        while (newPopulation.length < this.populationSize) {
            let fatherIndex = Math.floor(Math.random() * this.population.length);
            let motherIndex = Math.floor(Math.random() * this.population.length);
            while (motherIndex == fatherIndex) {
                motherIndex = Math.floor(Math.random() * this.population.length);
            }

            let father = this.population[fatherIndex];
            let mother = this.population[motherIndex];



        }
        
    }

    private reproduce(father: Chromosome, mother: Chromosome): Chromosome[] {
        let mask = 
    }

    private mutate() {

    }

}