import {Labyrinth} from "./labyrinth"
import {Chromosome} from "./chromosome"

export class EvolutionSimulator {
    
    private labyrinth?: Labyrinth;
    private generationsLimit?: number;
    private stopsWhenConverging: boolean = false;
    // Intervalo de gerações para logar na tela as informações atuais
    private printInterval: number = 1;
    private currentGeneration: number = 0;
    private population: Chromosome[];

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

        for (let i = 0; i < populationSize; i++)
            this.population.push(new Chromosome(40));
    }

    public run() {

        

    }

}