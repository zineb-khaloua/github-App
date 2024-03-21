//setup Vars

let userFormEl=document.querySelector('#user-info');
let userInput=document.querySelector('.username');
let languageEl=document.querySelector('.language');
let serachTermEl =document.querySelector('#search-term');
let reposEl=document.querySelector('#repos');

//Events 

userFormEl.addEventListener('submit',formSubmitHandler);
languageEl.addEventListener('click',handleClick)
//functions

function handleClick(e){

    let lng =e.target.getAttribute('data-lng');
    if(lng){
        reposEl.innerHTML="";
        getLangRepos(lng);
    }
}

function getLangRepos(lng){
let apiUrl="https://api.github.com/search/repositories?q="+lng;
fetch(apiUrl)
.then(res=>res.json())
.then(data=>displayRepos(data.items,lng))
.catch(err=>alert('something is wrong !'))
}


function formSubmitHandler(e){
    e.preventDefault();
    let user=userInput.value.trim();

    if(user)
    {
        reposEl.innerHTML='';
        getUserRepos(user)
    }
    else{
        alert('please ,Enter User !');
    }
}


function  getUserRepos(user){
let apiUrl="https://api.github.com/users/"+user+"/repos";

fetch(apiUrl)
.then(res=>res.json())
.then(data=>displayRepos(data,user))
.catch(err=>alert('something is wrong !'))
}


function displayRepos(repos,searchTerm){
//console.log(repos);
if(repos.length == 0)
{
    serachTermEl.innerHTML='';
    reposEl.innerHTML = "NO Repos !";
    return;
}

    serachTermEl.innerHTML=searchTerm;

    repos.forEach(repo=>{
        let name=repo.owner.login+ '/' +repo.name; 
        reposEl.innerHTML +=`
        <a href="./repo.html?repo=${name}" class="repo-item">
        <span>${repo.owner.login}/${repo.name}</span>
        <span> <p class='issues'>Issues:</p> ${repo.open_issues_count >0  ?  '  <i class="fas fa-times"></i> ': '<i class="fas fa-check-square"></i>' } </span>
       </a>
        `
    })
}