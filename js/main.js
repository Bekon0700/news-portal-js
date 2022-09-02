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
    news.forEach(item => {
        console.log(item)
        const div = document.createElement('div')
        div.innerHTML = `
            <div class=" bg-white rounded-2xl py-6 pl-6 pr-8 flex gap-6" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img src="${item.image_url}" alt="" class="w-[400px] h-[400px] rounded-2xl">
                <div class="flex flex-col justify-evenly">
                    <p class="text-3xl font-bold">${item.title}</p>
                    <p class=" overflow-hidden text-ellipsis text-md text-gray-400 h-44">${item.details}</p>
                    <div class="flex justify-between">
                        <div class="flex items-center gap-3">
                            <img src="${item.author.img}" alt="" class="w-12 h-12 rounded-full">
                            <div>
                                <p>Author</p>
                                <p class="text-gray-400">time</p>
                            </div>
                        </div>
                        <div class="text-lg font-semibold text-black">
                            <p>view: ${item.total_view} million</p>
                        </div>
                        <button class="px-3 py-1 rounded-lg bg-blue-400 text-white">View More</button>
                    </div>
                </div>
            </div>
        `
        newsDiv.appendChild(div)
    })
}


loadCategoriesData()