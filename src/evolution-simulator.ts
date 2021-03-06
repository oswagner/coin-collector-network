import { Labyrinth, SpaceType, Point } from "./labyrinth"
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
    private pathToExit?: Point[]

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

        console.log("Parâmetros de execução");
        console.log("Tamanho da população: " + this.populationSize);
        console.log("Quantidade de genes: " + this.genesCount);
        console.log("Chance de mutação: " + this.mutationChance*100 + "%");
        console.log("Limite de Gerações: " + this.generationsLimit);
        console.log("\n\n");
        
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

            if (this.currentGeneration % this.printInterval == 0) {
                console.log("Geração " + this.currentGeneration + ", melhor score = " + this.population[0].score);
                // console.log("Seus genes são: " + this.population[0].genes);
                
            }

            this.crossover();
            this.mutate();

            this.currentGeneration++;
        }

        console.log("Mapa do Labirinto:")
        this.labyrinth.printPath();

        if (this.pathToExit != null) {
            console.log("Último caminho encontrado:")
            this.labyrinth.printPath(this.pathToExit);
        }
    }

    private applyFitnessFunction() {
        this.population.forEach(chromosome => {
            this.assignScore(chromosome);
        });
    }

    private assignScore(chromosome: Chromosome) {

        const agent = new Agent(this.labyrinth);
        let agentSpace: SpaceType;
        let preProcessedNeighbors = agent.getNeighbors().map(n => (n + 1)/10);
        let network = new Network("antes do while", chromosome.genes.slice());
        let nextStepDirection = network.run(preProcessedNeighbors.slice());
        let walkedSpaces = new Set<Point>();
        let path = [];

        let step = 0;
        
        while (step < 100) {
            agent.move(nextStepDirection);
            agentSpace = agent.getSpaceType();
            path.push(agent.getPosition().x + ", " + agent.getPosition().y + "  |  " + agent.getSpaceType() + "  |  " + preProcessedNeighbors);

            if (agentSpace == SpaceType.Floor) {
                // if (!walkedSpaces.has(agent.getPosition()))
                    chromosome.score += 5;
            } else if (agentSpace == SpaceType.CoinBag) {
                // if (!walkedSpaces.has(agent.getPosition())){
                    chromosome.score += 100;
                    this.labyrinth.pickCoinBagAt(agent.getPosition());
                // }
            } else if (agentSpace == SpaceType.Wall) {
                chromosome.score -= 20;
                const distanceToExit = this.labyrinth.manhattanDistance(this.labyrinth.exit, agent.getPosition());
                if (distanceToExit < 20)
                    chromosome.score += (20 - distanceToExit) * 7.5;
                break;
            } else if (agentSpace == SpaceType.Exit) {
                chromosome.score += 250;
                this.pathToExit = Array.from(walkedSpaces);
                break;
            }

            walkedSpaces.add({x: agent.getPosition().x, y: agent.getPosition().y});
            preProcessedNeighbors = agent.getNeighbors().map(n => (n + 1)/10);
            nextStepDirection = network.run(preProcessedNeighbors.slice());
            step++;
        }
        this.labyrinth.resetCoinBags();
    }

    /**
     * Gera a próxima geração da população preservando o indivíduo com melhor score
     */
    private crossover() {

        let elite = this.population.shift()!;
        elite.score = 0;
        let newPopulation: Chromosome[] = [];

        while (newPopulation.length < this.populationSize - 1) {
            let fatherIndex = Math.floor(Math.random() * this.population.length);
            let motherIndex = Math.floor(Math.random() * this.population.length);
            while (motherIndex == fatherIndex) {
                motherIndex = Math.floor(Math.random() * this.population.length);
            }

            let father = this.population[fatherIndex];
            let mother = this.population[motherIndex];
            let children = this.makeChildren(father, mother);

            newPopulation.push(children);
        }

        if (newPopulation.length > this.populationSize) {
            newPopulation.pop();
        }

        this.population = newPopulation;
        this.population.unshift(elite);
    }

    /**
     * 
     * @param father cromossomo pai
     * @param mother cromossomo mãe
     * 
     * @returns um cromosomo a partir da média aritmética dos valores dos genes da mãe e do pai
     */
    private makeChildren(father: Chromosome, mother: Chromosome): Chromosome {
        let child: number[] = [];

        for (let index = 0; index < this.genesCount; index++) {
            child.push((father.genes[index] + mother.genes[index]) / 2);
        }
        return new Chromosome(child);
    }


    /**
     * Dá a chance de ocorrer mutação em 1 gene em 10% da população
     */
    private mutate() {
        if (Math.random() <= this.mutationChance) {
            this.population.forEach((chromosome, i) => {
                if (i != 0)
                chromosome.genes.forEach((gene, j) => {
                    chromosome.genes[j] = Math.random();
                });
            });
        }
    }

}