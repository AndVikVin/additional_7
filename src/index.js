module.exports = function solveSudoku(matrix) {
  // your solution
  let horizantal = [];
  let vertical = [];
  let square = [];
  for(let r = 0; r <9; r++){
      vertical[r] = [];
      square[r] = [];
  }
  for(let i = 0; i< matrix.length; i++){
      horizantal[i] = matrix[i];
      for(let u = 0; u< matrix[i].length; u++){
        vertical[u].push(matrix[i][u])
      } 
  }
  for(let k = 0; k<9; k+=3){
      for( let y = k; y<k+3; y++){
          square[k].push(vertical[y][0],vertical[y][1],vertical[y][2])
          square[k+1].push(vertical[y][3],vertical[y][4],vertical[y][5])
          square[k+2].push(vertical[y][6],vertical[y][7],vertical[y][8])
      }
  }
  let squareArr = 0
  let horArr
  let verArr
  let findSquareArr = (hor,ver)=>{
    if(0<= hor & hor <=2){
          horArr = hor
          if(0<= ver & ver <= 2){
              squareArr = 0;verArr = ver; findIndexInSquare(horArr,verArr)
            } else if (3<= ver & ver <=5){
              squareArr = 1; verArr = ver - 3; findIndexInSquare(horArr,verArr)
            } else {
                squareArr = 2;verArr = ver - 6; findIndexInSquare(horArr,verArr)}
    } else if(3<= hor & hor <=5){
            horArr = hor - 3
            if(0<= ver & ver <= 2){
                squareArr = 3; verArr = ver; findIndexInSquare(horArr,verArr)
            } else if(3<= ver & ver <=5){
                squareArr = 4; verArr = ver - 3; findIndexInSquare(horArr,verArr)
            } else {
            squareArr = 5; verArr = ver - 6; findIndexInSquare(horArr,verArr)}
    } else {
            horArr = hor - 6
            if(0<= ver & ver <= 2){
                squareArr = 6; verArr = ver; findIndexInSquare(horArr,verArr)
            } else if(3<= ver & ver <=5){
            squareArr = 7; verArr = ver - 3; findIndexInSquare(horArr,verArr)
            } else {squareArr = 8; verArr = ver - 6; findIndexInSquare(horArr,verArr)}
    }
    return squareArr;
  }
  //horNum = number of vertical array
  //verNum = number of horizantal array
  //sqareArr = number of sqareArray
  //if we want to change numbers in suduku number of array is verNum and index of number is horNum
  let index = 0;
  findIndexInSquare = (horInSquare,verInSquare)=>{if(horInSquare === 0){
    if(verInSquare === 0){index = 0} else if(verInSquare === 1){index = 1} else if(verInSquare === 2){index = 2}
    } else if(horInSquare === 1){
        if(verInSquare === 0){index = 3} else if(verInSquare === 1){index = 4} else if(verInSquare === 2){index = 5}
    } else if(horInSquare === 2){
        if(verInSquare === 0){index = 6} else if(verInSquare === 1){index = 7} else if(verInSquare === 2){index = 8}
    }
    return index;
  }

  let chek = (num,arr)=>{
      let ind = arr.indexOf(num)
      if (ind === -1){return true} 
      }

  let number = 0;
  let possible = [];
  for(let horNum = 0; horNum<9; horNum++){
      for(let verNum = 0; verNum < 9; verNum++){
          if(vertical[horNum][verNum] === 0){
              findSquareArr(horNum,verNum);
              possible = [];
              for(let u = 1 ; u<=9; u++){
                  number = u;
                  if(chek(number,vertical[horNum]) & chek(number,horizantal[verNum]) & chek(number,square[squareArr])){
                      possible.push(number)
                  } 
              }
              vertical[horNum][verNum] = possible
              horizantal[verNum][horNum] = possible
              matrix[verNum][horNum] = possible
              square[squareArr][index] = possible   
          }
      }
  }

  let crossNum = (num,arr)=>{
      for(let a = 0; a<9; a++){
          if(typeof arr[a] === "object" ){
              let ind = arr[a].indexOf(num)
              if(ind !== -1){arr[a].splice(ind,1)	
              }
          }
      }
}

let count = 0
  do{for(let horNum = 0; horNum<9; horNum++){
          for(let verNum = 0; verNum < 9; verNum++){
                  if(vertical[horNum][verNum].length === 1){
          let crossNumber = vertical[horNum][verNum][0]
          findSquareArr(horNum,verNum)
          vertical[horNum][verNum] = crossNumber
          horizantal[verNum][horNum] = crossNumber
          square[squareArr][index] = crossNumber
          matrix[verNum][horNum] = crossNumber
          crossNum(crossNumber,vertical[horNum])
          crossNum(crossNumber,horizantal[verNum])
          crossNum(crossNumber,square[squareArr])
          }}}count++} while (count<81)

  return matrix
}
