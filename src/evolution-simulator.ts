import { Labyrinth, SpaceType } from "./labyrinth"
import { Chromosome } from "./chromosome"
import { Network } from "./neural_network/network";
import { Direction, Agent } from "./agent";

export class EvolutionSimulator {

    private readonly genesCount = 40;

    private population: Chromosome[];
    private populationSize: number;
    private generationsLimit?: number;
    private mutationChance: number;

    private labyrinth: Labyrinth;
    private stopsWhenConverging: boolean = false;
    // Intervalo de gerações para logar na tela as informações atuais
    private printInterval: number = 1;
    private bestScores?: number[];
    private currentGeneration: number = 0;

    constructor(
        populationSize: number,
        labyrinth: Labyrinth,
        mutationChance: number,
        printInterval: number = 1,
        generationsLimit?: number,
        stopsWhenConverging: boolean = true,
    ) {
        this.generationsLimit = generationsLimit;
        this.stopsWhenConverging = stopsWhenConverging;
        this.labyrinth = labyrinth;
        this.population = [];
        this.printInterval = printInterval;
        this.populationSize = populationSize;
        this.mutationChance = mutationChance;

        for (let i = 0; i < populationSize; i++)
            this.population.push(new Chromosome(this.genesCount));

        if (stopsWhenConverging)
            this.bestScores = new Array(10);
    }

    public run() {
        while (this.currentGeneration != this.generationsLimit) {

            this.applyFitnessFunction();

            this.population.sort((chromosomeA, chromosomeB) => {
                return chromosomeB.score - chromosomeA.score;
            })

            if (this.stopsWhenConverging) {
                // Adiciona o melhor score da geração ao final do array de bestScores
                this.bestScores!.push(this.population[0].score);
                // Remove o primeiro elemento
                this.bestScores!.shift();

                let isConverging = true;
                let firstScore = this.bestScores![0];
                this.bestScores!.forEach(score => {
                    isConverging = isConverging && firstScore == score;
                });

                if (isConverging) {
                    console.log("Geração " + this.currentGeneration + ", os scores estão convergindo para " + this.bestScores![0]);
                    break
                }
            }

            if (this.currentGeneration % this.printInterval == 0)
                console.log("Geração " + this.currentGeneration + ", melhor score = " + this.population[0].score);

            this.crossover();
            this.mutate();

            this.currentGeneration++;
        }
    }


    private applyFitnessFunction() {
        this.population.forEach(chromosome => {

            const agent = new Agent(this.labyrinth);
            let agentSpace: SpaceType;
            let preProcessedNeighbors = agent.getNeighbors().map(n => n.spaceType + 1);
            let network = new Network("Rede antes do while", chromosome.genes);
            let nextStepDirection = network.run(preProcessedNeighbors);

            let steps = 0;
            while (steps < 200) {
                agent.move(nextStepDirection);
                agentSpace = agent.getSpaceType();

                if (agentSpace == SpaceType.Floor) {
                    chromosome.score += 1;
                } else if (agentSpace == SpaceType.CoinsBag) {
                    chromosome.score += 50;
                } else if (agentSpace == SpaceType.Wall) {
                    chromosome.score -= 20;
                    const distanceToExit = this.labyrinth.manhattanDistance(this.labyrinth.exit, agent.getPosition());
                    if (distanceToExit > 10)
                        chromosome.score += (10 - distanceToExit) * 10;
                    break;
                } else if (agentSpace == SpaceType.Exit) {
                    chromosome.score += 250;
                    break;
                }

                preProcessedNeighbors = agent.getNeighbors().map(n => n.spaceType + 1);
                nextStepDirection = network.run(preProcessedNeighbors);
                steps++;
            }
        });
    }

    /**
     * Gera a próxima geração da população preservando o indivíduo com melhor score
     */
    private crossover() {

        let elite = this.population.shift()!;
        elite.score = 0;
        let newPopulation: Chromosome[] = [elite];

        while (newPopulation.length < this.populationSize) {
            let fatherIndex = Math.floor(Math.random() * this.population.length);
            let motherIndex = Math.floor(Math.random() * this.population.length);
            while (motherIndex == fatherIndex) {
                motherIndex = Math.floor(Math.random() * this.population.length);
            }

            let father = this.population[fatherIndex];
            let mother = this.population[motherIndex];
            let children = this.makeChildren(father, mother);

            newPopulation.push(children.pop()!);
            newPopulation.push(children.pop()!);
        }

        if (newPopulation.length > this.populationSize) {
            newPopulation.pop();
        }

        this.population = newPopulation;
    }

    /**
     * 
     * @param father cromossomo pai
     * @param mother cromossomo mãe
     * 
     * @returns um array com 2 cromossomos gerados usando máscara binária entre o pai e a mãe
     */
    private makeChildren(father: Chromosome, mother: Chromosome): Chromosome[] {
        let child1: number[] = [];
        let child2: number[] = [];
        for (let index = 0; index < this.genesCount; index++) {
            let bit = Math.random() > 0.5;
            if (bit) {
                child1.push(father.genes[index]);
                child2.push(mother.genes[index]);
            } else {
                child1.push(mother.genes[index]);
                child2.push(father.genes[index]);
            }
        }
        return [new Chromosome(child1), new Chromosome(child2)];
    }


    /**
     * Dá a chance de ocorrer mutação em 1 gene de 1 cromossomo
     */
    private mutate() {
        if (Math.random() <= this.mutationChance) {
            let randomChromosome = Math.floor(Math.random() * this.populationSize);
            let randomGene = Math.floor(Math.random() * this.genesCount);
            this.population[randomChromosome].setRandomGeneAt(randomGene);
        }
    }

}