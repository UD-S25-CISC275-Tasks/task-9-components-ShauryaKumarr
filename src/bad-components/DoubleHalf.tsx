import { useState } from "react";

export function DoubleHalf() {
    const [value, setValue] = useState(10);

    function double() {
        setValue((prev) => prev * 2);
    }

    function halve() {
        setValue((prev) => prev / 2);
    }

    return (
        <div>
            <h2>Double or Half</h2>
            <div>
                <button onClick={double}>Double</button>
                <button onClick={halve}>Halve</button>
                <div>
                    Value: <span>{value}</span>
                </div>
            </div>
        </div>
    );
}
