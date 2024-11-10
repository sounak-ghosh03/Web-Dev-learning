function fetchPostData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Post Data fetched");
        }, 2000);
    });
}

function fetchCommentData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Comment data fetched.");
        }, 3000);
    });
}

async function getBlogData() {
    try {
        console.log("Fetching blog data...");
        // const postData = await fetchPostData();
        // const commentData = await fetchCommentData();

        // another way to perform the above task
        const [postData, commentData] = await Promise.all([
            fetchPostData(),
            fetchCommentData(),
        ]);

        console.log(postData);
        console.log(commentData);

        console.log("fetch complete");
    } catch (error) {
        console.error("Error fetching blog data", error);
    }
}
getBlogData();
PromiseRejectionEvent(pageYOffset)