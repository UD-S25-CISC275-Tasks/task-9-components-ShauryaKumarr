import React, { useState } from "react";
import { Button } from "react-bootstrap";

// Define holidays with names and years
const HOLIDAYS = [
    { name: "Christmas", year: 1870 },
    { name: "Halloween", year: 1745 },
    { name: "Independence Day", year: 1776 },
    { name: "New Year's Day", year: 1582 },
    { name: "Thanksgiving", year: 1621 },
];

export function CycleHoliday(): React.JSX.Element {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const cycleAlphabetically = () => {
        // Sort by name and find next index
        const sorted = [...HOLIDAYS].sort((a, b) =>
            a.name.localeCompare(b.name),
        );
        const currentName = HOLIDAYS[currentIndex].name;
        const sortedIndex = sorted.findIndex((h) => h.name === currentName);
        const nextIndex = (sortedIndex + 1) % sorted.length;
        const nextHoliday = sorted[nextIndex];
        setCurrentIndex(HOLIDAYS.findIndex((h) => h.name === nextHoliday.name));
    };

    const cycleByYear = () => {
        // Sort by year and find next index
        const sorted = [...HOLIDAYS].sort((a, b) => a.year - b.year);
        const currentName = HOLIDAYS[currentIndex].name;
        const sortedIndex = sorted.findIndex((h) => h.name === currentName);
        const nextIndex = (sortedIndex + 1) % sorted.length;
        const nextHoliday = sorted[nextIndex];
        setCurrentIndex(HOLIDAYS.findIndex((h) => h.name === nextHoliday.name));
    };

    return (
        <div>
            <div>Holiday: {HOLIDAYS[currentIndex].name}</div>
            <Button onClick={cycleAlphabetically}>Alphabet</Button>
            <Button onClick={cycleByYear}>Year</Button>
        </div>
    );
}
