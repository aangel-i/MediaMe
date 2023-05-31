let cardSectionElem = document.getElementById("card-section");

// data submitted from user to add to card
let cardList = [];
let form = document.getElementById("myForm");
function addCard (title, type, genre, rating, thumbnail, comment = "") {
    let card = {
        title,
        type,
        genre,
        rating,
        thumbnail,
        comment,
        id: cardList.length,
        date: new Date().toISOString(),
    }
    
    cardList.push(card);
    displayCard(card);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    addCard(
        form.elements.title.value,
        form.elements.type.value,
        form.elements.genre.value,
        form.elements.rating.value,
        form.elements.thumbnail.value,
        form.elements.comment.value
    )
    form.reset();

    if (cardList.length == 0) {
        let para = document.createElement("p");
        para.setAttribute("id", "empty-list-text");
        let textnode = document.textContent("Your list seems to be empty :(. Add one now!");
        para.appendChild(textnode);
        cardSectionElem.appendChild(para);
    } else if (cardList.length != 0 && document.getElementById("empty-list-text") != null) {
        let text = document.getElementById("empty-list-text");
        cardSectionElem.removeChild(text);
    }

    console.log(cardList);
})


//displaying card onto the web

function displayCard(card) {
    let item = document.createElement("div");
    item.classList.add("card");
    
    // thumbnail of media as image
    let img = new Image(600, 600);
    if (card.thumbnail != "") {
        img.src = card.thumbnail;
    } else {
        img.src = ".../images/test.jpg";
    }
    img.alt = "thumbnail image of the movie/tv show";
    item.appendChild(img);

    // text content of the cards are located here
    let cardText = document.createElement("div");
    cardText.classList.add("cardText");
    item.appendChild(cardText);

    // Name of media
    let heading = document.createElement("h4");
    heading.textContent = card.title;
    cardText.appendChild(heading);

    //genre of media
    let genre = document.createElement("p");
    genre.textContent = "genre: " + card.genre;
    cardText.appendChild(genre);

    //rating of media
    let rating = document.createElement("div");
    rating.classList.add("rating");
   
    for (let i = 0; i < parseInt(card.rating); i++) {
        let starFill = new Image(150,150);
        starFill.src = ".../icons/star_fill.svg";
        rating.appendChild(starFill);
    }

    //comments for the media
    if (card.comment != "") {
        let comment = document.createElement("p");
        comment.textContent = '"' + card.comment + '"';
        cardText.appendChild(comment);
    
        cardSectionElem.appendChild(item);
    }
}

//testing to see if push it will commit now

