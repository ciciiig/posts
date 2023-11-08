export const filterPosts = (posts, searchValue) => posts.filter(
    (post) => post.title.includes(searchValue) || post.body.includes(searchValue)
);