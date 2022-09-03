const loadCategoriesData = async () => {
    try{
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
        const data = await res.json()
        showCategories(data.data.news_category)
    }catch(err){
        console.log(err)
    }
}


const showCategories = (data) => {
    const categoriesParentDiv = document.getElementById('categories')
    for(const category of data){
        const specificUrl = `https://openapi.programming-hero.com/api/news/category/${category.category_id}`
        const div = document.createElement('div')
        div.innerHTML = `
        <button onclick="return loadSpecificNews('${specificUrl}', '${category.category_name}')" id="${category.category_id}" class="px-4 py-1 rounded-md hover:text-blue-600 hover:bg-blue-100">${category.category_name}</button>
        ` 
        categoriesParentDiv.appendChild(div)
    }

}

const loadSpecificNews = async (url, category) => {
    showSpinner()
    try{
        const res = await fetch(url)
        const data = await res.json()
        showSpecificNews(data.data, category)
    }catch(err){
        console.log(err)
    }
    setTimeout(()=>{
        hideSpinner()
    }, 1000)
}


const showSpecificNews = (news, category) => {
    const itemDiv = document.getElementById('item_found')
    itemDiv.innerHTML = news.length ? `<p>${news.length} items found for category ${category} </p>` : `<p>Nothing found for category ${category}</p>`
    const newsDiv = document.getElementById('items_list')
    newsDiv.innerHTML = ``

    const selector = document.getElementById('sort-option')
    getSortOptions(news, selector.value)
    selector.addEventListener('change', (e)=> {
        getSortOptions(news, e.target.value)
    })

    news.forEach(item => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const time = new Date(item.author.published_date)
        const date = time.toLocaleDateString('en-US', options)
        const newsDetailUrl = `https://openapi.programming-hero.com/api/news/${item._id}`
        const div = document.createElement('div')
        div.innerHTML = `
            <div class=" bg-white rounded-2xl py-6 pl-6 pr-8 flex gap-6" onclick="loadModalINfo('${newsDetailUrl}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img src="${item.image_url}" alt="" class="w-[400px] h-[400px] rounded-2xl">
                <div class="flex flex-col justify-evenly">
                    <p class="text-3xl font-bold">${item.title}</p>
                    <p class=" truncate text-md text-gray-400 h-48 w-[900px]">${item.details}</p>
                    <div class="flex justify-between">
                        <div class="flex items-center gap-3">
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


const loadModalINfo = async (url) => {
    try{
        const res = await fetch(url)
        const data = await res.json()
        showModalData(data.data[0])
    }catch(err){
        console.log(err)
    }
}

const showModalData = data => {
    const modalTitle = document.getElementById('exampleModalLabel')
    const modalBody = document.getElementById('modalBody')
    modalTitle.innerText = data.title
    modalBody.innerHTML = `
        <p>Author name: ${data.author.name ? data.author.name : 'No data found'}</p>
        <p>Total Views: ${data.total_view ? data.total_view + ' million' : 'No data found'}</p>
        <p>Today's pick: ${data.others_info.is_todays_pick}</p>
        <p>Trending: ${data.others_info.is_trending}</p>
        <p>Rating: ${data.rating.number}</p>
        <p>Badge: ${data.rating.badge}</p>
    `
}


loadCategoriesData()