allFruits = "apple banana berry cucumber eggplant grape green-grape lemon mango olive onion orange peach pinneapple plum radish strawberry tomato watermelon".split(" ")

fruitNames = allFruits //; allFruits.slice(0,4)

fruits = document.getElementById('fruits')
fruitsCounter = document.getElementById('fruits_counter')

clicksCounter = 0
playWithNFruits = 12
howManyDifferentFruits = 4

pickFruitsToPlay = (fruits) => {
    howManyDifferentFruits += 1
    fruitNames = []
    for (var i=0;i<howManyDifferentFruits;i++) {
        fruitName = null
        while (fruitName == null || fruitNames.includes(fruitName)){
            fruitName = allFruits[parseInt(Math.random()*allFruits.length)]
        }
        fruitNames.push( fruitName)
    }

   draw()
}


checkClick = (event) => {
    src = event.target.src
    clicksCounter += 1
    count = 0
    for(var i=0;i<fruits.children.length;i++){
        if (src == fruits.children[i].src) count++;
    }
    if ( count == 1 ) {
        playWithNFruits += 4
        pickFruitsToPlay()
    } else {
      for(var i=0;i<fruits.children.length;i++){
        element = fruits.children[i]
        if (src == element.src)
          element.parentNode.removeChild(element)
      }

      resizeAll(5)
    }

}

fruit = (name) => {
    img = document.createElement("img")
    img.src = "fruits/"+name+".png"
    img.onclick = checkClick
    img.width = (Math.sqrt(screen.height * screen.width) / playWithNFruits)
    return img
}

randomFruitPosition = () => {
  return parseInt(Math.random()*fruitNames.length)
}

randomFruitLess = (fruitInt) => {
    random = null
    while (random == null || fruitInt == random) {
        random = randomFruitPosition();
    }
    return random;
}


resizeAll = (height) => {
  aspectRatio = screen.height / screen.width
    for (var i=0;i<fruits.children.length;i++)
        fruits.children[i].width = height * aspectRatio

  fruitsCounter.innerHTML = `fruits: ${fruits.children.length} cilcks: ${clicksCounter}`

  resize = () => {
    bottom = fruits.children[fruits.children.length-1].getBoundingClientRect().bottom
    if ( bottom + height < screen.height) {
      resizeAll(height + 5)
    }
  }

  setTimeout(resize, 1);
}

addFruit = (fruitPosition) => {
    fruits.appendChild(fruit(fruitNames[fruitPosition]))
}

draw = () => {
    fruits.innerHTML = ""
    uniqueFruit = randomFruitPosition()
    randomMoment = parseInt(Math.random()*playWithNFruits-1)
    for (var i = 0; i < playWithNFruits-1; i++) {
        addFruit(randomFruitLess(uniqueFruit))
        if (i == randomMoment) {
          console.log(fruitNames[uniqueFruit])
          addFruit(uniqueFruit)
        }
    }
    resizeAll(5)

}

pickFruitsToPlay()

