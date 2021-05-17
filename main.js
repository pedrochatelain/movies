function init() {

    const search_input = document.querySelector('.js-search-input')
    const helper = document.querySelector('.js-search-helper')

    search_input.addEventListener('focus', function() {
        helper.classList.add('opacity_transition', 'hidden')
    })

    search_input.addEventListener('focusout', function() {
        helper.classList.remove('hidden')
    })



}

init()