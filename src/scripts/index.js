const fetchUserData = () => {
    const button = document.querySelector(".index__button");
    button.addEventListener("click", async () => {
        const input = document.querySelector("input");
        const request = await fetch(`https://api.github.com/users/${input.value}`).then(async(response) => {
            if(response.ok) {
                const result = await response.json();
                localStorage.setItem("@githubUserInfo", JSON.stringify(result));
                location = "./src/pages/profile.html";
                return request;
            }
            else {
                // const result = await response.json();
                location = "./src/pages/error.html";
                // throw new Error(result.message);
            }
        }).catch(error => {
            console.log(error);
        });
    })
}
fetchUserData();