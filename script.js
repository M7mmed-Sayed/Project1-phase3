// local api to get courses
const getAllCourses = 'https://mocki.io/v1/696ac62f-fa19-470a-bd4b-89d75685ca88'
// make it globle to limit wasting time to load the data
let data
async function callGetAPI(url) {
    const response = await fetch(url)
    data = await response.json()
    let search = '' // search by defualt value empty string
    showCourses(search)
}
callGetAPI(getAllCourses)

function showCourses(search) {
    let courses_continer = ''
    search = search.toLowerCase() // make it lowercase to search on all cases
    for (let x in data) {
        if(x==5)break
        let title = data[x]['title']
        let lower_title = title.toLowerCase() // convert title to lower to search
        let find = lower_title.indexOf(search)
        if (find <= -1) continue
        let courseLink = data[x]['link']
        let urlImage = data[x]['image']
        let author = data[x]['author']
        let price = data[x]['price']
        let rating = data[x]['rating']
        let people = data[x]['people']
        courses_continer += `
        <a href=${courseLink}>
            <div class="course">
            <img class="img-course"  src=${urlImage} />
                <div>
                    <h5 class="title">
                        ${title}
                    </h5>
                    <p class"author">${author}</p>
                        <div class="rate">
                            <h4 style="color: rgb(110, 44, 0);">
                                ${rating}
                            </h4>
                            <ul class="rank-corse">
                                <li> <i class="fa-solid fa-star star-icon"></i> </li>
                                <li> <i class="fa-solid fa-star star-icon"></i> </li>
                                <li> <i class="fa-solid fa-star star-icon"></i> </li>
                                <li> <i class="fa-solid fa-star star-icon"></i> </li>
                                <li><i class="fa-solid fa-star-half-stroke star-icon"></i></li>
                            </ul>
                            <h6 style="margin: 5px">(${people})</h6>
                        </div>
                        <h4>E£ ${price}</h4>
                </div>
            </div>
        </a>
        `
    }
    document.getElementById('courses').innerHTML = courses_continer
}
function searchByInputValue() {
    showCourses(document.getElementById('input-search').value)
}
let currentTab = 'home-tab'
function changeTab(event) {
     

}
