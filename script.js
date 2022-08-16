// local api to get courses
const getAllCourses = 'https://mocki.io/v1/696ac62f-fa19-470a-bd4b-89d75685ca88'


// make it globle to limit wasting time to load the data
// i created new var  original_Data to be still constent when makeing filtering 
let maxItemsInDiv = 5
let firstCourseId = 0
let lastCourseId = 5

let data ,original_Data
let numberOfCourses = 0
async function callGetAPI(url) {
    const response = await fetch(url)
    data = await response.json()
    original_Data = [].concat(data)
    numberOfCourses = Object.keys(data).length
    let search = '' // search by defualt value empty string
    /* find width when the pages loads to manage num of items in the containers of courses */
    var elem = document.getElementById('courses-continer')
    var rect = elem.getBoundingClientRect()
    maxItemsInDiv = Math.floor(rect.width / 233)
    lastCourseId = Math.min(maxItemsInDiv, numberOfCourses) // manage lastindex to be in range of courses

    showCourses(search)
}
// call api when page loads
callGetAPI(getAllCourses)


// func to fillters with input search value
function filterData(search) {
    let customData = []
    for (var x in original_Data) {
        let title = original_Data[x]['title']
        let lower_title = title.toLowerCase() // convert title to lower to search
        let find = lower_title.indexOf(search)
        if (find <= -1) continue
        customData.push(original_Data[x])
    }
    data = [].concat(customData) // copy items after filteration not refrance
    numberOfCourses = Object.keys(data).length
    firstCourseId = 0
    lastCourseId = Math.min(lastCourseId, numberOfCourses) // manage lastindex to be in range of courses
    showCourses()
}

// disply courses 
function showCourses() {
    let courses_continer = ''
    for (let x = firstCourseId; x < lastCourseId; x++) {
        let title = data[x]['title']
        let courseLink = data[x]['link']
        let urlImage = data[x]['image']
        let author = data[x]['author']
        let price = data[x]['price']
        let rating = data[x]['rating']
        let people = data[x]['people']
        courses_continer += `
            <div class="course p-2 flex-fill">
            <a href=${courseLink} >
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
                </a>
            </div>
        `
    }
    document.getElementById('courses-continer').innerHTML = courses_continer
}


// input text fillteration
function searchByInputValue() {
    // call filterData func by text in input text
    filterData(document.getElementById('input-search').value)
}



// manage screen items
function displayWindowSize() {
    var elem = document.getElementById('courses-continer')
    var rect = elem.getBoundingClientRect()
    let numOfCourses = Math.floor(rect.width / 233)// count best course items to fit in screen
    // if there is a change leads to effect to items do it  
    if (numOfCourses != maxItemsInDiv) { 
        let diffScreenItems = Math.abs(numOfCourses - maxItemsInDiv)// diff between cur courses at screen and last courses at screen
        if (numOfCourses < maxItemsInDiv) lastCourseId -= diffScreenItems //  zoom in reomve last courses
        else {
            //zoom out
            let rightCourses = lastCourseId
            // find available courses at right side
            let extendRight = Math.min(
                numberOfCourses - rightCourses,
                diffScreenItems
            )
            lastCourseId += extendRight // extend rightcourses
            diffScreenItems -= extendRight // count min item needed to reach max items by div
            firstCourseId -= Math.min(diffScreenItems, firstCourseId) //extend left courses with available courses
        }
        // set current items to be mazitems in div
        maxItemsInDiv = numOfCourses
       showCourses()
    }
}
// add event at change of screen
window.addEventListener('resize', displayWindowSize)



// when click at right side button the show new items 
function shiftCoursesLeft() {
    lastCourseId += maxItemsInDiv // increase with num of courses which parent div can fill
    lastCourseId = Math.min(lastCourseId, numberOfCourses)// manage lastindex to be in range of courses
    firstCourseId = lastCourseId - maxItemsInDiv // set first index to be offest with items in div
    showCourses()
}


// when click at left side button the show new items 
function shiftCoursesRight() {
    lastCourseId -= maxItemsInDiv // decrease with num of courses which parent div can fill
    lastCourseId = Math.max(lastCourseId, maxItemsInDiv) // manage lastindex to be in range of div items
    firstCourseId = lastCourseId - maxItemsInDiv // set first index to be offest with items in div
    showCourses()
}
