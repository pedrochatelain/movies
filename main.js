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

    if (search_input) {
        search_input.addEventListener('focus', function() {
            helper.classList.add('opacity_transition', 'opacity_0')
        })

        search_input.addEventListener('focusout', function() {
            helper.classList.remove('opacity_0')
        })
    }

    if (button_add_movie) {
        console.log(info_card)
        button_add_movie.addEventListener('click', function() {
            // 1. Hide text and button
            info_card.classList.add('opacity_0', 'opacity_transition_card')
            button_add_movie.classList.add('opacity_0', 'opacity_transition_card')
            // 2. Change card background-color
            container_info_card.classList.add('change_background_color')
            // 3. Remove text and button
            setTimeout(function() {
                info_card.remove()
                button_add_movie.remove()
            }, 400)
            // 4. Show success message
            message_success_card.classList.add('opacity_transition_card')
            setTimeout(function() {
                message_success_card.classList.remove('opacity_0')
            }, 500)
        })
    }

    if (button_calificar) {
        button_calificar.addEventListener('click', function() {
            // 1. Hide buttons and text

            info_card.classList.add('opacity_0', 'opacity_transition_card')
            button_calificar.classList.add('opacity_0', 'opacity_transition_card')
            icon_delete_card.classList.add('opacity_0', 'opacity_transition_card')
            
            // 2. Set display:none to elements
            setTimeout(function() {
                info_card.classList.add('js-display-none')
                button_calificar.classList.add('js-display-none')
                icon_delete_card.classList.add('js-display-none')
            }, 300)
            // 3. Show container
            container_puntuar.classList.add('js-show-container-puntuar')
        })
    }

    if (arrow_left) {
        arrow_left.addEventListener('click', hide_rating)
        button_cancelar.addEventListener('click', hide_rating)
    }

    function hide_rating() {
        container_puntuar.classList.add('js-translate-left')
        container_puntuar.classList.remove('js-show-container-puntuar')
        info_card.classList.remove('js-display-none')
        info_card.classList.remove('opacity_0')
        button_calificar.classList.remove('js-display-none')
        button_calificar.classList.remove('opacity_0')
        icon_delete_card.classList.remove('js-display-none')
        icon_delete_card.classList.remove('opacity_0')
        setTimeout(() => {
            puntaje.innerHTML = 1
            stars[0].src = 'img/star_yellow.svg'
            for (let i = 1; i < stars.length; i++) {
                stars[i].src = 'img/star_empty.svg'
            }
        }, 300);
    }

    if (stars) {
        stars.forEach(star => star.addEventListener('click', cambiarPuntaje))
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