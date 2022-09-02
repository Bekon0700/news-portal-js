const loadData = async () => {
    try{
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
        const data = await res.json()
        console.log(data)
    }catch(err){
        console.log(err)
    }
}

loadData()