/* eslint-disable consistent-return */

const div = document.querySelector('.cards');
const fetchdata = async () => {
  const data = await fetch('https://api.tvmaze.com/shows');
  try {
    const response = await data.json();
    for (let movies = 0; movies <= 15; movies += 1) {
      const card = document.createElement('div');
      card.classList.add('card');
      const movie = response[movies];
      card.id = `${movie.id}`;
      card.innerHTML += `
                <p><span>${movie.name}</span><i class="bi bi-heart-fill"></i><i class = "likes">5 likes</i></p>
                <button>comments</button>
      `;
      card.style.backgroundImage = `url(${movie.image.medium})`;
      div.append(card);
    }
  } catch (error) {
    return error;
  }
};

const popupDetails = async (id) => {
  const data = await fetch(`https://api.tvmaze.com/shows/${id}`);
  try {
    const response = await data.json();
    const body = document.querySelector('body');
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
    <span class="close">&times;</span>
    <div class="movie"></div>
    <h2>${response.name}</h2>
    <p class = "rating"><span>Imbd rating : ${response.rating.average}</span><span>Average Length: ${response.averageRuntime}min</span></p>
    <p class = "info"><span>Genre(s) : ${response.genres}</span><span>Premiered: ${response.premiered}</span></p>
    <ul class="comments">
        <li>12:78 Best movie I ever watched</li>
    </ul>
   <form action="#">
    <input type="text" placeholder="Your name">
    <textarea name="comments"  class = "add-comment" placeholder="Comment"></textarea>
    <button type="submit" id = "submit">Comment</button>
   </form>
    `;
    body.append(popup);
    const image = document.querySelector('.movie');
    image.style.backgroundImage = `url(${response.image.original})`;
  } catch (error) {
    return error;
  }
};

export { fetchdata, popupDetails };
