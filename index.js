/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let game of games) {
        const challenge3 = document.createElement('div');
        challenge3.classList.add("game-card");

        challenge3.innerHTML = `
       <img src="${game.img}" class="game-img">
       <p> We wish for you to join the ${game.backers} backers that will help us to create ${game.name}.
       To help raise our goal of $${game.goal}.<p/>
       `;

        gamesContainer.appendChild(challenge3)

    }

    // create a new div element, which will become the game card


    // add the class game-card to the list


    // set the inner HTML using a template literal to display some info 
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")


    // append the game to the games-container

}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON)
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const challenge4 = GAMES_JSON.reduce((acc, backer) => {
    return acc + backer.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${challenge4.toLocaleString('en-us')}`


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const challenge4b = GAMES_JSON.reduce((acc, pledge) => {
    return acc + pledge.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `${challenge4b.toLocaleString('en-us')}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const challenge4c = GAMES_JSON.reduce((acc, _) => {
    return acc + 1; //im just counting the occurences so no need to actually read the second arguement
}, 0)
gamesCard.innerHTML = `${challenge4c}`;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    if (textBox){
        deleteChildElements(searchContainer) 
    }
     
    // use filter() to get a list of games that have not yet met their goal
    const challenge5 = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });


    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(challenge5)
    console.log(challenge5)
}




// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    if (textBox){
        deleteChildElements(searchContainer) 
    }
    // use filter() to get a list of games that have met or exceeded their goal
    const challenge5b = GAMES_JSON.filter((game) => {
        return game.pledged > game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(challenge5b);

}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    if (textBox){
        deleteChildElements(searchContainer) 
    }
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const challenge6 = GAMES_JSON.reduce((acc, game) => {
    return (game.pledged < game.goal) ? acc + 1 : acc;
}, 0)

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `
    A total of $${challenge4b.toLocaleString('en-us')} has been raised for ${challenge4c} game${challenge6 > 1 ? "s" : ""}. 
    Currently ${challenge6} game${challenge6 > 1 ? "s" : ""} remain unfunded. We need your help to fund this games!

`

// create a new DOM element containing the template string and append it to the description container
const challenge6p = document.createElement("p");
challenge6p.innerHTML = displayStr;
descriptionContainer.appendChild(challenge6p);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames

const firstGameE = document.createElement("p");
const secondGameE = document.createElement("p");

firstGameE.innerHTML = `${firstGame.name}`;
secondGameE.innerHTML = `${secondGame.name}`;
firstGameContainer.appendChild(firstGameE);
secondGameContainer.appendChild(secondGameE);
// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item

//search for a specific game
const searchContainer = document.getElementById("search-container")
const searchBtn = document.getElementById("search-btn");

function searchForGame() {
    deleteChildElements(gamesContainer)

    let textBox = document.getElementById("textBox");
    if (!textBox) {
        textBox = document.createElement("input")
        textBox.setAttribute("id", "textBox")
        textBox.setAttribute("placeholder", "Search here...");

        searchContainer.appendChild(textBox)
    }

    
    textBox.addEventListener("input", function () {
        deleteChildElements(gamesContainer)
        const searchTerm = textBox.value.toLowerCase();
        const filteredGames = GAMES_JSON.filter(game => game.name.toLowerCase().includes(searchTerm));
        addGamesToPage(filteredGames);
    })
}
searchBtn.addEventListener("click", searchForGame)