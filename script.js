// github genral url to get courses
const baseURL = 'https://my-json-server.typicode.com/M7mmed-Sayed/myjsondata/'

// make it globle to limit wasting time to load the data
// i created new var  original_Data to be still constent when makeing filtering
let maxItemsInDiv = 5 // max items in carousel
/*first , last id of carousel */
let firstCourseId = 0
let lastCourseId = 5

/*
original_Data to store orginal data from api
 data i 'm making some edition at search mode 
 */
let data, original_Data

/*all courses i have on current tab */
let numberOfCourses = 0

async function callGetAPICourses(courseName) {
    //generating  url for courses ans fetching data
    let url = baseURL + courseName + '-courses'
    const response = await fetch(url)
    data = await response.json()
    original_Data = [].concat(data)
    numberOfCourses = Object.keys(data).length
    /* find width when the pages loads to manage num of items in the containers of courses */
    var win = window
    let width = win.innerWidth
    // max items in div be 5 min is responsive to current width
    maxItemsInDiv = Math.min(Math.floor(width / 233), 5)
    lastCourseId = Math.min(maxItemsInDiv, numberOfCourses)
    showCourses()
}
// call api when page loads
callGetAPICourses('python')
/* header description for each course */
async function callGetApiCourseHeader(courseName) {
    //generating  url for header ans fetching header data
    let url = baseURL + courseName + '-header'
    const response = await fetch(url)
    let header = await response.json()
    // set tagline date to element by id tagline , and description to  elment by id description
    document.getElementById('course-tagline').innerHTML = header['tagline']
    document.getElementById('course-description').innerHTML =
        header['description']

    // set explor button innerr wwith data comming from current tab
    document.getElementById('btn-explor').innerHTML =
        'Explor ' + document.getElementById(courseName).innerHTML
}
// call it ewch time we refrech the page
callGetApiCourseHeader('python')

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
    /*every call for show courses 
    check if it is first item display none for left carousel icone 
    check if it is last item display none right carousel icone 
     */
    let btnLeftcarousel = document.getElementById('left-move')
    let btnRightcarousel = document.getElementById('right-move')
    if (firstCourseId == 0) btnLeftcarousel.style.display = 'none'
    else btnLeftcarousel.style.display = 'block'
    if (lastCourseId == numberOfCourses) btnRightcarousel.style.display = 'none'
    else btnRightcarousel.style.display = 'block'

    /*remove current courrses by DOM API */
    let coursesContinerElment = document.getElementById('courses-continer')
    while (coursesContinerElment.lastElementChild) {
        coursesContinerElment.removeChild(
            coursesContinerElment.lastElementChild
        )
    }
    for (let x = firstCourseId; x < lastCourseId; x++) {
        /*
        thanks ^-^ for destructuring syntax review 
        it's one of the best things i learned
         */
        let {
            id,
            link: courseLink,
            title,
            author,
            image: urlImage,
            price,
            rating,
            people,
        } = data[x]
        /*Dom API */
        // create element for price
        let priceElement = document.createElement('h4')
        let textData = document.createTextNode(`E£ ${price}`)
        priceElement.classList.add('h4')
        priceElement.appendChild(textData)

        let authorElement = document.createElement('p')
        textData = document.createTextNode(author)
        authorElement.classList.add('p')
        authorElement.appendChild(textData)

        let peopleElement = document.createElement('h6')
        textData = document.createTextNode(' ( ' + people + ' )')
        peopleElement.classList.add('h6')
        peopleElement.appendChild(textData)
        peopleElement.style.margin = '5'

        let ratingElement = document.createElement('h4')
        ratingElement.classList.add('h4')
        textData = document.createTextNode(rating)
        ratingElement.appendChild(textData)
        ratingElement.style.color = 'rgb(110, 44, 0)'

        let titleElement = document.createElement('h4')
        titleElement.classList.add('h4')
        textData = document.createTextNode(title)
        titleElement.appendChild(textData)

        let courseLinkElement = document.createElement('a')
        courseLinkElement.href = `${courseLink}`

        let imageElement = document.createElement('img')
        imageElement.src = urlImage
        imageElement.classList.add('img-course')

        let starsList = document.createElement('ul')
        starsList.classList.add('nav', 'mx-1')
        for (let i = 0; i < 5; i++) {
            let iconElement = document.createElement('i')
            iconElement.classList.add('fa-solid', 'fa-star', 'star-icon')
            let starItemElement = document.createElement('li')
            starItemElement.append(iconElement)
            starsList.append(starItemElement)
        }

        // add child element of parent ratingContainerDiv
        let ratingContainerDiv = document.createElement('div')
        ratingContainerDiv.classList.add('rate')
        ratingContainerDiv.append(ratingElement)
        ratingContainerDiv.append(starsList)
        ratingContainerDiv.append(peopleElement)
        // div to hold rating div and title and price
        let courseInfoElementsContainer = document.createElement('div')
        courseInfoElementsContainer.append(titleElement)
        courseInfoElementsContainer.append(ratingContainerDiv)
        courseInfoElementsContainer.append(priceElement)
        // push img and description inside the link to make all work as link
        courseLinkElement.append(imageElement)
        courseLinkElement.append(courseInfoElementsContainer)
        // main course data
        let divCoverAllCourseData = document.createElement('div')
        divCoverAllCourseData.classList.add('course', 'p-2', 'flex-fill')
        divCoverAllCourseData.append(courseLinkElement)
        coursesContinerElment.append(divCoverAllCourseData)
    }
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
    let numOfCourses = Math.floor(rect.width / 233) // count best course items to fit in screen
    // if there is a change leads to effect to items do it
    if (numOfCourses != maxItemsInDiv) {
        let diffScreenItems = Math.abs(numOfCourses - maxItemsInDiv) // diff between cur courses at screen and last courses at screen
        if (numOfCourses < maxItemsInDiv)
            lastCourseId -= diffScreenItems //  zoom in reomve last courses
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
    lastCourseId = Math.min(lastCourseId, numberOfCourses) // manage lastindex to be in range of courses
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

// do the action when click on courses nav-tabs
function selectCoursesTab(CourseName) {
    // call courses for current tab
    callGetAPICourses(CourseName)
    // call header data for current tab
    callGetApiCourseHeader(CourseName)
}
