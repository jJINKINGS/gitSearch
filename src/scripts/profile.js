const renderUserInfo = (user) => {
    const img = document.querySelector(".profile__image");
    const login = document.querySelector(".profile__username");

    if(user) {
        login.innerText = user.login;
        img.src = user.avatar_url;
    }
}

const getUserFromLocalStorage = () => {
     const user = JSON.parse(localStorage.getItem("@githubUserInfo"));
     renderUserInfo(user);
}
getUserFromLocalStorage();

const changeUser = () => {
    const button = document.querySelector("button");
    button.addEventListener("click", () => {
        location = "../../";
        localStorage.removeItem("@githubUserInfo");
    })
}
changeUser();

const renderUserRepos = async() => {
    const user = JSON.parse(localStorage.getItem("@githubUserInfo"));
    await fetch(`https://api.github.com/users/${user.login}/repos`)
    .then(async response => {
        const repositorios = await response.json()
        createElement(repositorios);
        return repositorios;
    })
    .catch(erro => console.error(erro));

}
renderUserRepos();

const createElement = (repositorios) => {
    const ul = document.querySelector(".profile__ul");
    ul.innerHTML = "";
    repositorios.forEach(element => {
        const currentRepos = element;
        const li = document.createElement("li");
        const h4 = document.createElement("h4");
        const p = document.createElement("p");
        const a = document.createElement("a");

        h4.innerText = currentRepos.name;

        if(currentRepos.description) {
            p.innerText = currentRepos.description
        }
        else {
            p.innerText = "Repositório sem descrição";
        }
        
        a.innerText = "Repositório"
        a.href = currentRepos.html_url;
        a.target = "_blank";

        li.append(h4, p, a);
        ul.appendChild(li);
    })
}