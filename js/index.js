const url = "https://kingdomofnorway.kvistnes.one/wp-json/wp/v2/posts?_embed";
const indexContent = document.querySelector(".index-post");
const loader = document.querySelector(".loader");

async function fetchPosts(){
    try {
        const search = await fetch(url);
        const results = await search.json();

        for(let i = 0; i < results.length; i++) {
    
            const image = results[i]._embedded['wp:featuredmedia']['0'];
        
            if(i === 1){
                break;
            }
            
            // Showing only date, not time
            const dateTime = results[i].date;
            const date = dateTime.substring(0,10);

            indexContent.innerHTML += `
            <div class="index-item">
                <h2>${results[i].title.rendered}</h2>
                <p class="date">${date}</p>
                <img src="${image.source_url}" alt="${image.alt_text}"/>
                <p>${results[i].content.rendered}</p>
                <p class="signature">John Doe</p>
            </div>`;

            if(results){
                loader.style.display = "none";
            }
        }
    }

    catch(error){
        console.log(error);
        indexContent.innerHTML = `
        <h1>Failed to load blog. Please try again later</h1>
        <p class="signature">John Doe</p>`;
    }

    finally{
        console.log("finally");
    }
}
fetchPosts()

// Welcome to my blog

const welcomeUrl = "https://kingdomofnorway.kvistnes.one/wp-json/wp/v2/pages/278";
const welcome = document.querySelector(".index-welcome");

async function fetchWelcome(){
    try {
        const find = await fetch(welcomeUrl);
        const welcomeContent = await find.json();
       
        welcome.innerHTML += `
        <div>
            <h1>Welcome to my blog!</h1>
            <p class="welcome-text">${welcomeContent.content.rendered}</p>
            <p class="signature">John Doe</p>
        </div>
        <div class="welcome-image>${welcomeContent.content.rendered}</div>`;
    }

    catch(error){
        console.log(error);
        welcome.innerHTML = `
        <p>Something went wrong. Please try again later</hp>
        <p class="signature">John Doe</p>`;
    }

    finally{
        console.log("finally");
    }
}
fetchWelcome()
