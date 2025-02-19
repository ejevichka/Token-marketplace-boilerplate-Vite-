# React + TypeScript + Vite

# Search for images from Unsplash
The provided code defines a Search component that allows users to search for images from Unsplash based on specific filters, including query, color, and sorting. Here is an overview of its functionality:

# Key Features:
Search Input Handling:

The component contains an input field for users to enter their search query (searchRaw).
The search input is debounced with a delay of 750 milliseconds using use-debounce to prevent excessive API requests as the user types.
State Management:

searchRaw: Tracks the raw search input entered by the user.
searchDebounce: Stores the debounced version of the search query, which is used for the actual API call after the delay.
currentPage: Tracks the current page for pagination.
totalPages: Stores the total number of available pages based on the search results.
filter: Stores the search filter object, which includes the search query (query), selected color (color), the current page (page), and the sorting order (orderBy).
Fetching Search Results:

The useSWR hook is used to fetch data from the Unsplash API, with the filter object serving as the key to trigger the request. It only triggers the request if the search query (filter.query) is not empty.
The unsplashApi.search() method is used to perform the search operation.

# Dynamic Filter Updates:

The component listens for changes in the search query (searchDebounce) or the currentPage and updates the filter state accordingly.
The useEffect hook ensures that the search filter is updated with the new query and page values each time the user changes the search input or navigates between pages.
Displaying Data:

# User Scenario
If the data is still loading, it shows a loading indicator (Loading..).
If an error occurs during the API call, it displays the error message extracted via the extractErrorMessage() function.
If the search returns results, the component displays the images in a paginated format using:
PaginatedImageList: Displays the images on the current page.
Pagination: Handles the pagination logic, allowing users to navigate between pages of results.
If no results are found, it displays a message saying "No results here :C".


#  User Scenario Filter Components:

The component includes two additional filters:
ColorSelect: Allows users to filter images by color.
SortSelect: Allows users to sort images by order (e.g., "relevant").
Summary of the Component Flow:
The user types a search query.
The query is debounced to prevent sending too many API requests.
The component triggers the Unsplash API search with the debounced query, along with additional filters for color and sorting.
The search results are displayed in a paginated list, with a loading indicator shown while data is being fetched.
The user can change the page or adjust filters, which will update the search results accordingly.

# Dependencies:
useSWR: Used for data fetching and caching.
use-debounce: Used for debouncing the search input to reduce the number of API calls.
ColorSelect and SortSelect: Custom components for filtering the results.
Pagination: A component to manage pagination.
PaginatedImageList: Displays images on the current page.
This component is a part of a photo search application that interfaces with the Unsplash API, allowing users to search, filter, and paginate through image results.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:


# TODO

- Add corepack and specify package manager
- use https://developer.mozilla.org/en-US/docs/Web/API/URL
- fix module jest test
