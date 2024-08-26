import Store, {type StorageType} from "$lib/Storage";
import {url} from "$lib/index";
import type {MultipleChoice, Question, ShortAnswer} from "$lib/types/response";

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
    id: string
    type: QuestionType
    seen: string[]
    correct: string[]
    unknown: boolean
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

    public async getQuestion(options: Partial<GetQuestionOptions>): Promise<Question> {
        const queryString = new URLSearchParams(options as Record<string, string>).toString()

        const res = await fetch(`${url}/math?${queryString}`)
        if (!res.ok) throw new Error("Failed to fetch question")
        const json = await res.json()
        if (json.error) throw new Error(json.error)
        return json
    }
}
