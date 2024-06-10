import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import { PaginatedImageList } from "../pagination-list/PaginationList";
import { UnsplashSearchFilter, unsplashApi } from "../../domains/unsplash";
import { extractErrorMessage } from "../../domains/utils";
import { ColorSelect } from "../form/ColorSelect";
import { SortSelect } from "../form/OrderBySelect";
import {Pagination} from "../pagination/Pagination"


export const Search: React.FC = () => {
  const [searchRaw, setSearchRaw] = useState("");
  const [searchDebounce] = useDebounce(searchRaw, 750);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<UnsplashSearchFilter>({ query: "", color: undefined, page: 0, orderBy: 'relevant'});

  const response = useSWR(isSearchable(filter) ? [filter, "search"] : null, ([filter]) => {
    return unsplashApi.search(filter);
  });

  useEffect(() => {
    if (response.data) {
      const total = unsplashApi.getTotalNumber();
      setTotalPages(total);
    }
  }, [response.data]);

  useEffect(() => {
    setFilter((x) => ({ ...x, query: searchDebounce, page: currentPage }));
  }, [searchDebounce, currentPage]);

  return (
    <div>
      <form>
        <input
          type="text"
          value={searchRaw}
          onChange={(x) => setSearchRaw(x.currentTarget.value)}
          placeholder="Search Unsplash..."
          data-testid="search-input"
          className="block w-full sm:inline-block sm:w-auto px-3 m-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <ColorSelect filter={filter} setFilter={setFilter} />
        <SortSelect filter={filter} setFilter={setFilter} />
       
      </form>
      {response.isLoading && <span children="Loading.." data-testid="loading" />}
      {response.error && <span children={extractErrorMessage(response.error)} />}
      {response.data && (
        <div>
          {response.data.length > 0 ? (
            <>
            <PaginatedImageList images={response.data} currentPage={filter.page} />
            <Pagination  currentPage={currentPage} setCurrentPage={setCurrentPage} setFilter={setFilter} totalPages={totalPages} />
           </>
          ) : (
            <span data-testid="no-results" children="No results here :C" />
          )}
        </div>
      )}
    </div>
  );
};

function isSearchable(filter: UnsplashSearchFilter) {
  return Boolean(filter.query);
}
