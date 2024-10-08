export interface ShortAnswer {
    type: string
    question: string
    answer: string
    domain: string
    correctAnswer: string[]
}

export interface MultipleChoice {
    type: string
    question: string
    choices: string[]
    domain: string
    correctChoiceIndex: number
    answer: string
    correctAnswer: string[]
}

export type Question = ShortAnswer | MultipleChoice
