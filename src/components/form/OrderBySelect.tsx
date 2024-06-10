import React, { useCallback } from "react";
import { SearchOrderBy } from 'unsplash-js';

import { UnsplashSearchFilter } from "../../domains/unsplash";

type SortSelectProps = {
    filter: UnsplashSearchFilter;
    setFilter: (value: (prevFilter: UnsplashSearchFilter) => UnsplashSearchFilter) => void;
};

export const SortSelect: React.FC<SortSelectProps> = ({ filter, setFilter }) => {
    const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter((prevFilter) => ({ ...prevFilter, orderBy: e.target.value as SearchOrderBy }));
    }, [setFilter]);

    return (
        <select
            value={filter.orderBy}
            onChange={handleSortChange}
            data-testid="sort-change"
            className="block w-full sm:inline-block sm:w-auto px-3 m-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="relevant">Relevance</option>
            <option value="latest">Latest</option>
            <option value="editorial">Editorial</option>
        </select>
    );
};
