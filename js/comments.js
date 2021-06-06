const commentsUrl = "https://kingdomofnorway.kvistnes.one/wp-json/wp/v2/comments";
const comments = document.querySelector(".comments");

async function getComment(){
    try{
        const search = await fetch(commentsUrl);
        const result = await search.json();

        for(let i = 0; i < result.length; i++){
            comments.innerHTML += `
            <div class="comment-div">
                    <h3>${result[i].author_name} commented:</h3>
                    <p>${result[i].content.rendered}</p>
            </div>`;
        }
    }

    catch(error){
        console.log(error);
        comments.innerHTML = "Failed to load comments";
    }

    finally{
        console.log("finally");
    }
} 
getComment();


/*prevent default */
const form = document.querySelector(".message-form");

form.addEventListener("submit", e => {
	e.preventDefault();
	
	controlInputs();
});

