import React, { useCallback } from "react";
import { ColorId } from 'unsplash-js';
import { UnsplashSearchFilter } from "../../domains/unsplash";

type SortSelectProps = {
    filter: UnsplashSearchFilter;
    setFilter: (value: (prevFilter: UnsplashSearchFilter) => UnsplashSearchFilter) => void;
};

export const ColorSelect: React.FC<SortSelectProps> = ({ filter, setFilter }) => {
    const handleColorChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const color: ColorId | undefined = e.target.value === 'all' ? undefined : e.target.value as ColorId;
        setFilter((prevFilter) => ({ ...prevFilter, color }));
    }, [setFilter]);

    return (
        <select 
            value={filter.color} 
            onChange={handleColorChange} 
            data-testid="color-change"
            className="block w-full sm:inline-block sm:w-auto px-3 m-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none pr-8">
            <option value="all">All Colors</option>
            <option value="black_and_white">Black and White</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="yellow">Yellow</option>
            <option value="orange">Orange</option>
            <option value="red">Red</option>
            <option value="purple">Purple</option>
            <option value="magenta">Magenta</option>
            <option value="green">Green</option>
            <option value="teal">Teal</option>
            <option value="blue">Blue</option>
        </select>
    );
};
