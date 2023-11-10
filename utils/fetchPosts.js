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

export async function patchPost(appState) {
    let urlPost = `${appState.urlPosts}/${appState.modalWindow.editedPost.id}`
    let payload = appState.modalWindow.editedPost
    let options = {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    }

    try {
        appState.isFetching = true;
        const response = await fetch(urlPost, options);
        appState.isFetching = false;
        return response.json();
    } catch (error) {
        appState.isFetching = false;
        appState.error = error
    }
}