const carouselUrl = "https://kingdomofnorway.kvistnes.one/wp-json/wp/v2/posts?_embed";
const carousel = document.querySelector(".carousel-container");
const prevArrow = document.querySelector(".prev");
const nextArrow = document.querySelector(".next");

async function getPosts(){
    try {
        const getPost = await fetch(carouselUrl);
        const posts = await getPost.json();   

        for(let i = 0; i < posts.length; i++) {

            if (i === 0){
                continue;
            }
            if (i === 5) { 
                break; 
            }

            const media = posts[i]._embedded['wp:featuredmedia']['0'];

            const shortText = posts[i].excerpt.rendered.substring(0,120) + "...";

            carousel.innerHTML += `
            <div class="carousel">
                <a href="post.html?id=${posts[i].id}" class="carousel-title">
                    <img class="carousel-image" src="${media.source_url}" alt="${media.alt_text}"/>
                </a>
                <a href="post.html?id=${posts[i].id}" class="carousel-title title">${posts[i].title.rendered}
                    <p class="carousel-text">${shortText}</p>
                </a>
            </div>`;

            const carouselImage = document.querySelector(".carousel-image");
            
            if (i === 1){
                carouselImage.className += " " + "initial";
            }
        }
    }

    catch(error){
        console.log(error);
        carousel.innerHTML = `
        <h3>Failed to load blog. Please try again later</h1>
        <p class="signature">John Doe</p>`;
    }

    finally{
        console.log("finally");
    }
}
getPosts()

// Slide functions

let slideIndex = 0;

nextArrow.addEventListener("click", function(){
    slideIndex = (slideIndex < 3) ? slideIndex + 1 : 3;
    carousel.style.transform = "translate(" + slideIndex*-25 + "%)";
});

prevArrow.addEventListener("click", function(){
    slideIndex = (slideIndex > 0) ? slideIndex - 1 : 0;
    carousel.style.transform = "translate(" + slideIndex*-25 + "%)";
});
