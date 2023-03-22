const events = data.events
const currentDate = data.currentDate
const $checkboxs = document.getElementById('checkboxs')
const $contCards = document.getElementById('cont-cards')
const fn = (card) => card.category 
const cardCategories = events.filter(fn)
const categories = cardCategories.map(fn)
const noRepeatCategories = new Set(categories)
const arrayNoRepeatCategories = Array.from(noRepeatCategories)
const searchBarFunction = document.getElementById('search')


function createCheckboxs(values, container){
    let template=''
    values.forEach(value => template += `
    <label class="btn btn-light active">
    <input class="form-check-input me-2" type="checkbox" value="${value}" id="flexCheckDefault2" uchecked autocomplete="off">${value}
    </label>
    `)
    container.innerHTML = template
}
createCheckboxs(arrayNoRepeatCategories, $checkboxs)

function createCard( card ) {

    let div = document.createElement('div')
    div.className = 'card border-primary'
    div.classList.add(`card`);
    div.innerHTML = `<img src="${card.image}" class="card-img-top" alt="Image of ${card.name}" />
    <div class="card-body d-flex flex-column align-items-center">
    <h3 class="card-title">${card.name}</h3>
    <p class="card-text"> ${card.description}</p>
    <h5 class="mt-auto">Price:$${card.price} </h5>
    <a href="./details.html?id=${card._id}" class="btn btn-primary align-self-stetch" role="button">More info...</a>
    </div>`
    return div
}

function printCards(events, container){  
    container.innerHTML=''

    let fragment = document.createDocumentFragment()
    if(events.length!=0){
        events.forEach(event => fragment.appendChild(createCard(event)))
        container.appendChild(fragment)
    }else{
        $contCards.innerHTML= `<h2>There is no results for your search.</h2>`
    }
}
printCards(cardCategories, $contCards)

$checkboxs.addEventListener('change', (event) =>{  
    printCards(filteredText(filterCards(events)), $contCards)  
})

function filterCards(events){
    const checked= Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input=>input.value)
    if(fn.length!=0){
        return events.filter(card => checked.includes(card.category)) 
    } else {
        return events 
    }
}

function filteredText(array){
    const input_value = document.querySelector("input[type='search']").value
    if (input_value==""){
        return array 
    } else{
        return array.filter(card=>card.name.toLowerCase().includes(input_value.toLowerCase()))
    }
}

searchBarFunction.addEventListener("keyup", (e)=>{  
    e.preventDefault()
    printCards(filteredText(filterCards(events)), $contCards) 
})
searchBarFunction.addEventListener("submit", (e)=>{
    e.preventDefault()
})
