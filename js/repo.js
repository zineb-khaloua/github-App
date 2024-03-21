let reposEl=document.querySelector('#repos');

function getReposName(){
    let qryStr=document.location.search;
    let reposName=qryStr.split("=")[1];
    if(reposName){
        getIssues(reposName);
        console.log(reposName);
    }
}

function getIssues(reposName){
let apiUrl= "https://api.github.com/repos/"+reposName+"/issues";
fetch(apiUrl)
.then(res=>res.json())
.then(data=>displayIssues(data))
.catch(err=>alert('geht es nicht'))

}


function displayIssues(issues){
    console.log(issues);
    if(issues.length == 0)
{
    reposEl.innerHTML = "NO issues !";
    return;
}


    issues.forEach(issue=>{ 
        reposEl.innerHTML +=`
        <a href="${issue.html_url}" class="repo-item">
        <span>${issue.title}</span>
        </a>
        `
    })
}

/**/

getReposName();

