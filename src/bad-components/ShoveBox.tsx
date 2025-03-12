import { useState } from "react";

export function ShoveBox() {
    const [margin, setMargin] = useState(10);

    function shove() {
        setMargin(margin + 4);
    }

    return (
        <div>
            <h2>Shove Box</h2>
            <div>
                <button onClick={shove}>Shove</button>
                <div
                    data-testid="moveable-box"
                    style={{
                        marginLeft: `${margin}px`,
                        display: "inline-block",
                        width: "50px",
                        height: "50px",
                        backgroundColor: "blue",
                    }}
                ></div>
            </div>
        </div>
    );
}
