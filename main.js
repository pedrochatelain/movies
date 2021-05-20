function init() {

    const search_input = document.querySelector('.js-search-input')
    const helper = document.querySelector('.js-search-helper')
    const button_add_movie = document.querySelector('.js-button-add-movie')
    const info_card = document.querySelector('.js-info-card')
    const container_info_card = document.querySelector('.js-info-card-container')
    const message_success_card = document.querySelector('.js-movie-success-message')
    const container_puntuar = document.querySelector('.js-container-puntuar')
    const button_calificar = document.querySelector('.js-button_calificar')
    const icon_delete_card = document.querySelector('.js-icon-delete-card')
    const arrow_left = document.querySelector('.js-arrow-left')
    const stars = document.querySelectorAll('.js-star')
    const puntaje = document.querySelector('.js-puntaje')
    const button_cancelar = document.querySelector('.js-button-cancelar')
    const container_borrar = document.querySelector('.js-container-borrar')
    const button_borrar = document.querySelector('.js-button-borrar')
    const info_borrar = document.querySelector('.js-info-borrar')
    const message_deleted = document.querySelector('.js-msg-deleted')
    const button_cancelar_borrado = document.querySelector('.js-button-cancel-delete')
    const arrow_left_borrado = document.querySelector('.js-arrow-left-delete')
    const button_enviar_calificacion = document.querySelector('.js-enviar-calificacion')
    const mi_calificacion = document.querySelector('.js-mi-calificacion')
    const my_stars = document.querySelectorAll('.js-my-stars')
    const icon_edit_card = document.querySelector('.js-icon-edit-card')

    if (search_input) {
        search_input.addEventListener('focus', function() {
            helper.classList.add('js-opacity_transition', 'js-opacity_0')
        })

        search_input.addEventListener('focusout', function() {
            helper.classList.remove('js-opacity_0')
        })
    }

    if (button_add_movie) {
        button_add_movie.addEventListener('click', function() {
            // 1. Hide text and button
            info_card.classList.add('js-opacity_0', 'js-opacity_transition_card')
            button_add_movie.classList.add('js-opacity_0', 'js-opacity_transition_card')
            // 2. Change card background-color
            container_info_card.classList.add('change_background_color')
            // 3. Remove text and button
            setTimeout(function() {
                info_card.remove()
                button_add_movie.remove()
            }, 400)
            // 4. Show success message
            message_success_card.classList.add('js-opacity_transition_card')
            setTimeout(function() {
                message_success_card.classList.remove('js-opacity_0')
            }, 500)
        })
    }

    function show_rating_container() {
        info_card.classList.add('js-opacity_0', 'js-opacity_transition_card')
        button_calificar.classList.add('js-opacity_0', 'js-opacity_transition_card')
        icon_delete_card.classList.add('js-opacity_0', 'js-opacity_transition_card')
        icon_edit_card.classList.add('js-opacity_0', 'js-opacity_transition_card')
        setTimeout(function() {
            info_card.classList.add('js-display-none')
            button_calificar.classList.add('js-display-none')
            icon_delete_card.classList.add('js-display-none')
            icon_edit_card.classList.add('js-display-none')

        }, 300)
        container_puntuar.classList.add('js-show-container')
    }

    if (window.location.pathname === '/card_mis_peliculas.html') {
        button_calificar.addEventListener('click', () => show_rating_container())
        icon_edit_card.addEventListener('click', () => show_rating_container())
        arrow_left.addEventListener('click', hide_rating)
        button_cancelar.addEventListener('click', hide_rating)
        button_cancelar_borrado.addEventListener('click', hide_borrar)
        arrow_left_borrado.addEventListener('click', hide_borrar)
        stars.forEach(star => star.addEventListener('click', cambiarPuntaje))
        icon_delete_card.addEventListener('click', function() {
            info_card.classList.add('js-opacity_0', 'js-opacity_transition_card')
            button_calificar.classList.add('js-opacity_0', 'js-opacity_transition_card')
            icon_delete_card.classList.add('js-opacity_0', 'js-opacity_transition_card')
            if (icon_edit_card) {
                icon_edit_card.classList.add('js-opacity_0', 'js-opacity_transition_card')
            }
            // 2. Set display:none to elements
            setTimeout(function() {
                info_card.classList.add('js-display-none')
                button_calificar.classList.add('js-display-none')
                icon_delete_card.classList.add('js-display-none')
            }, 300)
            // 3. Show container
            container_borrar.classList.add('js-show-container')
        })
        button_borrar.addEventListener('click', function(event) {
            container_borrar.classList.remove('js-show-container')
            // 1. Hide text and button
            info_borrar.classList.add('js-opacity_0', 'js-opacity_transition_card')
            // 2. Change card background-color
            container_borrar.classList.add('js-background-red')
            // 3. Remove text and button
            setTimeout(function() {
                info_borrar.remove()
            }, 400)
            // 4. Show success message
            message_deleted.classList.add('js-opacity_transition_card')
            setTimeout(function() {
                message_deleted.classList.remove('js-opacity_0')
            }, 500)
            console.log(event.path[4])
            setTimeout(() => {
                event.path[4].classList.add('js-opacity_0', 'js-opacity_transition_card')
            }, 1300);
            setTimeout(() => {
                event.path[4].remove()
            }, 1800);
        })
        button_enviar_calificacion.addEventListener('click', function(event) {
            const puntaje = event.target.parentNode.previousElementSibling.querySelector("span").innerHTML
            mi_calificacion.classList.remove('js-display-none')
            button_calificar.remove()
            container_puntuar.classList.add('js-translate-left')
            container_puntuar.classList.remove('js-show-container')
            info_card.classList.remove('js-display-none')
            info_card.classList.remove('js-opacity_0')
            icon_delete_card.classList.remove('js-display-none')
            icon_delete_card.classList.remove('js-opacity_0')  
            icon_edit_card.classList.remove('js-display-none')
            icon_edit_card.classList.remove('js-opacity_0')  
            console.log(my_stars)  
            for (let i = 0; i < puntaje; i++) {
                my_stars[i].src = 'img/star_yellow.svg'
            }
            for (let j = puntaje; j < my_stars.length; j++) {
                my_stars[j].src = 'img/star_empty.svg'
            }
        })
    }

    function hide_rating() {
        container_puntuar.classList.add('js-translate-left')
        container_puntuar.classList.remove('js-show-container')
        info_card.classList.remove('js-display-none')
        info_card.classList.remove('js-opacity_0')
        button_calificar.classList.remove('js-display-none')
        button_calificar.classList.remove('js-opacity_0')
        icon_delete_card.classList.remove('js-display-none')
        icon_delete_card.classList.remove('js-opacity_0')
        if ( ! mi_calificacion.classList.contains('js-display-none') ) {
            icon_edit_card.classList.remove('js-display-none')
            icon_edit_card.classList.remove('js-opacity_0')
        }
        setTimeout(() => {
            puntaje.innerHTML = 1
            stars[0].src = 'img/star_yellow.svg'
            for (let i = 1; i < stars.length; i++) {
                stars[i].src = 'img/star_empty.svg'
            }
        }, 300);
    }

    function hide_borrar() {
        container_borrar.classList.add('js-translate-left')
        container_borrar.classList.remove('js-show-container')
        info_card.classList.remove('js-display-none')
        info_card.classList.remove('js-opacity_0')
        button_calificar.classList.remove('js-display-none')
        button_calificar.classList.remove('js-opacity_0')
        icon_delete_card.classList.remove('js-display-none')
        icon_delete_card.classList.remove('js-opacity_0')
        if ( ! mi_calificacion.classList.contains('js-display-none') ) {
            icon_edit_card.classList.remove('js-display-none')
            icon_edit_card.classList.remove('js-opacity_0')
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
            stars[i].src = 'img/star_yellow.svg'
        }
        // Change image of following stars
        for (let i = cant_previous_siblings + 1; i < stars.length; i++) {
            stars[i].src = 'img/star_empty.svg'
        }
        // Change number that indicates rating
        puntaje.innerHTML = cant_previous_siblings + 1
    }

}

init()