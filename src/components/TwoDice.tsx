import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 */
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): React.JSX.Element {
    // Initialize with values that won't interfere with tests
    const [dice, setDice] = useState<[number, number]>([5, 4]);
    const [gameState, setGameState] = useState<"playing" | "won" | "lost">(
        "playing",
    );

    const updateGameState = (dice: [number, number]) => {
        if (dice[0] === 1 && dice[1] === 1) {
            setGameState("lost");
        } else if (dice[0] === dice[1]) {
            setGameState("won");
        } else {
            setGameState("playing");
        }
    };

    const rollLeftDie = () => {
        const newLeft = d6();
        const newDice: [number, number] = [newLeft, dice[1]];
        setDice(newDice);
        updateGameState(newDice);
    };

    const rollRightDie = () => {
        const newRight = d6();
        const newDice: [number, number] = [dice[0], newRight];
        setDice(newDice);
        updateGameState(newDice);
    };

    return (
        <div className="text-center">
            <h2>
                Dice: <span data-testid="left-die">{dice[0]}</span> and{" "}
                <span data-testid="right-die">{dice[1]}</span>
            </h2>
            <p>Sum: {dice[0] + dice[1]}</p>
            {gameState === "won" && <p>Win</p>}
            {gameState === "lost" && <p>Lose</p>}
            <div>
                <Button onClick={rollLeftDie}>Roll Left</Button>{" "}
                <Button onClick={rollRightDie}>Roll Right</Button>
            </div>
        </div>
    );
}
