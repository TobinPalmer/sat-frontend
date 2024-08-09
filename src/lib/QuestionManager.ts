import Store, {type StorageType} from "$lib/Storage";
import {url} from "$lib/index";

export enum Difficulty {
    EASY = "Easy",
    MEDIUM = "Medium",
    HARD = "Hard"
}

export enum QuestionType {
    ALGEBRA = "Algebra",
    ADVANCED_MATH = "Advanced Math",
    GEOMETRY_AND_TRIGONOMETRY = "Geometry and Trigonometry",
    PROBLEM_SOLVING_AND_DATA_ANALYSIS = "Problem-Solving and Data Analysis"
}

interface GetQuestionOptions {
    difficulty: Difficulty
    type: QuestionType
    seen: string[]
    correct: string[]
}

export default class QuestionManager {
    private static instance: QuestionManager | null = null;
    private storeInstance: Store | null = null;

    private constructor() {
        this.storeInstance = Store.getInstance();
    }

    public static getInstance(): QuestionManager {
        if (!QuestionManager.instance) {
            QuestionManager.instance = new QuestionManager();
        }
        return QuestionManager.instance;
    }

    public getProperty(propertyName: keyof StorageType) {
        return this.storeInstance?.getStorage[propertyName];
    }

    public get seen() {
        return this.getProperty('seen');
    }

    public get incorrect() {
        return this.getProperty('incorrect');
    }

    public get correct() {
        return this.getProperty('correct');
    }

    public async getQuestion(options: GetQuestionOptions) {
        const queryString = new URLSearchParams({
            difficulty: options.difficulty,
            type: options.type,
            seen: options.seen.join(","),
            correct: options.correct.join(",")
        }).toString();

        const res = await fetch(`${url}/math?${queryString}`)
        if (!res.ok) throw new Error("Failed to fetch question")
        const json = await res.json()
        if (json.error) throw new Error(json.error)
        return json
    }
}
