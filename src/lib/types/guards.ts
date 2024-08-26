import type {MultipleChoice, ShortAnswer} from "$lib/types/response";

export function isShortAnswer(data: ShortAnswer | MultipleChoice): data is ShortAnswer {
    if (!data) return false
    return (data as ShortAnswer).type === "short_answer"
}

export function isMultipleChoice(data: ShortAnswer | MultipleChoice | undefined): data is MultipleChoice {
    if (!data) return false
    return (data as MultipleChoice).type === "multiple_choice"
}
