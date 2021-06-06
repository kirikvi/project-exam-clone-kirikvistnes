const postContainer = document.querySelector(".post-content");
const breadcrumbs = document.querySelector(".breadcrumbs");
const title = document.querySelector("title");
const queryString = document.location.search;
const parameters = new URLSearchParams(queryString);
const id = parameters.get("id");

const postUrl = `https://kingdomofnorway.kvistnes.one/wp-json/wp/v2/posts/${id}?_embed`;

async function createPost(){
    try {
        const search = await fetch(postUrl);
        const postResult = await search.json();

        title.innerHTML = "KoN | " + postResult.title.rendered;

        const image = postResult._embedded['wp:featuredmedia']['0'];
        const dateTime = postResult.date;
        const date = dateTime.substring(0,10);

        postContainer.innerHTML = `
            <div>
                <h1>${postResult.title.rendered}</h1>
                <p class="date">${date}</p>
                <img class="post-img" id="post-img" src="${image.source_url}" alt="${image.alt_text}">
                <!--Image modal-->
                <div id="modal" class="modal">
                    <span class="close">&times;</span>
                    <img class="modal-img" id="modal-img" src="${image.source_url}" alt="${image.alt_text}">
                </div>
                <p>${postResult.content.rendered}</p>
                <p class="signature">John Doe</p>
            </div>`;


        // IMAGE MODAL  
        const modal = document.querySelector("#modal");
        const img = document.querySelector("#post-img");
        const modalImg = document.querySelector("#modal-img");
        
        img.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
        }

        // Close the modal
        const close = document.querySelector(".close");

        close.onclick = function(){
            modal.style.display = "none";
        }

        modal.onclick = function(){
            modal.style.display = "none";
        }

        breadcrumbs.innerHTML = `
        <a href="index.html">Home /</a> 
        <a href="archive.html">Archive /</a>
        <a href="" class="current-crumb">${postResult.title.rendered}</a>`;    
    }
    catch(error) {
        console.log(error);
        postContainer.innerHTML = `<h2>Oops.. Something went wrong!</h2>`;
    }
    finally {
        console.log("finally");
    }
}
createPost(); 

