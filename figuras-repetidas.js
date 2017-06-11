allFruits = "apple banana berry cucumber eggplant grape green-grape lemon mango olive onion orange peach pinneapple plum radish strawberry tomato watermelon".split(" ")

fruitNames = allFruits //; allFruits.slice(0,4)

fruits = document.getElementById('fruits')

playWithNFruits = 12
howManyDifferentFruits = 4

pickFruitsToPlay = function(fruits) {
    howManyDifferentFruits += 1
    fruitNames = []
    for (var i=0;i<howManyDifferentFruits;i++) {
        fruitName = null
        while (fruitName == null || fruitNames.includes(fruitName)){
            fruitName = allFruits[parseInt(Math.random()*allFruits.length)]
        }
        fruitNames.push( fruitName)
    }
}

pickFruitsToPlay()

isUnique = function(event){
    src = event.target.src
    count = 0
    for(var i=0;i<fruits.children.length;i++){
        if (src == fruits.children[i].src) count++;
    }
    if ( count == 1 ) {
        playWithNFruits += 4
        pickFruitsToPlay()
        draw()
    }

}

fruit = function(name) {
    img = document.createElement("img")
    img.src = "fruits/"+name+".png"
    img.onclick = isUnique
    img.width = (Math.sqrt(screen.height * screen.width) / playWithNFruits)
    return img
}

randomFruitPosition = function() {
  return parseInt(Math.random()*fruitNames.length)
}

randomFruitLess = function(fruitInt) {
    random = null
    while (random == null || fruitInt == random) {
        random = randomFruitPosition();
    }
    return random;
}


resizeAll = function(height) {
  aspectRatio = screen.height / screen.width
    for (var i=0;i<fruits.children.length;i++)
        fruits.children[i].width = height * aspectRatio

    setTimeout(function(){ 
      bottom = fruits.children[fruits.children.length-1].getBoundingClientRect().bottom
      if ( bottom + height < screen.height) {
        resizeAll(height + 5)
      }
    }, 5);
}

addFruit = function(fruitPosition) {
    fruits.appendChild(fruit(fruitNames[fruitPosition]))
}

draw = function(){
    fruits.innerHTML = ""
    uniqueFruit = randomFruitPosition()
    randomMoment = parseInt(Math.random()*playWithNFruits)
    for (var i = 0; i < playWithNFruits-1; i++) {
        addFruit(randomFruitLess(uniqueFruit))
        if (i == randomMoment) {
          console.log(fruitNames[uniqueFruit])
          addFruit(uniqueFruit)
        }
    }
    resizeAll(5)
}
draw()

