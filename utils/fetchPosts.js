export async function fetchPosts(appState) {
    try {
        appState.isFetching = true;
        const response = await fetch(appState.urlPosts);
        appState.isFetching = false;
        return await response.json();
    } catch (error) {
        appState.isFetching = false;
        appState.error = error
    }
}