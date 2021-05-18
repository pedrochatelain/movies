function init() {

    const search_input = document.querySelector('.js-search-input')
    const helper = document.querySelector('.js-search-helper')
    const button_add_movie = document.querySelector('.js-button-add-movie')
    const info_card = document.querySelector('.js-info-card')
    const container_info_card = document.querySelector('.js-info-card-container')
    const message_success_card = document.querySelector('.js-movie-success-message')

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

    
}

init()