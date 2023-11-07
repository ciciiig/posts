export function getShouldSearch(searchInputValue) {
    if (searchInputValue.length >= 3) {
        return searchInputValue;
    }
}
