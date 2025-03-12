import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): React.JSX.Element {
    const [attempts, setAttempts] = useState<number>(3);
    const [quizStarted, setQuizStarted] = useState<boolean>(false);

    const startQuiz = () => {
        setQuizStarted(true);
        setAttempts(attempts - 1);
    };

    const stopQuiz = () => {
        setQuizStarted(false);
    };

    const mulligan = () => {
        setAttempts(attempts + 1);
    };

    return (
        <div>
            <div>Attempts: {attempts}</div>
            <Button onClick={startQuiz} disabled={quizStarted || attempts <= 0}>
                Start Quiz
            </Button>
            <Button onClick={stopQuiz} disabled={!quizStarted}>
                Stop Quiz
            </Button>
            <Button onClick={mulligan} disabled={quizStarted}>
                Mulligan
            </Button>
        </div>
    );
}
