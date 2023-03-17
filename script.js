'use strict';
//Dom objects
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text')
const authorText = document.getElementById('author-text')
const btnTwitter = document.getElementById('btn-twitter')
const btnNewQuote = document.getElementById('btn-new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Loader 
function loading() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}
function loadingComplete() {
  quoteContainer.hidden = false;
  loader.hidden = true;

}

// tweet the quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// get new quote from API data
function getNewQuote() {
  loading();
  const newQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // set author name 
  authorText.textContent = newQuote.author ? newQuote.author : 'Anonymous';

  // check newQuote length to determine the style of quoteText
  if (newQuote.text.length > 60) {
    quoteText.classList.add('long-quote-text');
  } else {
    quoteText.classList.remove('long-quote-text');
  }
  console.log(newQuote.text.length);
  quoteText.textContent = newQuote.text;
  loadingComplete();
}

// get quote from API
async function getQuotesData() {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

  try {
    // fetch quote data from api in JSON format
    const response = await fetch('https://jacintodesign.github.io/quotes-api/data/quotes.json');

    // store fetched JSON data into object
    apiQuotes = await response.json();

  } catch (error) {

  }
  getNewQuote();
}



// add Event listerns to the buttons
btnTwitter.addEventListener('click', tweetQuote);
btnNewQuote.addEventListener('click', getNewQuote);

// On page load
getQuotesData();


