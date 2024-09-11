//вспомогательные перемнные
const array=[]
temp = []
let c=0
let d=0
count = 0
open_cards = 0
id='memo'
results = {

}



function start(){
content = document.querySelector('.content1')
for (var i = 0; i <= 23; i++){ 
faces = document.createElement('div');
content.appendChild(faces)
faces.className = 'angry angry'+`${i}`;
faces = document.querySelector('.angry')
}

function createCart(className,identificator, position){
  var cart = document.createElement('div');
  cart.className = className;
  cart.classList.add(identificator)
  cart.setAttribute('onclick','reverse('+`${position}`+')')
  return cart;
}

document.querySelectorAll('.angry').forEach(element =>{
  element.appendChild(createCart('back','back'+`${d}`,d));
  element.appendChild(createCart('face','face'+`${d}`,d));
  array.push(d)
  d=d+1
})

render()
 
}


document.querySelector('.new_game').addEventListener('click',function (e) {
  document.querySelector('.input_playerName').style.display = 'block'
  document.querySelector('.start_menu').style.display = 'none'
  document.getElementById("playerName").focus()

})


player = document.getElementById("playerName")
player.addEventListener('keydown', function(e){
  if (e.keyCode === 13){
    playerName = player.value
    document.querySelector('.player_name').textContent = player.value
    document.querySelector('.player').style.display = 'block'
    document.querySelector('.score').style.display = 'block'
    document.querySelector('.restart').style.display = 'block'
    document.querySelector('.exit').style.display = 'block'
    document.querySelector('.input_playerName').style.display = 'none'
    start()
  }
})

document.querySelector('.restart').addEventListener('click',function (e) {
   while (content.firstChild){
   content.removeChild(content.lastChild)
  }
  array.length=0
  temp.length = 0
  c=0
  d=0
  count = 0
  i=0
  open_cards = 0
  document.querySelector('.score_count').textContent = count
  document.querySelector('.win').style.display = 'none'
  start()
})

document.querySelector('.exit').addEventListener('click',function (e) {
  while (content.firstChild){
    content.removeChild(content.lastChild)
   }
   array.length=0
   temp.length = 0
   c=0
   d=0
   count = 0
   i=0
   open_cards = 0
   document.querySelector('.score_count').textContent = count
   document.querySelector('.player').style.display = 'none'
    document.querySelector('.score').style.display = 'none'
    document.querySelector('.restart').style.display = 'none'
    document.querySelector('.exit').style.display = 'none'
    document.querySelector('.win').style.display = 'none'
    // document.querySelector('.input_playerName').style.display = 'block'
    document.getElementById("playerName").value = ''
    document.getElementById("playerName").focus()
    document.querySelector('.start_menu').style.display = 'flex'
})
 
document.querySelector('.table').addEventListener('click',function (e) {
   
  document.querySelector('.table_title_fullscreen').style.display = 'block'
  document.querySelector('.new_game').style.display = 'none'
  document.querySelector('.table_title').style.display = 'none'
  document.querySelector('.table_content').style.display = 'flex'
  tableGenerator()

})

function tableGenerator(){
lines = document.querySelector('.table_content')
let items = {...localStorage}

// let maxSpeed = {
//   car: 300, 
//   bike: 60, 
//   motorbike: 200, 
//   airplane: 1000,
//   helicopter: 400, 
//   rocket: 8 * 60 * 60
// };
let linesArray = [];
for (let player in items) {
  linesArray.push([player, items[player]]);
}

linesArray.sort(function(a, b) {
  return a[1] - b[1];
});
console.log(linesArray)

if (linesArray.length>=10){
  temp = 10
}
else{
  temp= linesArray.length
}
for (var i = 0; i <= temp; i++){ 
pl = document.createElement('div');
sc = document.createElement('div');
lines.appendChild(pl);
lines.appendChild(sc);
pl.className = ('players')

sc.className = ('scores')
}
}  



// обработка нажатий на карточки
function reverse(n){
  
  temp.push(n) //записывем номера карточек в массив
  document.querySelector('.angry'+`${n}`).style.transform = 'rotateY(0deg)'//открываем карточу
  console.log(temp.length)
  document.querySelector('.face'+`${temp[0]}`).onclick = null;//запрещаем нажатие мышки на открытой карточке
  document.querySelector('.face'+`${temp[1]}`).onclick = null;//запрещаем нажатие мышки на открытой карточке
 //есди открыто две карточки, то запрещаем нажатия на всех остальных карточках
  if( temp.length == 2){
      document.querySelectorAll('.back').forEach(element =>{
        
        element.style.pointerEvents = 'none'
        
        console.log(count)
        


      })
      count = count + 1
      document.querySelector('.score_count').textContent = count
  //проверка открытых карточек на совпадение  
  setTimeout(() => {
  if( temp.length == 2){

   //console.log(temp.length)
  
    //если совпали карточки то оставляем их открытыми и запрещаем им нажатия
    if(document.querySelector('.face'+`${temp[0]}`).style.backgroundImage == document.querySelector('.face'+`${temp[1]}`).style.backgroundImage){
      document.querySelector('.face'+`${temp[0]}`).onclick = null;
      document.querySelector('.face'+`${temp[1]}`).onclick = null;
      localStorage.setItem(id + document.getElementById("playerName").value, count)
      open_cards == 11 ? win() : open_cards = open_cards+1
      
      temp.length = 0
    }
    //если не совпали то переворачиваем их рубашкой вверх
    else{
      document.querySelector('.angry'+`${temp[0]}`).style.transform = 'rotateY(180deg)'
      document.querySelector('.angry'+`${temp[1]}`).style.transform = 'rotateY(180deg)'
    }
    }
    //разрешаем нажатия мышкой на остальных карточках
    document.querySelectorAll('.back').forEach(element =>{
      
      element.style.pointerEvents = 'auto'
    })
    temp.length = 0
    }, 1000);

}  

}

function win(){
  document.querySelector('.win').style.display = 'block' 
  localStorage.setItem(document.getElementById("playerName").value, count)
  // results[document.getElementById("playerName").value] = count
  
  console.log(results)


}



function render(){
shuffle(array)

function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  console.log(i , j)
console.log(array)
}

//отрисовка начального размещения злых птичек
array.forEach(element => {
  document.querySelector('.face'+`${element}`).style.background = 'url(./img/img'+`${c}`+'.png';
  document.querySelector('.face'+`${element}`).style.backgroundSize = 'cover'
  c=c+1
  if (c==12){
    c=0
  }
});


//поуза 3 секунды и переворот всех карточек рубашкой вверх
allCarts=document.querySelectorAll('.angry')
document.querySelectorAll('.angry').forEach(element =>{
  element.style.pointerEvents = 'none'})
  document.querySelector('.restart').style.pointerEvents = 'none'
  document.querySelector('.exit').style.pointerEvents = 'none'
  
setTimeout(() => {
    allCarts.forEach(element=>{
    element.style.transform = 'rotateY(180deg)'    
  });
  
 }, 5000);

 setTimeout(() => {
  document.querySelectorAll('.angry').forEach(element =>{
    
    element.style.pointerEvents = 'auto'})
    document.querySelector('.restart').style.pointerEvents = 'auto'
  document.querySelector('.exit').style.pointerEvents = 'auto'
    
  }, 2000)  


//  document.querySelectorAll('.back').forEach(element =>{
//   console.log(element)
//   element.style.pointerEvents = 'auto'})

}









    
    // search_input.value = ''
   



// while (content.firstChild){
//   content.removeChild(content.lastChild)}

// function render_page(work,arr){
//   console.log(work)
//   console.log(arr)
// work.Search.forEach(element => {
    
//   console.log(element)
//   let elem = document.createElement('div')
//   content.appendChild(elem)
//   elem.className = 'data'+`${count}`
//   // elem.style.backgroundImage = `url(${element.Poster})`
  

  
//   let picture = document.createElement('div')
//   let title = document.createElement('div')
//   let year = document.createElement('div')
//   let genre = document.createElement('div')
//   let actors = document.createElement('div')
//   let about = document.createElement('div')
//   let rate = document.createElement('div')

//   film = document.querySelector('.data'+`${count}`)
//   film.className = 'data'
//   film.appendChild(picture)
//   film.appendChild(title)
//   film.appendChild(year)
//   film.appendChild(genre)
//   film.appendChild(actors)
//   film.appendChild(about)
//   film.appendChild(rate)
//   picture.className = 'picture'
// if (element.Poster == 'N/A'){
//   picture.style.backgroundImage = `url(./img/no_poster.jpg)`}
  
  
//   else {
//     picture.style.backgroundImage = `url(${element.Poster})`
    
//   }

//   title.className = 'title'
//   title.textContent = arr[count].Title
//   year.className = 'year'
//   year.textContent = 'Year: '+ `${arr[count].Year}`
//   genre.className = 'genre'
//   genre.textContent = 'Genre: ' + `${arr[count].Genre}`
//   actors.className = 'actors'
//   actors.textContent = 'Actors: ' + `${arr[count].Actors}`
  
//   title.className = 'title'
//   title.textContent = arr[count].Title
//   about.className = 'about'
//   about.textContent = arr[count].Plot
//   rate.className = 'rate'
  
//   if (arr[count].Ratings[0]){

//     rate.textContent = `${arr[count].Ratings[0].Value}` + '    ';

    
//   }
//   else{
//     rate.style.paddingRight= '15px'
//     rate.textContent = 'N/A ';
//   }
  
//   star = document.querySelector('.rate')

//   count=count+1
 



// })
// arr.length = 0
// count = 0
// }  
  

