import { useState } from "react";

export function ChooseTeam() {
    const people = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank", "Grace"];
    const [team, setTeam] = useState<string[]>([]);

    const addToTeam = (person: string) => {
        if (!team.includes(person)) {
            setTeam([...team, person]);
        }
    };

    const clearTeam = () => {
        setTeam([]);
    };

    return (
        <div>
            <h2>Choose Team</h2>
            <div style={{ display: "flex" }}>
                <div>
                    <h3>People</h3>
                    <div>
                        {people
                            .filter((person) => !team.includes(person))
                            .map((person) => (
                                <button
                                    key={person}
                                    onClick={() => addToTeam(person)}
                                >
                                    {person}
                                </button>
                            ))}
                        {team.length > 0 && (
                            <button onClick={clearTeam}>Clear Team</button>
                        )}
                    </div>
                </div>
                <div style={{ marginLeft: "2rem" }}>
                    <h3>Team</h3>
                    <ul>
                        {team.map((person) => (
                            <li key={person}>{person}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
