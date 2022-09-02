const showSpinner = () => {
    const spinner = document.getElementById('spinner')
    const newsDiv = document.getElementById('news_section')
    spinner.classList.remove('hidden')
    spinner.classList.add('flex')

    newsDiv.classList.remove('block')
    newsDiv.classList.add('hidden')
}

const hideSpinner = () => {
    const spinner = document.getElementById('spinner')
    const newsDiv = document.getElementById('news_section')
    spinner.classList.remove('flex')
    spinner.classList.add('hidden')

    newsDiv.classList.remove('hidden')
    newsDiv.classList.add('block')
}