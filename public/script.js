let cardSectionElem = document.getElementById("card-section");
let reader = new FileReader();
let emptyListTextExists = true;

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
        date: new Date(),
    }    
    cardList.push(card);
    displayCard(card);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!form.elements.title.value || !form.elements.type.value || !form.elements.genre.value || !form.elements.rating.value) {
        alert("form not filled in properly");
        return;
    }

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
        console.log("Im adding the empty text");
        emptyListTextExists = true;
    } else if (cardList.length != 0 && emptyListTextExists == true) {
        let text = document.getElementById("empty-list-text");
        cardSectionElem.removeChild(text);
        console.log("I'm removing the empty text");
        emptyListTextExists = false;
    };
    console.log(cardList);
});

// let imgInput = document.getElementById("thumbnail");
// let imgDest = document.getElementsByClassName("card");
// imgInput.addEventListener("change", function(event){
//     let selectedFile = event.target.files[0];
//     reader.onloadend = function(e) {
//         let base64 = e.target.result;
//         console.log(base64);
//         localStorage.setItem("imgData", base64);
//         imgDest.src = base64;
//     };
//     reader.readAsDataURL(selectedFile);
//     console.log("successfully parse user file");
// });

//displaying card onto the web
function displayCard(card) {
    let item = document.createElement("div");
    item.classList.add("card");
    
    // thumbnail of media as image
    let img = new Image(600, 600);
    if (card.thumbnail != "") {
        img.src = card.thumbnail;
    } else {
        img.src = "/images/test.jpg";
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
        let starFill = new Image(50,50);
        starFill.src = "icons/star_fill.svg";
        rating.appendChild(starFill);
        console.log("add star!!")
    }
    for (let i = 5; i > parseInt(card.rating); i--) {
        let starUnfill = new Image(50,50);
        starUnfill.src = "icons/star_unfill.svg";
        rating.appendChild(starUnfill);
        console.log("add empty star!")
    }
    cardText.appendChild(rating);

    //comments for the media
    if (card.comment != "") {
        let comment = document.createElement("p");
        comment.textContent = '"' + card.comment + '"';
        cardText.appendChild(comment);    
    }

    // small bottom section of the card
    let cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");
    item.appendChild(cardFooter);
    // type of media
    let type = document.createElement("p");
    type.classList.add("type-text");
    type.textContent = card.type;
    cardFooter.appendChild(type);

    // date of media added
    let date = document.createElement("p");
    date.classList.add("date-text");
    date.textContent = card.date.getDate() + "." + card.date.getMonth() + "." + card.date.getFullYear()
    cardFooter.appendChild(date);

    cardSectionElem.appendChild(item);
}

