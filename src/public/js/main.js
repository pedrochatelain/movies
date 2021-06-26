function init() {
  const inputSearch = document.querySelector('.js-search-input');
  const helperSearchMovie = document.querySelector('.js-helper-search-movie');
  const iconsDelete = document.querySelectorAll('.js-icon-delete');
  const iconsArrowsRate = document.querySelectorAll('.js-arrow-calificar');
  const buttonsCancelRate = document.querySelectorAll('.js-button-cancelar');
  const buttonsDelete = document.querySelectorAll('.js-button-borrar');
  const buttonsCancelDelete = document.querySelectorAll(
    '.js-button-cancel-delete'
  );
  const iconsArrowDelete = document.querySelectorAll('.js-arrow-delete');
  const buttonsSendRating = document.querySelectorAll(
    '.js-enviar-calificacion'
  );
  const iconsEditRating = document.querySelectorAll('.js-icon-edit-rating');
  const no_movies_msg = document.querySelector('.js-no-movies');
  const dotMyMovies = document.querySelector('.js-dot-my-movies');
  const dotAddMovies = document.querySelector('.js-dot-add-movie');
  const lupa = document.querySelector('.js-lupa');
  const buttonSearch = document.querySelector('.js-button-search');
  const buttonSearchMobile = document.querySelector('.js-btn-search-mobile')
  const loader = document.querySelector('.js-loader');
  const messageNoResults = document.querySelector('.js-no-results-msg');
  const buttonsRate = document.querySelectorAll('.js-button-rate');
  const inputSearchMobile = document.querySelector('.js-search-input-mobile')
  const buttonsCardOptions = document.querySelectorAll('.js-button-card-options')
  const buttonsCloseInfo = document.querySelectorAll('.js-button-close-info')
  const buttonsDeleteMobile = document.querySelectorAll('.js-button-borrar-mobile')
  const buttonsCancelDeleteMobile = document.querySelectorAll('.js-button-cancel-delete-mobile')

  // Hide navigation bar when window resizes (mostly because of mobile keyboard)
  window.addEventListener('resize', () => {
    document.querySelector('.js-nav-mobile').classList.toggle('js-display-none');
  })

  if (window.location.pathname === '/my_movies') {
    checkCards();

    buttonsCancelDeleteMobile.forEach(button => {
      button.addEventListener('click', (event) => {
        const containerBorrar = event.currentTarget.parentNode.parentNode.parentNode
        hideContainerMobile(containerBorrar)
      })
    })

    function hideContainerMobile(container) {
      container.classList.add('js-translate-right-mobile')
    }

    buttonsDeleteMobile.forEach(button => {
      button.addEventListener('click', (event) => {
        const card = event.currentTarget.parentNode.parentNode
        showContainerBorrarMobile(card)
      })
    })

    function showContainerBorrarMobile(card) {
      const containerBorrar = card.querySelector('.js-container-delete');
      containerBorrar.classList.remove('js-translate-right-mobile')
      containerBorrar.classList.add('js-translate-left-mobile');
    }

    buttonsCloseInfo.forEach(button => {
      button.addEventListener('click', (event) => {
        const info = event.currentTarget.parentNode
        hideInfoMobile(info)
      })
    })

    buttonsCardOptions.forEach(button => {
      button.addEventListener('click', (event) => {
        const card = event.currentTarget.parentNode
        showInfo(card)
      })
    })

    function hideInfoMobile(info) {
      info.classList.add('js-translate-right-mobile')
      info.addEventListener('animationend', function hide() {
        info.classList.remove('js-translate-left-mobile')
        info.classList.remove('js-translate-right-mobile')
        info.removeEventListener('animationend', hide)
      })
    }

    function showInfo(card) {
      const info = card.querySelector('.js-info-container')
      info.classList.add('js-translate-left-mobile')
    }

    dotMyMovies.classList.remove('js-display-none');

    buttonsCancelDelete.forEach((button) =>
      button.addEventListener('click', (event) => {
        const containerDelete = event.path[4].querySelector(
          '.js-container-delete'
        );
        hideContainer(containerDelete);
      })
    );

    iconsArrowDelete.forEach((icon) =>
      icon.addEventListener('click', (event) => {
        const containerDelete = event.path[3].querySelector(
          '.js-container-delete'
        );
        hideContainer(containerDelete);
      })
    );

    buttonsDelete.forEach((button) =>
      button.addEventListener('click', (event) => {
        const id_movie = event.path[4].querySelector('.js-movie-id').innerHTML;
        removeCard(event.path[4]);
        deleteMovie(id_movie);
      })
    );

    buttonsSendRating.forEach((button) =>
      button.addEventListener('click', (event) => {
        const card = event.path[3];
        const id_movie = card.querySelector('.js-movie-id').innerHTML;
        const rating = card.querySelector('.js-rating').innerHTML;
        showRating(card, rating);
        sendRating(rating, id_movie);
      })
    );

    iconsDelete.forEach((icon) =>
      icon.addEventListener('click', (event) => {
        const containerDelete = event.path[3].querySelector(
          '.js-container-delete'
        );
        showContainer(containerDelete);
      })
    );

    buttonsCancelRate.forEach((button) =>
      button.addEventListener('click', (event) => {
        const containerCalificar = event.path[2];
        hideContainer(containerCalificar);
      })
    );

    iconsArrowsRate.forEach((icon) =>
      icon.addEventListener('click', (event) => {
        const containerCalificar = event.path[2].querySelector(
          '.js-rating-container'
        );
        hideContainer(containerCalificar);
      })
    );

    iconsEditRating.forEach((icon) =>
      icon.addEventListener('click', (event) => {
        const containerCalificar = event.path[3].querySelector(
          '.js-rating-container'
        );
        const stars = document.querySelectorAll('.js-star');
        showContainer(containerCalificar);
        stars.forEach((star) => star.addEventListener('click', changeRating));
      })
    );

    buttonsRate.forEach((button) =>
      button.addEventListener('click', (event) => {
        const ratingContainer = event.path[2].querySelector(
          '.js-rating-container'
        );
        const stars = document.querySelectorAll('.js-star');
        showContainer(ratingContainer);
        stars.forEach((star) => star.addEventListener('click', changeRating));
      })
    );
  }

  function sendRating(rating, id_movie) {
    fetch('/my_movies', {
      method: 'PATCH',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id_movie, rating: rating }),
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
      stars[i].src = 'img/star_yellow.svg';
    }
    for (let j = rating; j < stars.length; j++) {
      stars[j].src = 'img/star_empty.svg';
    }
  }

  function hideContainer(container) {
    const infoContainer =
      container.parentNode.querySelector('.js-info-container');
    const iconDelete = container.parentNode.querySelector('.js-icon-delete');
    const iconEdit = container.parentNode.querySelector('.js-icon-edit-rating');
    const buttonRate = container.parentNode.querySelector('.js-button-rate');
    const myRating = container.parentNode.querySelector('.js-rating-div');

    container.classList.add('js-translate-left');
    container.classList.remove('js-show-container');
    infoContainer.classList.remove('js-display-none');
    infoContainer.classList.remove('js-opacity-0');
    iconDelete.classList.remove('js-opacity-0');
    if (!myRating.classList.contains('js-display-none')) {
      iconEdit.classList.remove('js-display-none');
      iconEdit.classList.remove('js-opacity-0');
      buttonRate.classList.add('js-display-none');
    } else {
      buttonRate.classList.remove('js-display-none');
      buttonRate.classList.remove('js-opacity-0');
    }
  }

  if (window.location.pathname === '/add_movies') {
    dotAddMovies.classList.remove('js-display-none');

    inputSearchMobile.addEventListener('focus', () =>{
      inputSearchMobile.classList.add('js-background-image-none')
      hideHelperMobile();
    })    

    inputSearchMobile.addEventListener('focusout', () => {
      if (isInputEmpty(inputSearchMobile)) {
        inputSearchMobile.classList.remove('js-background-image-none')
      }
    })

    inputSearchMobile.addEventListener('keyup', () => {
      if (isInputEmpty(inputSearchMobile)) {
        buttonSearchMobile.classList.add('js-display-none');
      } else {
        buttonSearchMobile.classList.remove('js-display-none');
      }
    })

    function hideHelperMobile() {
      const helper = document.querySelector('.js-helper-mobile');
      helper.classList.add('js-display-none');
    }

    buttonSearchMobile.addEventListener('click', async (event) => {
      buttonSearchMobile.classList.add('js-display-none');
      showLoadingMobile()
      const nameMovie = event.currentTarget.parentNode.querySelector('.js-search-input-mobile').value;
      inputSearchMobile.remove();
      const movies = await getMovies(nameMovie)
      await showMovies(movies)
      initCards();
      hideLoadingMobile()
      document.querySelector('.js-helper-mobile').remove()
    })

    function showLoadingMobile() {
      document.querySelector('.js-loader-mobile').classList.remove('js-display-none');
    }

    function hideLoadingMobile() {
      document.querySelector('.js-loader-mobile').classList.add('js-display-none');
    }

    inputSearch.addEventListener('focus', () => {
      lupa.classList.add('js-display-none');
      helperSearchMovie.classList.add('js-opacity-transition', 'js-opacity-0');
      buttonSearch.classList.remove('js-display-none');
      helperSearchMovie.addEventListener('transitionstart', () => {
        buttonSearch.classList.remove('js-opacity-0');
      });

    });

    buttonSearch.addEventListener('click', () => {
      if (!isInputEmpty(inputSearch)) {
        search();
        helperSearchMovie.classList.add(
          'js-opacity-transition',
          'js-opacity-0',
          'js-display-none'
        );
      }
    });

    inputSearch.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' && !isInputEmpty(inputSearch)) {
        search();
      }
    });

    inputSearch.addEventListener('focusout', () => {
      if (!userSearched()) {
        helperSearchMovie.classList.remove(
          'js-opacity-transition',
          'js-opacity-0',
          'js-display-none'
        );
      }
    });
  }

  function userSearched() {
    return (
      document.contains(document.querySelector('.js-card-add-movie')) ||
      !messageNoResults.classList.contains('js-display-none')
    );
  }

  function isInputEmpty(input) {
    return !input.value.trim().length;
  }

  async function search() {
    messageNoResults.classList.add('js-display-none');
    loader.classList.remove('js-display-none');
    document.querySelector('.js-cards-add-movies').innerHTML = '';
    const movies = await getMovies(inputSearch.value);
    if (movies.length == 0) {
      messageNoResults.classList.remove('js-display-none');
      loader.classList.add('js-display-none');
    } else {
      await showMovies(movies);
      initCards();
      loader.classList.add('js-display-none');
    }
  }

  async function getMovies(nameMovie) {
    const response = await fetch(`/movies_api/${nameMovie}`);
    const movies = await response.json();
    return movies;
  }

  async function getMovie(id) {
    const response = await fetch(`/movies_api/id/${id}`);
    const movie = await response.json();
    return movie;
  }

  async function showMovies(movies) {
    const response = await fetch('templates/cards.ejs');
    const cards_template = await response.text();
    const cards = ejs.render(cards_template, {
      movies: movies,
    });
    document.querySelector('.js-cards-add-movies').innerHTML = cards;
  }

  function showContainer(container) {
    const iconDeleteCard =
      container.parentNode.querySelector('.js-icon-delete');
    const iconEditRating = container.parentNode.querySelector(
      '.js-icon-edit-rating'
    );
    const info = container.parentNode.querySelector('.js-info-container');
    const buttonRate = container.parentNode.querySelector('.js-button-rate');

    iconDeleteCard.classList.add('js-opacity-0', 'js-opacity-transition');
    iconEditRating.classList.add('js-opacity-0', 'js-opacity-transition');
    container.classList.add('js-show-container');
    info.classList.add('js-opacity-0', 'js-opacity-transition');
    buttonRate.classList.add('js-opacity-0', 'js-opacity-transition');
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
      showNoMoviesMessage(300);
    }
  }

  function showMessageDelete(card) {
    const containerBorrar = card.querySelector('.js-container-delete');
    const infoBorrar = card.querySelector('.js-info-borrar');
    const messageDelete = card.querySelector('.js-msg-deleted');

    containerBorrar.classList.remove('js-show-container');
    infoBorrar.classList.add('js-opacity-0', 'js-opacity-transition');
    containerBorrar.classList.add('js-background-red');
    messageDelete.classList.add('js-opacity-transition');
    setTimeout(() => messageDelete.classList.remove('js-opacity-0'), 500);
  }

  function hideCard(card) {
    return new Promise((res) =>
      setTimeout(() => {
        card.classList.add('js-opacity-0', 'js-opacity-transition'),
          card.classList.add('js-thin-container');
        res('animation set');
      }, 1300)
    );
  }

  function showNoMoviesMessage(delay) {
    no_movies_msg.classList.remove('js-display-none');
    setTimeout(() => no_movies_msg.classList.remove('js-opacity-0'), delay);
  }

  function deleteMovie(id_movie) {
    fetch('/my_movies', {
      method: 'DELETE',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id_movie }),
    });
  }

  function changeRating(event) {
    const stars = event.path[3].querySelectorAll('.js-star');
    const rating = getRating(event.target);
    const maxScore = 5;
    for (let i = 0; i < rating; i++) {
      stars[i].src = 'img/star_yellow.svg';
    }
    for (let i = rating; i < maxScore; i++) {
      stars[i].src = 'img/star_empty.svg';
    }
    // Change the number that indicates current rating
    event.path[2].querySelector('.js-rating').innerHTML = rating;
  }

  function getRating(clickedStar) {
    let count = 0;
    while (clickedStar.previousElementSibling) {
      count++;
      clickedStar = clickedStar.previousElementSibling;
    }
    return count + 1;
  }

  // ADD MOVIE CARD JS
  function initCards() {
    const buttonsAddMovie = document.querySelectorAll('.js-button-add-movie');
    const buttonsInfo = document.querySelectorAll('.js-button-info');
    const buttonsExitInfo = document.querySelectorAll('.js-button-exit-info');

    buttonsInfo.forEach((button) => button.addEventListener('click', (event) => {
      showInfo(event);
    }));
    buttonsExitInfo.forEach((button) =>
      button.addEventListener('click', hideInfo)
    );
    buttonsAddMovie.forEach((button) =>
      button.addEventListener('click', async (event) => {
        const button = event.currentTarget;
        setLoading(button);
        const id =
          button.parentNode.parentNode.querySelector('#js-movie-id').innerHTML;
        const movie = await getMovie(id);
        await addMovie(movie);
        addedSuccesfully(button);
      })
    );

    async function showInfo(event) {
      const id =
        event.currentTarget.parentNode.parentNode.querySelector(
          '#js-movie-id'
        ).innerHTML;
      showLoaderInfo(event);
      const info =
        event.currentTarget.parentNode.parentNode.querySelector(
          '.js-info-movie'
        );
      const movie = await getMovie(id);
      info
        .querySelector('.js-info-container')
        .classList.remove('js-display-none');
      info.querySelector('.js-movie-title').innerHTML = movie.name;
      info.querySelector('.js-movie-director').innerHTML = movie.director;
      info.querySelector('.js-movie-date').innerHTML = movie.releaseDate;
      info.querySelector('.js-loader-info').classList.add('js-display-none');
      const buttonAddMovie = info.parentNode.querySelector('.js-button-add-movie')
      console.log(buttonAddMovie)
      buttonAddMovie.classList.remove('js-display-none')
    }

    function showLoaderInfo(event) {
      const infoContainer = event.currentTarget.parentNode.parentNode.querySelector('.js-info-movie');
      infoContainer.classList.remove('js-hide-info');
      infoContainer.classList.add('js-show-info');
    }

    function hideInfo(event) {
      const info = event.path[3].querySelector('.js-info-movie');
      info.classList.remove('js-show-info');
      info.classList.add('js-hide-info');
    }

    function setLoading(button) {
      let textButton = button.querySelector('.js-button-add-movie-text');
      textButton.innerHTML = 'Agregando';
      button.parentNode.querySelector('.js-icon-plus').remove();
      button.parentNode
        .querySelector('.js-loader')
        .classList.remove('js-display-none');
      button.classList.add('js-no-hover');
      button.disabled = true;
    }

    // displays message movie was succesfully added to my movies
    function addedSuccesfully(event) {
      const message = event.parentNode.querySelector('.js-msg-add');
      event.classList.add('js-display-none');
      message.classList.remove('js-display-none');
    }

    async function addMovie(movie) {
      const query = await fetch('/my_movies', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movie),
      });
      const response = await query.json()
      console.log(response)
    }
  }
}

init();
