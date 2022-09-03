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

const contentCreator = (news) => {
    const newsDiv = document.getElementById('items_list')
    newsDiv.innerHTML = ``
    news.forEach(item => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const time = new Date(item.author.published_date)
        const date = time.toLocaleDateString('en-US', options)
        const newsDetailUrl = `https://openapi.programming-hero.com/api/news/${item._id}`
        const div = document.createElement('div')
        div.innerHTML = `
            <div class=" bg-white rounded-2xl py-6 pl-6 pr-8 flex flex-col lg:flex-row gap-6" onclick="loadModalINfo('${newsDetailUrl}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img src="${item.image_url}" alt="" class="w-[400px] h-[400px] rounded-2xl">
                <div class="flex flex-col justify-evenly gap-5 lg:gap-0">
                    <p class="text-3xl font-bold">${item.title}</p>
                    <p class=" truncate text-md text-gray-400 h-48 md:w-[220px] lg:w-[900px]">${item.details}</p>
                    <div class="flex flex-col gap-8 lg:flex-row lg:gap-0 justify-between">
                        <div class="flex items-center gap-4 lg:gap-4">
                            <img src="${item.author.img}" alt="" class="w-12 h-12 rounded-full">
                            <div>
                                <p>${item.author.name ? item.author.name : 'No value found'}</p>
                                <p class="text-gray-400">${date}</p>
                            </div>
                        </div>
                        <div class="text-lg font-semibold text-black flex items-center">
                            <p>view: ${item.total_view ? item.total_view + ' million' : 'No value found'}</p>
                        </div>
                        <button class="px-3 py-1 rounded-lg bg-blue-400 text-white">View More</button>
                    </div>
                </div>
            </div>
        `
        newsDiv.appendChild(div)
    })
}

