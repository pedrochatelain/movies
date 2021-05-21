function init() {

    const input_search_movie = document.querySelector('.js-search-input')
    const helper_search_movie = document.querySelector('.js-helper-search-movie')
    const button_add_movie = document.querySelector('.js-button-add-movie')
    const info_card = document.querySelector('.js-info-card')
    const container_info_card = document.querySelector('.js-info-card-container')
    const message_success_card = document.querySelector('.js-movie-success-message')
    const container_calificar = document.querySelector('.js-container-calificar')
    const button_calificar = document.querySelector('.js-button-calificar')
    const icon_delete_card = document.querySelector('.js-icon-delete-card')
    const icon_arrow_calificar = document.querySelector('.js-arrow-calificar')
    const stars_container_calificar = document.querySelectorAll('.js-star-calificar')
    const button_cancelar_calificar = document.querySelector('.js-button-cancelar')
    const container_borrar = document.querySelector('.js-container-borrar')
    const button_borrar = document.querySelector('.js-button-borrar')
    const info_borrar = document.querySelector('.js-info-borrar')
    const message_deleted = document.querySelector('.js-msg-deleted')
    const button_cancelar_borrado = document.querySelector('.js-button-cancel-delete')
    const icon_arrow_delete = document.querySelector('.js-arrow-delete')
    const button_enviar_calificacion = document.querySelector('.js-enviar-calificacion')
    const mi_calificacion = document.querySelector('.js-mi-calificacion')
    const stars_my_rating = document.querySelectorAll('.js-star-my-rating')
    const icon_edit_card = document.querySelector('.js-icon-edit-card')

    if (window.location.pathname === '/card_mis_peliculas.html') {
        button_calificar.addEventListener('click', () => show_container(container_calificar))
        button_cancelar_calificar.addEventListener('click', () => hide_container(container_calificar))
        button_cancelar_borrado.addEventListener('click', () => hide_container(container_borrar))
        button_borrar.addEventListener('click', removeCard)
        button_enviar_calificacion.addEventListener('click', show_calificacion)
        icon_edit_card.addEventListener('click', () => show_container(container_calificar))
        icon_arrow_calificar.addEventListener('click', () => hide_container(container_calificar))
        icon_arrow_delete.addEventListener('click', () => hide_container(container_borrar))
        icon_delete_card.addEventListener('click', () => show_container(container_borrar))
        stars_container_calificar.forEach(star => star.addEventListener('click', cambiarPuntaje))
    }

    if (window.location.pathname === '/agregar_pelicula.html') {
        input_search_movie.addEventListener('focus', function() {
            helper_search_movie.classList.add('js-opacity-transition', 'js-opacity-0')
        })
    
        input_search_movie.addEventListener('focusout', function() {
            helper_search_movie.classList.remove('js-opacity-0')
        })

        button_add_movie.addEventListener('click', function() {
            info_card.classList.add('js-opacity-0', 'js-opacity-transition')
            button_add_movie.classList.add('js-opacity-0', 'js-opacity-transition')
            container_info_card.classList.add('change_background_color')
            setTimeout(function() {
                info_card.classList.add('js-display-none')
                button_add_movie.classList.add('js-display-none')
            }, 400)
            message_success_card.classList.add('js-opacity-transition')
            setTimeout(function() {
                message_success_card.classList.remove('js-opacity-0')
            }, 500)
        })
    }

    function show_container(container) {
        icon_delete_card.classList.add('js-opacity-0', 'js-opacity-transition')
        icon_edit_card.classList.add('js-opacity-0', 'js-opacity-transition')
        container.classList.add('js-show-container')
        info_card.classList.add('js-opacity-0', 'js-opacity-transition')
        button_calificar.classList.add('js-opacity-0', 'js-opacity-transition')
    }

    function show_calificacion(event) {
        const puntaje = event.target.parentNode.previousElementSibling.querySelector("span").innerHTML
        mi_calificacion.classList.remove('js-display-none')
        button_calificar.classList.add('js-display-none')
        for (let i = 0; i < puntaje; i++) {
            stars_my_rating[i].src = 'img/star_yellow.svg'
        }
        for (let j = puntaje; j < stars_my_rating.length; j++) {
            stars_my_rating[j].src = 'img/star_empty.svg'
        }
        hide_container(container_calificar)
    }

    function removeCard(event) {
        const card = event.path[4]
        container_borrar.classList.remove('js-show-container')
        info_borrar.classList.add('js-opacity-0', 'js-opacity-transition')
        container_borrar.classList.add('js-background-red')
        message_deleted.classList.add('js-opacity-transition')
        setTimeout( () => message_deleted.classList.remove('js-opacity-0'), 500)
        setTimeout( () => card.classList.add('js-opacity-0', 'js-opacity-transition'), 1300);
        setTimeout( () => card.remove(), 1800);
    }

    function hide_container(container) {
        container.classList.add('js-translate-left')
        container.classList.remove('js-show-container')
        info_card.classList.remove('js-display-none')
        info_card.classList.remove('js-opacity-0')
        icon_delete_card.classList.remove('js-opacity-0')
        if ( ! mi_calificacion.classList.contains('js-display-none') ) {
            icon_edit_card.classList.remove('js-display-none')
            icon_edit_card.classList.remove('js-opacity-0')
            button_calificar.classList.add('js-display-none')
        } else {
            button_calificar.classList.remove('js-display-none')
            button_calificar.classList.remove('js-opacity-0')
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

    function cambiarPuntaje(event) {
        let cant_previous_siblings = countPreviousSiblings(event.target)
        // Change image of previous stars
        for (let i = 0; i <= cant_previous_siblings; i++) {
            stars_container_calificar[i].src = 'img/star_yellow.svg'
        }
        // Change image of following stars
        for (let i = cant_previous_siblings + 1; i < stars_container_calificar.length; i++) {
            stars_container_calificar[i].src = 'img/star_empty.svg'
        }
        setCurrentRating(cant_previous_siblings + 1)
    }

    function setCurrentRating(cant) {
        document.querySelector('.js-cant-yellow-stars').innerHTML = cant
    }

}

init()