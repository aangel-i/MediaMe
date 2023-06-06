let cardSectionElem = document.getElementById("card-section"); // where the cards are to be added
let reader = new FileReader();
let emptyListTextExists = true; // when no cards are to be shown, show the empty list text
var idGenerator; // increases whenever item is added and remains unchanged if item is removed.
let viewType = "";  // filters the type of media to be shown: tv shows, movie, or all (indicated by empty string)
let form = document.getElementById("myForm");
let strThumbContent = "";   // thumbnail string used to store user submitted images

// create new card object
function addCard (title, type, genre, rating, c, comment = "") {
    let dateNow = new Date();
    let card = {
        title,
        type,
        genre,
        rating,
        thumbnail,
        comment,
        id: 0,
        date: dateNow.getDate() + "." + dateNow.getMonth() + "." + dateNow.getFullYear(),
    }
    
    card.thumbnail = strThumbContent;
    
    // testing to see if a list of cards object exists already
    console.log(localStorage.getItem("cards"));
    let cardList = JSON.parse(localStorage.getItem("cards"));
   // create new list, assign card.id if it's the first card to be created
    if (cardList == null) {
        card.id = 1;
        idGenerator = card.id
        cardList = [card];
    } else {
        // assign card.id
        card.id = idGenerator + 1;
        // test to see if id already exsits. Don't add to list if it is so
        if (cardList.find(element => element.id == card.id)) {
            console.log("card id already exists");
        } else {
            cardList.push(card);
        }
    }
    // replace the old array with the updated array that contains the new card in it
    localStorage.setItem("cards", JSON.stringify(cardList));

    form.reset();
    // always defaults to "All" view when submitting a new card
    viewType = "";
    strThumbContent = "";
    displayCards(viewType);
}

    // listening for user submitted files, which we will read in displayCards(). The listener only stores the path to the targetFile.
let imgInput = document.getElementsByName("thumbnail")[0];
imgInput.addEventListener("change", function(event){
    let selectedFile = event.target.files[0];
    reader.onloadend = function(e) {
        let base64 = e.target.result;
        strThumbContent = base64;
    };
    reader.readAsDataURL(selectedFile);
});

// when form is submitted, add card to localStorage given that all the required fields/data are submitted properly by the user
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // raise alert if the required filled are not filled in properly
    if (!form.elements.title.value || !form.elements.type.value || !form.elements.genre.value || !form.elements.rating.value) {
        alert("form not filled in properly");
        return;
    }
    addCard(
        form.elements.title.value,
        form.elements.type.value,
        form.elements.genre.value,
        form.elements.rating.value,
        strThumbContent,
        form.elements.comment.value
    )
    //form.elements.thumbnail.value
});

//displaying card onto the web
function displayCards(displayType) {
    cardList = JSON.parse(localStorage.getItem("cards"));

    if (cardList == null) {return}; // don't show anything if the list of cards is empty

    let heading = document.getElementsByTagName("h2")[0];
    heading.innerHTML = ""; // change subtitle based on chosen view type so users can easily see which view type they're currently using
    if (displayType == "movie") {heading.innerHTML = "Movie"}
    else if (displayType == "tvshow") {heading.innerHTML = "TV show"}
    else (heading.innerHTML = "All");

    cardSectionElem.innerHTML = ""; // "reset" view by making the card section empty. This makes is easier to only show the cards we want to show
    
    cardList.forEach((card) => {
        idGenerator = card.id;
        console.log(card.id);
        let item = document.createElement("div");   // create card
        item.classList.add("card");
    
        // add delete button to each card
        let delButton = document.createElement("button");
        delButton.id = "del-button";
        delButton.setAttribute("del-id", card.id);
        delButton.setAttribute("onclick", "deleteCard(this);")  // if the delete button is clicked, call the function that is responsible for handling this event
        item.appendChild(delButton);
        
        // thumbnail of media as image
        let img = new Image(600, 600);
        // if user submits their own image, load the image to html
        if (card.thumbnail != "") {
            img.src = card.thumbnail;
        // if user didn't submit their own image, use a generic one based on type of media
        } else {
            if (card.type == "movie") {
                img.src = "images/movie.png";
            }
            else if (card.type == "tvshow") {
                img.src = "images/tvshow.png";                
            }
            img.style.borderBottom = "2px solid black";
        }
        img.alt = "thumbnail image of the movie/tv show";
        item.appendChild(img);
    
        // text content of the cards will be stored here
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
        //the amount of filled stars to be outputted  
        for (let i = 0; i < parseInt(card.rating); i++) {
            let starFill = new Image(50,50);
            starFill.src = "icons/star_fill.svg";
            rating.appendChild(starFill);
            console.log("add star!!")
        }
            //the amount of unfilled stars to be outputted 
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
            comment.textContent = '"' + card.comment + '"'; // comments will always be inside quotation marks
            cardText.appendChild(comment);    
        }
    
        // small bottom section of the card
        let cardFooter = document.createElement("div");
        cardFooter.classList.add("card-footer");
        item.appendChild(cardFooter);
        
        // type of media
        let type = document.createElement("p");
        type.classList.add("type-text");
        if (card.type == "tvshow") {type.textContent = "tv show"}
        else {type.textContent = card.type};
        cardFooter.appendChild(type);
    
        // date of media added
        let date = document.createElement("p");
        date.classList.add("date-text");
        date.textContent = card.date;
        cardFooter.appendChild(date);
        
        // if the displayType is an empty string, show all cards
        if (displayType=='') {
            cardSectionElem.appendChild(item);
        // else show only the cards if its type is the same as the target display type
        } else {
            if ( displayType == card.type){ cardSectionElem.appendChild(item);}
        }
        
    });

        //add or remove empty list text
        if (JSON.parse(localStorage.getItem("cards")).length == 0) {
            let para = document.createElement("p");
            para.setAttribute("id", "empty-list-text");
            para.textContent = "Your list seems to be empty :(. Add one now!";
            cardSectionElem.appendChild(para);
            emptyListTextExists = true;
        } else if (JSON.parse(localStorage.getItem("cards")).length != 0 && emptyListTextExists == true) {
            let text = document.getElementById("empty-list-text");
            cardSectionElem.removeChild(text);
            emptyListTextExists = false;
        };
}

// based on the clicked button's id, iterate through the card list and if it matches, delete that object from localStorage.
function deleteCard(btn) {
    let cardId = btn.getAttribute("del-id");
    let cardArray = JSON.parse(localStorage.getItem("cards"));
    let idx = 0;
    var idxDel;
    cardArray.forEach((card) => {
        if (card.id == cardId) { idxDel = idx }
        idx++;
    });
    cardArray.splice(idxDel, 1);
    localStorage.setItem("cards", JSON.stringify(cardArray));
    displayCards(viewType);
}


displayCards(viewType);

