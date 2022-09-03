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
    itemDiv.innerHTML = news.length ? `<p class="px-2">${news.length} items found for category ${category} </p>` : `<p class="px-2">Nothing found for category ${category}</p>`
    

    const selector = document.getElementById('sort-option')
    getSortOptions(news, selector.value)
    contentCreator(news)
    selector.addEventListener('change', (e)=> {
        getSortOptions(news, e.target.value)
        contentCreator(news)
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

const isNews = document.getElementById('news')
const isBlog = document.getElementById('blog')
const fullNewsDiv = document.getElementById('fullNewsDiv')
const fullBlogDiv = document.getElementById('fullBlogDiv')

isNews.addEventListener('click', (e)=>{
    const newsBtn = e.target
    newsBtn.classList.add('text-blue-600')
    isBlog.classList.remove('text-blue-600')

    fullNewsDiv.classList.remove('hidden')
    fullNewsDiv.classList.add('block')
    fullBlogDiv.classList.add('hidden')


})
isBlog.addEventListener('click', (e)=>{
    const blogBtn = e.target

    blogBtn.classList.add('text-blue-600')
    isNews.classList.remove('text-blue-600')

    fullBlogDiv.classList.remove('hidden')
    fullBlogDiv.classList.add('block')
    fullNewsDiv.classList.add('hidden')

})






loadCategoriesData()