var fruitNames = "apple banana berry cucumber eggplant grape green-grape lemon mango olive onion orange peach pinneapple plum radish strawberry tomato watermelon".split(" ")

fruits = document.getElementById('fruits')
current = 1

function isUnique(event){
    src = event.target.src
    count = 0
    for(var i=0;i<fruits.children.length;i++){
        if (src == fruits.children[i].src) count++;
    }
    if ( count == 1 ) {
        current = current * 2
        draw()
    }

}

fruit = function(name) {
    img = document.createElement("img")
    img.src = "fruits/"+name+".png"
    img.onclick = isUnique
    img.width = (Math.sqrt(screen.height * screen.width) / current)
    return img
}

randomFruitPosition = function() {
  return parseInt(Math.random()*fruitNames.length)
}

randomFruitLess = function(fruitInt) {
    random = null
    while (random == null || fruitInt == random)
        random = randomFruitPosition();
    return random;
}

resizeAll = function(width) {
    for (var i=0;i<fruits.children.length;i++)
        fruits.children[i].width = width

    bottom = fruits.children[fruits.children.length-1].getBoundingClientRect().bottom
    if ( bottom + width < screen.height - width )
      resizeAll(width + 5)
}

addFruit = function(fruitPosition) {
    fruits.appendChild(fruit(fruitNames[fruitPosition]))
}

draw = function(){
    fruits.innerHTML = ""
    uniqueFruit = randomFruitPosition()
    randomMoment = parseInt(Math.random()*current)
    for (var i = 0; i < current; i++) {
        addFruit(randomFruitLess(uniqueFruit))
        if (i == randomMoment) {
          console.log(fruitNames[uniqueFruit])
          addFruit(uniqueFruit)
        }
    }
    resizeAll(10)
}
draw()

