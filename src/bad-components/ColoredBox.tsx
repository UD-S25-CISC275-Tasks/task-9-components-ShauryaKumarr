import { useState } from "react";

export function ColoredBox() {
    const colors = ["red", "green", "blue", "yellow", "purple"];
    const [colorIndex, setColorIndex] = useState(0);

    function cycleColor() {
        setColorIndex((prev) => (prev + 1) % colors.length);
    }

    return (
        <div>
            <h2>Colored Box</h2>
            <div>
                <button onClick={cycleColor}>Cycle Color</button>
                <div
                    data-testid="colored-box"
                    style={{
                        marginLeft: "1rem",
                        display: "inline-block",
                        width: "50px",
                        height: "50px",
                        backgroundColor: colors[colorIndex],
                    }}
                ></div>
            </div>
        </div>
    );
}
