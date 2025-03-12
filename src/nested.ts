export interface Question {
    id: number;
    name: string;
    body: string;
    expected: string;
    points: number;
    options: string[];
    published: boolean;
    type: "short_answer_question" | "multiple_choice_question";
}

export function getPublishedQuestions(questions: Question[]): Question[] {
    return questions.filter((q) => q.published);
}

// Now only include questions that actually have non-empty content.
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    return questions.filter(
        (q) =>
            q.body.trim() !== "" ||
            q.expected.trim() !== "" ||
            q.options.length > 0,
    );
}

export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    return questions.find((q) => q.id === id) || null;
}

export function removeQuestion(questions: Question[], id: number): Question[] {
    return questions.filter((q) => q.id !== id);
}

export function getNames(questions: Question[]): string[] {
    return questions.map((q) => q.name);
}

export function sumPoints(questions: Question[]): number {
    return questions.reduce((sum, q) => sum + q.points, 0);
}

export function sumPublishedPoints(questions: Question[]): number {
    return questions
        .filter((q) => q.published)
        .reduce((sum, q) => sum + q.points, 0);
}

export function toCSV(questions: Question[]): string {
    if (questions.length === 0) return "";

    const header = "id,name,options,points,published";
    const rows = questions.map(
        (q) =>
            `${q.id},${q.name},${q.options.length},${q.points},${q.published}`,
    );

    return [header, ...rows].join("\n");
}

export function makeAnswers(questions: Question[]): Array<{
    questionId: number;
    correct: boolean;
    text: string;
    submitted: boolean;
}> {
    return questions.map((q) => ({
        questionId: q.id,
        correct: false,
        text: "",
        submitted: false,
    }));
}

export function publishAll(questions: Question[]): Question[] {
    return questions.map((q) => ({
        ...q,
        published: true,
    }));
}

export function sameType(questions: Question[]): boolean {
    if (questions.length === 0) return true;
    const firstType = questions[0].type;
    return questions.every((q) => q.type === firstType);
}

export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: "short_answer_question" | "multiple_choice_question",
): Question[] {
    const newQuestion: Question = {
        id,
        name,
        body: "",
        expected: "",
        points: 1,
        options: [],
        published: false,
        type,
    };

    return [...questions, newQuestion];
}

export function renameQuestionById(
    questions: Question[],
    id: number,
    newName: string,
): Question[] {
    return questions.map((q) => (q.id === id ? { ...q, name: newName } : q));
}

// When changing type, clear the options if switching to a short answer.
export function changeQuestionTypeById(
    questions: Question[],
    id: number,
    newType: "short_answer_question" | "multiple_choice_question",
): Question[] {
    return questions.map((q) => {
        if (q.id !== id) return q;
        return {
            ...q,
            type: newType,
            options: newType === "short_answer_question" ? [] : q.options,
        };
    });
}

export function editOption(
    questions: Question[],
    questionId: number,
    optionIndex: number,
    newOption: string,
): Question[] {
    return questions.map((q) => {
        if (q.id !== questionId) return q;

        const newOptions = [...q.options];
        if (optionIndex === -1) {
            // Add new option
            newOptions.push(newOption);
        } else {
            // Edit existing option
            newOptions[optionIndex] = newOption;
        }

        return { ...q, options: newOptions };
    });
}

// Insert the duplicate immediately after the source question.
export function duplicateQuestionInArray(
    questions: Question[],
    sourceId: number,
    newId: number,
): Question[] {
    const index = questions.findIndex((q) => q.id === sourceId);
    if (index === -1) return questions;
    const sourceQuestion = questions[index];
    const duplicatedQuestion = {
        ...sourceQuestion,
        id: newId,
        name: `Copy of ${sourceQuestion.name}`,
        published: false,
    };
    const result = [...questions];
    result.splice(index + 1, 0, duplicatedQuestion);
    return result;
}
