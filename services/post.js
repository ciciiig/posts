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
    const urlPost = `${appState.urlPosts}sdfsdfs/${appState.modalWindow.editedPost.id}`;
    const payload = appState.modalWindow.editedPost;
    const options = {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
    };

    try {
        appState.postUpdate.isFetching = true;
        const response = await fetch(urlPost, options);
        appState.postUpdate.isFetching = false;

        if (response.status === 404) {
            throw new Error(response.status);
        }

        return response.json();
    } catch (error) {
        appState.postUpdate.isFetching = false;
        appState.postUpdate.error = error;
    }
}