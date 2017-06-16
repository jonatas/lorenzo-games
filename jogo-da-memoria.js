allFruits = "apple banana berry cucumber grape green-grape lemon mango olive onion orange peach pinneapple plum radish strawberry tomato watermelon".split(" ")
fruitNames = []

howManyDifferentFruits = 4

pickFruitsToPlay = (fruits) => {
  fruitNames = []
  for (var i=0;i<howManyDifferentFruits;i++) {
    fruitName = null
    while (fruitName == null || fruitNames.includes(fruitName)){
      fruitName = allFruits[parseInt(Math.random()*allFruits.length)]
    }
    fruitNames.push( fruitName)
  }
  return fruitNames;
}


pickRandom = (array) => {
  index = array.length * Math.random() | 0
  return array.splice(index, 1)[0]
}

verseCard = pickRandom(allFruits)
verseImage = `fruits/${verseCard}.png`

board = document.getElementById('board')

countImages = (src) => {
  count = 0
  for(var i = 0; i < board.children.length; i++)
    if (board.children[i].src.endsWith(src)) count++
  return count;
}

solvedImages = (src) => {
  for(var i = 0; i < board.children.length; i++) {
    element = board.children[i]
    if (element.src.endsWith(src)){
        element.style = 'border: 5px solid green'
        element.onclick = null
    }
  }
  if (finishedGame()) {
     howManyDifferentFruits += 2
     board.innerHTML = ""
     play()
  }
}

finishedGame = () => { return countImages(verseImage) == 0 }

resetImagesToVerse = () => {
  for(var i = 0; i < board.children.length; i++) {
      element = board.children[i]
      if (element.onclick != null) {
          element = board.children[i]
          element.src = `fruits/${verseCard}.png`
      }
  }
}

toggleImage = (e) => {
  if (e.target.src.includes(verseCard)){
    if (secondStroke()) resetImagesToVerse()
    src = `fruits/${e.target.fruit}.png`
    e.target.src = src
    validateSolve(src)
  } else
    e.target.src = verseImage
}

foundPair    = (src) => { return countImages(src) == 2 }
secondStroke = ()    => { return countImages(verseImage) % 2 == 0 }

validateSolve = (src) => {
  if (foundPair(src)) solvedImages(src)
  else if (secondStroke()) setTimeout(resetImagesToVerse, 1000)
}

fruit = (name) => {
    img = document.createElement("img")
    img.fruit = name
    img.src = `fruits/${verseCard}.png`
    img.style = 'border: solid 1px gray'
    img.onclick = toggleImage
    img.width = 200
    return img
}

pickRandomFruit = () => {
  fruitToAdd = pickRandom(duplicatedFruits)
  board.appendChild(fruit(fruitToAdd))
}

play = () => {
  pickFruitsToPlay()

  duplicatedFruits = fruitNames.concat(fruitNames)

  while (duplicatedFruits.length) pickRandomFruit()
}

play()

