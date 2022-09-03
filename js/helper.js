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

const getSortOptions = (list, opt) => {
    console.log(list, opt)
    if(list.length){
        if(opt === 'ascending'){
            return list.sort(function (a, b) {
                return a.total_view - b.total_view;
            });
        }else{
            return list.sort(function (a, b) {
                return b.total_view - a.total_view;
            });
        }
    }

}

