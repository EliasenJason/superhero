
const flexContainer = document.getElementById('flex-container')
let hero = {}

const displayHeros = (heros) => {
    let heroHTML = heros.results.map(item => {
        let myElement = document.createElement('div')
        myElement.classList.add('flip-card')

        myElement.innerHTML = ` <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <img src="${item.image.url}" alt="Avatar" >
                                    </div>
                                    <div class="flip-card-back">
                                            <h1>${item.name}</h1>
                                            <p>Height: ${item.appearance.height[0]}</p>
                                            <p>Weight: ${item.appearance.weight[0]}</p>
                                            <p>race: ${item.appearance.race}</p>
                                    </div>
                                </div>`
        return myElement
    })
    heroHTML.forEach(item => flexContainer.append(item))
}

const handleActivation = async () => {
    const heroName = document.getElementById('hero-input').value
    hero = await getHeros(10223439876486848, heroName)
    flexContainer.innerHTML = ''
    displayHeros(hero)
}

document.getElementById('big-screen').addEventListener('click', handleActivation)
document.getElementById('hero-input').addEventListener('keyup',(event) => {
    event.key === 'Enter' ? handleActivation() : null
})



const getHeros = async (myToken, hero) => {
    const heroData = await fetch(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${myToken}/search/${hero}`).catch((error) => console.log('error'))
    const heroJSON = await heroData.json().catch((error) => console.log('error'))
    console.log(heroJSON)
    return heroJSON
}