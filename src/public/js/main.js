function init() {

    const input_search_movie = document.querySelector('.js-search-input')
    const helper_search_movie = document.querySelector('.js-helper-search-movie')
    const button_add_movie = document.querySelectorAll('.js-button-add-movie')
    const info_card = document.querySelectorAll('.js-info-card')
    const container_info_card = document.querySelectorAll('.js-info-card-container')
    const message_success_card = document.querySelectorAll('.js-movie-success-message')
    const container_calificar = document.querySelectorAll('.js-container-calificar')
    const button_calificar = document.querySelectorAll('.js-button-calificar')
    const icon_delete_card = document.querySelectorAll('.js-icon-delete-card')
    const icon_arrow_calificar = document.querySelectorAll('.js-arrow-calificar')
    const button_cancelar_calificar = document.querySelectorAll('.js-button-cancelar')
    const container_borrar = document.querySelectorAll('.js-container-borrar')
    const button_borrar = document.querySelectorAll('.js-button-borrar')
    const info_borrar = document.querySelectorAll('.js-info-borrar')
    const message_deleted = document.querySelectorAll('.js-msg-deleted')
    const button_cancelar_borrado = document.querySelectorAll('.js-button-cancel-delete')
    const icon_arrow_delete = document.querySelectorAll('.js-arrow-delete')
    const button_enviar_calificacion = document.querySelectorAll('.js-enviar-calificacion')
    const mi_calificacion = document.querySelectorAll('.js-mi-calificacion')
    const icon_edit_card = document.querySelectorAll('.js-icon-edit-card')
    const stars_container_calificar = document.querySelectorAll('.js-star-calificar')
    const no_movies_msg = document.querySelector('.js-no-movies')
    const dot_my_movies = document.querySelector('.js-dot-my-movies')
    const dot_add_movies = document.querySelector('.js-dot-add-movie')
    const lupa = document.querySelector('.js-lupa')
    const button_search = document.querySelector('.js-button-search')
    const loader = document.querySelector('.js-loader')
    const no_results_msg = document.querySelector('.js-no-results-msg')

    if (window.location.pathname === '/my_movies') {
        dot_my_movies.classList.remove('js-display-none')
        button_cancelar_calificar.forEach( (button, index) => { button.addEventListener('click', () => hide_container(container_calificar[index], index) )})
        button_cancelar_borrado.forEach( (button, index) => { button.addEventListener('click', () => hide_container(container_borrar[index], index) )})
        button_borrar.forEach( (button, index) => { button.addEventListener('click', (event) => removeCard(event, index) )})
        button_enviar_calificacion.forEach( (button, index) => { button.addEventListener('click', (event) => show_calificacion(event, index) )})
        icon_arrow_delete.forEach( (icon, index) => { icon.addEventListener('click', () => hide_container(container_borrar[index], index) )})
        icon_delete_card.forEach( (icon, index) => { icon.addEventListener('click', () => show_container(container_borrar[index], index) )})
        icon_arrow_calificar.forEach( (icon, index) => { icon.addEventListener('click', () => hide_container(container_calificar[index], index) )})
        icon_edit_card.forEach( (icon, index) => { icon.addEventListener('click', () => show_container(container_calificar[index], index) )})
        button_calificar.forEach( (button, index) => { button.addEventListener('click', () => show_container(container_calificar[index], index) )})
        stars_container_calificar.forEach( (star, index) => { star.addEventListener('click', (event) => cambiarPuntaje(event, index) )})
    }

    if (window.location.pathname === '/add_movies') {

        dot_add_movies.classList.remove('js-display-none')

        input_search_movie.addEventListener('focus', function() {
            helper_search_movie.classList.add('js-opacity-transition', 'js-opacity-0')
            button_search.classList.remove('js-display-none')
            lupa.classList.add('js-opacity-transition', 'js-opacity-0')
            setTimeout(() => button_search.classList.remove('js-opacity-0'), 400)
            setTimeout(() => helper_search_movie.classList.add('js-display-none'), 500)
        })

        button_search.addEventListener('click', function() {
            if ( ! isInputEmpty() )
                search()
        })

        input_search_movie.addEventListener('keypress', function (event) {
            if (event.key === 'Enter' && ! isInputEmpty())
                search()
        });

        stars_container_calificar.forEach( (star, index) => { 
            star.addEventListener('click', (event) => cambiarPuntaje(event, index)
        )})

        button_add_movie.forEach( (button, index) => {
            button.addEventListener('click', function() {
                info_card[index].classList.add('js-opacity-0', 'js-opacity-transition')
                button.classList.add('js-opacity-0', 'js-opacity-transition')
                container_info_card[index].classList.add('change_background_color')
                setTimeout(function() {
                    info_card[index].classList.add('js-display-none')
                    button.classList.add('js-display-none')
                }, 400)
                message_success_card[index].classList.add('js-opacity-transition')
                setTimeout(function() {
                    message_success_card[index].classList.remove('js-opacity-0')
                }, 500)
            })
        });
    }

    function isInputEmpty() {
        return ! input_search_movie.value.trim().length;
    }

    async function search() {
        no_results_msg.classList.add('js-display-none')
        loader.classList.remove('js-display-none')    
        document.querySelector('.js-cards-add-movies').innerHTML = '';
        const movies = await getMovies(input_search_movie.value)
        if (movies.length == 0) {
            no_results_msg.classList.remove('js-display-none')
            loader.classList.add('js-display-none')    
        } else {
            await showMovies(movies)
            reloadScript()
            loader.classList.add('js-display-none')
        }
    }

    function reloadScript() {
        document.querySelector('script').remove()
        const myScript = document.createElement("script");
        myScript.setAttribute("src", "js/main.js");
        document.body.appendChild(myScript);            
    }

    function show_container(container, index) {
        icon_delete_card[index].classList.add('js-opacity-0', 'js-opacity-transition')
        icon_edit_card[index].classList.add('js-opacity-0', 'js-opacity-transition')
        container.classList.add('js-show-container')
        info_card[index].classList.add('js-opacity-0', 'js-opacity-transition')
        button_calificar[index].classList.add('js-opacity-0', 'js-opacity-transition')
    }

    function show_calificacion(event, index) {
        const puntaje = event.target.parentNode.previousElementSibling.querySelector("span").innerHTML
        const stars = event.target.parentNode.parentNode.parentNode.querySelectorAll('.js-star-my-rating')
        mi_calificacion[index].classList.remove('js-display-none')
        button_calificar[index].classList.add('js-display-none')
        for (let i = 0; i < puntaje; i++) {
            stars[i].src = 'img/star_yellow.svg'
        }
        for (let j = puntaje; j < stars.length; j++) {
            stars[j].src = 'img/star_empty.svg'
        }
        hide_container(container_calificar[index], index)
    }

    function removeCard(event, index) {
        const card = event.path[4]
        container_borrar[index].classList.remove('js-show-container')
        info_borrar[index].classList.add('js-opacity-0', 'js-opacity-transition')
        container_borrar[index].classList.add('js-background-red')
        message_deleted[index].classList.add('js-opacity-transition')
        setTimeout( () => message_deleted[index].classList.remove('js-opacity-0'), 500)
        setTimeout( function() {
            card.classList.add('js-opacity-0', 'js-opacity-transition')
            card.classList.add('js-thin-container')
        }, 1300)
        setTimeout(() => {
            card.remove()
            // if there are no cards left...
            if ( document.querySelectorAll('.js-card').length == 0 ) {
                no_movies_msg.classList.remove('js-display-none')
                setTimeout(() => {
                    no_movies_msg.classList.remove('js-opacity-0')
                }, 1000);
            }
        }, 1900);
    }

    function hide_container(container, index) {
        container.classList.add('js-translate-left')
        container.classList.remove('js-show-container')
        info_card[index].classList.remove('js-display-none')
        info_card[index].classList.remove('js-opacity-0')
        icon_delete_card[index].classList.remove('js-opacity-0')
        if ( ! mi_calificacion[index].classList.contains('js-display-none') ) {
            icon_edit_card[index].classList.remove('js-display-none')
            icon_edit_card[index].classList.remove('js-opacity-0')
            button_calificar[index].classList.add('js-display-none')
        } else {
            button_calificar[index].classList.remove('js-display-none')
            button_calificar[index].classList.remove('js-opacity-0')
        }
    }

    function countPreviousSiblings(element) {
        let count = 0
        while (element.previousElementSibling) {
            count++
            element = element.previousElementSibling
        }
        return count
    }

    function cambiarPuntaje(event, index) {
        const cant_previous_siblings = countPreviousSiblings(event.target)
        // Change image of previous stars
        for (let i = index; i > index - cant_previous_siblings; i--) {
            stars_container_calificar[i].src = 'img/star_yellow.svg'
        }
        const firstEmptyStar = index + 1;
        const lastStar = index - cant_previous_siblings + 4;
        // Change image of following stars
        for (let i = firstEmptyStar; i <= lastStar; i++) {
            stars_container_calificar[i].src = 'img/star_empty.svg'
        }
        // Change the number that indicates current rating
        event.path[2].querySelector('.js-cant-yellow-stars').innerHTML = cant_previous_siblings + 1
    }

}

init()