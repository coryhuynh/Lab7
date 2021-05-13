// script.js
import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
const returnState = router.returnState
//get rid of index.html
setState(null, "Journal Entries", "");

const location = window.location;

// Make sure you register your service worker here too
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
});

//Change to settings page and set state 
document.querySelector("[alt='settings']").addEventListener('click', ()=>{
  const url = "#settings";
  //if already on the setings page button does nothing
  if(location.hash != url) {
    document.body.className = "settings";
    setState(null, "Settings", url);
  }
});

//On header click change to home page
const headerTitle = document.getElementsByTagName("h1")[0];
headerTitle.addEventListener('click', ()=>{
  const url = "index.html";
  //If already on homepage the click does nothing
  if(location.hash != ""){
    document.body.classList.remove("settings");
    document.body.classList.remove("single-entry");
    setState(null, "Journal Entries", url);
  }
});

//onclick on main, event.target is the child you are clicking
const main = document.querySelector('main');
main.addEventListener("click", (event)=>{
    let entries = main.childNodes;
    //get which child index you are clicking on
    let index = [].indexOf.call(entries, event.target) + 1;
    let url = "#entry" + index;
    let title = "Entry " + index;
    let state = {entry: index};
    let newPost = document.createElement('entry-page');
    
    newPost.entry = event.target.entry;
    document.querySelector('entry-page').remove();
    document.querySelector('body').appendChild(newPost);
    document.body.className = "single-entry";

    setState(state, title, url);

});

//on return or forward
window.addEventListener('popstate', (event)=>{
  router.returnState(event);
});

