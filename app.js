

/*<!-- FIXME -->
Can you tell me why this method does not produce a list of reference objects named as the ID I'm generating with generateId()?

function kittenMaker(form, id){
  id = {
    "affection" : 4,
    "name" : form.name.value,
    "image" : imageSelector(),
    "mood" : setKittenMood(4),
  }
  kittens.push(id)
}

function addKitten(event) {
  event.preventDefault()
  let form = event.target
  kittenMaker(form, generateId())
  console.log(kittens)
}
*/
kittens = []

let imageChosen = "";
kittenpickens = ["moody-logo.png","defiant-kitten.png","angry-kitten.jpg","elder-god-kitten.jpg","grumpy-kitten.jpg","lovecraft-kitten.png"];

function imageSelector() {
  let i = Math.floor(Math.random() * kittenpickens.length);
  imageChosen = kittenpickens[i]
  return imageChosen
}

function formReset(){
  entryForm = document.getElementById("entry-form")
  entryForm.placeholder = "Name"
}

function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kitten = {
    name: form.name.value.toLowerCase(),
    id: generateId(),
    image: imageSelector(),
    affection: 4,
    mood: "watching you",
  };
  form.reset()
  console.log(kitten.name)
  if(findKittenByName(kitten.name) != -1){
    console.log("True");
    entryForm = document.getElementById("entry-form")
    entryForm.placeholder = "They Will Not Share Names";
    form.reset();
    setTimeout(formReset, 3000)
  }
  else{
    console.log("We don't have one of those yet")
    kittens.push(kitten)
    saveKittens()
  }
}

function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens){
    kittens = storedKittens
  }
  console.log("Loaded")
  drawKittens()
}

/*<!--- TODO --->
- Lock kitten cards to consistent size [X]
- Lock x-axis scroll [X]
- Script rows to appear to hold kitten cards []
- Add a google font [X]
- Apply font to [X]
    - Nametag X
    - Banish Button (also change name) X
    - Welcome Page X
- Make form Required() [X]
- Prevent name duplicates [x]
- Establish kitten deletion []
- Create a kitten clear button []
- Establish kitten clear []
- Certify mood buttons []
- Add more kittenpickens ()
- Kitten's and moods persists with page reloads [x]
- Kitten's are visible when page reloads..[x]
      I don't know what this means. I think this is done.
*/

function drawKittens() {
  let kittensElem = document.getElementById("rows")
  console.log("Drawn")
  kittenTemplate = ""
  kittens.forEach(kitten => {
    let filter = filterSelector(kitten.affection);
    kittenTemplate += `
    <div id="${kitten.name}" class="kitten-card m-1 ${filter}">
      <button id="${kitten.name} banish-button" class="x-button" onclick="banishKitten(findKittenById('${kitten.id}'))">Banish</button>
      <img class="cat" src="${kitten.image}" alt="${kitten.image}">
      <div class="nametag justify-content-center" style="background-color: var(--primary)">
      <label for="name">${kitten.name}</label></div>
        <div class="text-center" style= "font-size: 12pt">${kitten.mood}</div>
        <div id="${kitten.name} game-buttons" class="d-flex justify-content-center">
        <button id="game-button" class="misc-button"
        onclick="weep(findKittenById('${kitten.id}'))">weep</button>
        <button id="game-button" class="misc-button"
        onclick="tribute(findKittenById('${kitten.id}'))">Tribute</button>
      </div>
    </div>
    `
  });
  kittensElem.innerHTML = kittenTemplate
}

function filterSelector(affection){
  if(affection === 7){
    return "kitten pleased";
  } else if(affection === 6){
    return "kitten tolerant";
  } else if(affection === 5){
    return "kitten sated";
  } else if(affection === 4){
    return "kitten watching you";
  } else if(affection === 3){
    return "kitten quivering";
  } else if(affection === 2){
    return "kitten abominable";
  } else if(affection === 1){
    return "kitten looming";
  } else if(affection === 0){
    return "kitten gone";
  }
}

function findKittenByName(nameGiven) {
  let kittenNames = [];
  kittens.forEach(function(kitten){
    kittenNames.push(kitten.name);  
  });
  nameIndex = kittenNames.indexOf(nameGiven);
  return nameIndex
}

function findKittenById(idGiven) {
  let kittenIDs = [];
  kittens.forEach(function(kitten){
    kittenIDs.push(kitten.id);  
  });
  idIndex = kittenIDs.indexOf(idGiven);
  return idIndex
}


function weep(idIndex) {
  let kitten = kittens[idIndex]
  let randInt = Math.random()
  if (kitten.affection <= 6){
    if (randInt > .5){
      kitten.affection += 1;
      console.log("more", kitten.affection);
      setKittenMood(idIndex, kitten.affection);
    }else if(randInt < .5){
      kitten.affection -= 1;
      console.log("less" , kitten.affection);
      setKittenMood(idIndex, kitten.affection);
    }
  }
  else{
    kitten.affection -= 1;
    console.log("alt less", kitten.affection);
    setKittenMood(idIndex, kitten.affection);
  }
}

function tribute(idIndex) {
  let kitten = kittens[idIndex];
  console.log(kitten)
  kitten.affection = 5;
  console.log(kitten.affection)
  setKittenMood(idIndex, kitten.affection);
};

function setKittenMood(idIndex, affectionVal) {
  kittenMoods = ["gone", "looming", "abominable", "quivering", "watching you", "sated","tolerant","pleased"]

  mood = kittenMoods[affectionVal]
  kittens[idIndex].mood = mood
  kittens[idIndex].affection = affectionVal
  if (kitten[idIndex].affection === 0){
    banishKitten(idIndex)
  }
  saveKittens();
};

function clearKittens(){
  let kittens = [];
  console.log(kittens)
  window.localStorage.clear()
  clearKittyCards = document.getElementsByClassName("kitten-card")
  while(clearKittyCards[0]){
    clearKittyCards[0].parentNode.removeChild(clearKittyCards[0])
  }
}

function banishKitten(idIndex){
  let kitten = kittens[idIndex].name
  goneKittyCard = document.getElementById(kitten)
  buttonDisabler = document.getElementById(kitten + ' game-buttons')

  kittens[idIndex].affection = 0
  kittens[idIndex].mood = "gone"

  goneKittyCard.classList = 'kitten-card m-1 kitten-card-overlay'
  buttonDisabler.classList = "misc-button btn-disable"

  banishButton = document.getElementById(kitten + ' banish-button')
  remove(banishButton)
  saveKittens();
}

function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("blasphemy").classList.remove("hidden")
  document.getElementById("rows").classList.remove("hidden")
  drawKittens()
}



// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return String(Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000))
}

function kittenSearch(kitten, index, value, x){
  console.log(`${kitten}. ${index}. ${value}. ${x}`);
}


loadKittens()

;