function init() {

  const inputSearch = document.querySelector('.js-search-input')
  const helperSearchMovie = document.querySelector('.js-helper-search-movie')
  const buttonsAddMovie = document.querySelectorAll('.js-button-add-movie')
  const iconsDelete = document.querySelectorAll('.js-icon-delete')
  const iconsArrowsRate = document.querySelectorAll('.js-arrow-calificar')
  const buttonsCancelRate = document.querySelectorAll('.js-button-cancelar')
  const buttonsDelete = document.querySelectorAll('.js-button-borrar')
  const buttonsCancelDelete = document.querySelectorAll('.js-button-cancel-delete')
  const iconsArrowDelete = document.querySelectorAll('.js-arrow-delete')
  const buttonsSendRating = document.querySelectorAll('.js-enviar-calificacion');
  const iconsEditRating = document.querySelectorAll('.js-icon-edit-rating')
  const no_movies_msg = document.querySelector('.js-no-movies')
  const dotMyMovies = document.querySelector('.js-dot-my-movies')
  const dot_add_movies = document.querySelector('.js-dot-add-movie')
  const lupa = document.querySelector('.js-lupa')
  const buttonSearch = document.querySelector('.js-button-search')
  const loader = document.querySelector('.js-loader')
  const no_results_msg = document.querySelector('.js-no-results-msg')
  const buttonsRate = document.querySelectorAll('.js-button-rate')

  if (window.location.pathname === '/my_movies') {
   
    checkCards();

    dotMyMovies.classList.remove('js-display-none');
    
    buttonsCancelDelete.forEach(button => button.addEventListener('click', event => {
      const containerDelete = event.path[4].querySelector('.js-container-delete');
      hideContainer(containerDelete);
    }));
    
    iconsArrowDelete.forEach(icon => icon.addEventListener('click', event => {
      const containerDelete = event.path[3].querySelector('.js-container-delete');
      hideContainer(containerDelete);
    }));
    
    buttonsDelete.forEach(button => button.addEventListener('click', event => {
      const id_movie = event.path[4].querySelector('.js-movie-id').innerHTML;
      removeCard(event.path[4]);
      deleteMovie(id_movie);
    }));

    buttonsSendRating.forEach(button => button.addEventListener('click', event => {
      const card = event.path[3];
      const id_movie = card.querySelector('.js-movie-id').innerHTML;
      const rating = card.querySelector('.js-rating').innerHTML;
      showRating(card, rating);
      sendRating(rating, id_movie);
    }));

    iconsDelete.forEach(icon => icon.addEventListener('click', event => {
      const containerDelete = event.path[3].querySelector('.js-container-delete');
      showContainer(containerDelete);
    }));
    
    buttonsCancelRate.forEach(button => button.addEventListener('click', event => {
      const containerCalificar = event.path[2];
      hideContainer(containerCalificar);
    }));

    iconsArrowsRate.forEach(icon => icon.addEventListener('click', event => {
      const containerCalificar = event.path[2].querySelector('.js-rating-container');
      hideContainer(containerCalificar);
    }));
    
    iconsEditRating.forEach(icon => icon.addEventListener('click', event => {
      const containerCalificar = event.path[3].querySelector('.js-rating-container');
      const stars = document.querySelectorAll('.js-star');
      showContainer(containerCalificar);
      stars.forEach(star => star.addEventListener('click', changeRating))
    }));
    
    buttonsRate.forEach(button => button.addEventListener('click', event => {
      const ratingContainer = event.path[2].querySelector('.js-rating-container');
      const stars = document.querySelectorAll('.js-star');
      showContainer(ratingContainer);
      stars.forEach(star => star.addEventListener('click', changeRating))
    }));
  
  }

  function sendRating(rating, id_movie) {
    fetch('/my_movies', {
      method: 'PATCH',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'id': id_movie, 'rating': rating})
    });
  }

  function showRating(card, rating) {
    const myRating = card.querySelector('.js-rating-div');
    const ratingContainer = card.querySelector('.js-rating-container');
    myRating.classList.remove('js-display-none');
    setStars(card, rating);
    hideContainer(ratingContainer);
  }

  function setStars(card, rating) {
    const stars = card.querySelectorAll('.js-star-my-rating');
    for (let i = 0; i < rating; i++) {
      stars[i].src = 'img/star_yellow.svg'
    }
    for (let j = rating; j < stars.length; j++) {
      stars[j].src = 'img/star_empty.svg'
    }
  }

  function hideContainer(container) {
    const infoContainer = container.parentNode.querySelector('.js-info-container');
    const iconDelete = container.parentNode.querySelector('.js-icon-delete');
    const iconEdit = 
    container.parentNode.querySelector('.js-icon-edit-rating');
    const buttonRate =
    container.parentNode.querySelector('.js-button-rate');
    const myRating = container.parentNode.querySelector('.js-rating-div');

    container.classList.add('js-translate-left')
    container.classList.remove('js-show-container')
    infoContainer.classList.remove('js-display-none')
    infoContainer.classList.remove('js-opacity-0')
    iconDelete.classList.remove('js-opacity-0')
    if (! myRating.classList.contains('js-display-none') ) {
      iconEdit.classList.remove('js-display-none')
      iconEdit.classList.remove('js-opacity-0')
      buttonRate.classList.add('js-display-none')
    } else {
      buttonRate.classList.remove('js-display-none')
      buttonRate.classList.remove('js-opacity-0')
    }
  }

  if (window.location.pathname === '/add_movies') {

    dot_add_movies.classList.remove('js-display-none')

    inputSearch.addEventListener('focus', () => {
      lupa.classList.add('js-display-none');
      helperSearchMovie.classList.add('js-opacity-transition', 'js-opacity-0');
      buttonSearch.classList.remove('js-display-none');
      helperSearchMovie.addEventListener('transitionstart', () => {
        buttonSearch.classList.remove('js-opacity-0');
      })
      helperSearchMovie.addEventListener('transitionend', () => {
        helperSearchMovie.classList.add('js-display-none');
      })
    })

    buttonSearch.addEventListener('click', search)

    inputSearch.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') search();
    });

    buttonsAddMovie.forEach(button => button.addEventListener('click', event => {
      button.disabled = true // to prevent multiple clicks
      const movie = getMovie(event);
      sendMovie(movie);
      showMessageMovieAdded(event);
    }));

  }

  function sendMovie(movie) {
    fetch('/my_movies', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(movie)
    });
  }

  function getMovie(event) {
    return {
      'name': event.path[1].querySelector('.js-titulo').innerHTML.trim(),
      'director': event.path[1].querySelector('.js-director').innerHTML.trim(),
      'date': event.path[1].querySelector('.js-fecha').innerHTML.trim(),
      'rating': null,
      'image': event.path[1].parentNode.querySelector('.js-card-image').src
    };
  }

  function showMessageMovieAdded(event) {
    const info = event.path[1].querySelector('.js-info-card');
    const button = event.target;
    const containerInfo = event.path[2].querySelector('.js-info-card-container');
    const msgMovieAdded = event.path[2].querySelector('.js-msg-movie-added');

    info.classList.add('js-opacity-0', 'js-opacity-transition');
    button.classList.add('js-opacity-0', 'js-opacity-transition');
    containerInfo.classList.add('change_background_color');
    containerInfo.addEventListener('animationend', () => {
      button.classList.add('js-display-none');
      info.classList.add('js-display-none');
      msgMovieAdded.classList.add('js-opacity-transition');
      msgMovieAdded.classList.remove('js-opacity-0');
    });
  }

  function isInputEmpty() {
    return ! inputSearch.value.trim().length;
  }

  async function search() {
    if (!isInputEmpty()) {
      no_results_msg.classList.add('js-display-none')
      loader.classList.remove('js-display-none')
      document.querySelector('.js-cards-add-movies').innerHTML = '';
      const movies = await getMovies(inputSearch.value)
      if (movies.length == 0) {
        no_results_msg.classList.remove('js-display-none')
        loader.classList.add('js-display-none')
      } else {
        await showMovies(movies)
        reloadScript()
        loader.classList.add('js-display-none')
      }
    }
  }

  function reloadScript() {
    document.querySelector('script').remove()
    const myScript = document.createElement("script");
    myScript.setAttribute("src", "js/main.js");
    document.body.appendChild(myScript);
  }

  function showContainer(container) {
    const iconDeleteCard = container.parentNode.querySelector('.js-icon-delete');
    const iconEditRating = container.parentNode.querySelector('.js-icon-edit-rating');
    const info = container.parentNode.querySelector('.js-info-container');
    const buttonRate = container.parentNode.querySelector('.js-button-rate');

    iconDeleteCard.classList.add('js-opacity-0', 'js-opacity-transition')
    iconEditRating.classList.add('js-opacity-0', 'js-opacity-transition')
    container.classList.add('js-show-container')
    info.classList.add('js-opacity-0', 'js-opacity-transition')
    buttonRate.classList.add('js-opacity-0', 'js-opacity-transition')
  }

  async function removeCard(card) {
    showMessageDelete(card);
    await hideCard(card);
    card.addEventListener('animationend', () => {
      card.remove();
      checkCards();
    });
  }

  function checkCards() {
    if (document.querySelectorAll('.js-card').length == 0) {
      showNoMoviesMessage(300)
    }
  }

  function showMessageDelete(card) {
    const containerBorrar = card.querySelector('.js-container-delete');
    const infoBorrar = card.querySelector('.js-info-borrar');
    const messageDelete = card.querySelector('.js-msg-deleted');

    containerBorrar.classList.remove('js-show-container')
    infoBorrar.classList.add('js-opacity-0', 'js-opacity-transition')
    containerBorrar.classList.add('js-background-red')
    messageDelete.classList.add('js-opacity-transition')
    setTimeout(() => messageDelete.classList.remove('js-opacity-0'), 500)
  }

  function hideCard(card) {
    return new Promise(res => setTimeout(() => {
      card.classList.add('js-opacity-0', 'js-opacity-transition'),
      card.classList.add('js-thin-container')
      res('animation set')
    }, 1300));
  }

  function showNoMoviesMessage(delay) {
    no_movies_msg.classList.remove('js-display-none');
    setTimeout(() => no_movies_msg.classList.remove('js-opacity-0'), delay);
  }

  function deleteMovie(id_movie) {
    fetch('/my_movies', {
      method: 'DELETE',
      mode: 'cors',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({id: id_movie})
    });
  }

  function changeRating(event) {
    const stars = event.path[3].querySelectorAll('.js-star');
    const rating = getRating(event.target);
    const maxScore = 5;
    for(let i = 0; i < rating; i++) {
      stars[i].src = 'img/star_yellow.svg'
    }
    for (let i = rating; i < maxScore; i++) {
      stars[i].src = 'img/star_empty.svg'
    }
    // Change the number that indicates current rating
    event.path[2].querySelector('.js-rating').innerHTML = rating;
  }

  function getRating(clickedStar) {
    let count = 0
    while (clickedStar.previousElementSibling) {
      count++
      clickedStar = clickedStar.previousElementSibling
    }
    return count + 1
  }

}

init()