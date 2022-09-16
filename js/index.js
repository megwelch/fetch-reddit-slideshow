let startButton = document.querySelector('#start')
let stopButton = document.querySelector('#stop')
let slide = document.getElementById("slide")
let input = document.querySelector('#input')

let frame = document.getElementById('slideshow')
let array = Array(9).fill('')

const onGetRedditSuccess = (response) => {
    const results =response.data.children
    const thumbnailArr = results.map(object => object.data.thumbnail)

    const picture = document.createElement('img')
    picture.classList.add('picture')
    let indexCounter = 1
    picture.setAttribute('src', thumbnailArr[indexCounter])

    for (i = 0; i < thumbnailArr.length; i++){
        if(thumbnailArr[i] === 'self'){
            thumbnailArr.splice([i], 0)
        }
    }

    frame.appendChild(picture)



    // for (i = 0; i < thumbnailArr.length; i++){
    //     let picture = document.createElement('img')
    //     picture.setAttribute('src', thumbnailArr[i])
    //     frame.appendChild(picture[i])
    // }

    function changeSlides () {
        indexCounter ++
        picture.setAttribute('src', thumbnailArr[indexCounter])
    }
    setInterval(changeSlides, 3000)
}


startButton.addEventListener('click', () => {
    let inputValue = input.value

    if (inputValue === ''){
        input.placeholder = 'You need to search something!'
        return
    }

    
    if (frame.firstChild) {
        frame.removeChild(frame.firstChild);
    }

    fetch(`http://www.reddit.com/search.json?q=${inputValue}+nsfw:no`)

    .then(res => (res.json()))
    
    .then(onGetRedditSuccess)
   
    .catch(console.error)
})

stopButton.addEventListener('click', () => {
    while (frame.firstChild) {
        frame.removeChild(frame.firstChild);
    }
    input.value = ''
})





// get images from API
// loop through images
// get slide