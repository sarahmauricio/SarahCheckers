import React from 'react';
import ReactDOM from 'react-dom/client';
import Draggable from 'react-draggable';
import './index.css';
//original setup of checkers
let pieces = 
  [' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X',
  'X', ' ', 'X', ' ', 'X', ' ', 'X', ' ',
  ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  'O', ' ', 'O', ' ', 'O', ' ', 'O', ' ',
  ' ', 'O', ' ', 'O', ' ', 'O', ' ', 'O',
  'O', ' ', 'O', ' ', 'O', ' ', 'O', ' '
]

//original setup of game squares
const board = 
  ['W', 'B', 'W', 'B', 'W', 'B', 'W', 'B',
  'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W',
  'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B',
  'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W',
  'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B',
  'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W',
  'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B',
  'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W'
]

//creates one square
function Square(props) {
  let classNameWithColor = "squareMove"
  if(props.color === 0){
    classNameWithColor = "squareNoMove"
  }
  if(props.highlight){
    classNameWithColor = "highlight-square"
  }
  let id = "square"+props.id
  return (
    <div id={id} className={classNameWithColor}>
    </div>
  );
}

//creates one checker
function Checker(props) {
  let classNameWithColor = "black-circle"
  let draggable=true
  if(props.color === 0){
    classNameWithColor = "white-circle"
    draggable = false
  }
  if(props.color === 2){
    return(
      <div></div>
    )
  }
  let id = "checker" + props.id
  if(draggable === false){
    return (
      <button id={id} className={classNameWithColor} onMouseOver={props.onMouseOver} onMouseLeave={props.onMouseLeave}>
      </button>
    );
  }else{
    return (
      <Draggable position={{x: 0, y: 0}} onDrag={props.onDrag} onMouseUp={props.onMouseUp} onMouseDown={props.onMouseDown}>
        <button id={id} className={classNameWithColor} onMouseOver={props.onMouseOver} onMouseLeave={props.onMouseLeave}>
        </button>
      </Draggable>
    );
  }
}

class Board extends React.Component {
  renderSquare(i, highlight) {
    let boardColor = this.props.boardSquares[i]
    let colorNum = 0
    if(boardColor === 'B' || boardColor === 'K' ){
      colorNum = 1
    }
    if(boardColor === 'H'){
        highlight = true
    }

    return (
      <Square
        color = {colorNum}
        value={this.props.squares[i]}
        highlight = {highlight}
        id={i}
      > </Square>
    );
  }

  renderChecker(i){
    let symbolInBoard = this.props.squares[i]
    let checkerColor = 0
    if(symbolInBoard === 'X'){
      checkerColor = 1
    }
    if(symbolInBoard === ' '){
      return;
    }

  return(
    <Checker
      color = {checkerColor}
      value= {this.props.squares[i]}
      onMouseOver={() => this.props.onMouseOver(i)}
      onMouseLeave={() => this.props.onMouseLeave(i)}
      onDrag={() => this.props.onDrag(i)}
      onMouseUp={() => this.props.onMouseUp(i)}
      onMouseDown={() => this.props.onMouseDown(i)}
      id = {i}
    />
    );
  }

  renderRow(start, odd){
    //renders one reow of checkers and board squares
    return (
      <div className="board-row">
        {this.renderChecker(start)}
        {this.renderSquare(start)}
        {this.renderChecker(start+1)}
        {this.renderSquare(start+1)}
        {this.renderChecker(start+2)}
        {this.renderSquare(start+2)}
        {this.renderChecker(start+3)}
        {this.renderSquare(start+3)}
        {this.renderChecker(start+4)}
        {this.renderSquare(start+4)}
        {this.renderChecker(start+5)}
        {this.renderSquare(start+5)}
        {this.renderChecker(start+6)}
        {this.renderSquare(start+6)}
        {this.renderChecker(start+7)}
        {this.renderSquare(start+7)}
      </div>
    );
  }

  render() {
    //makes each row of the game board
    return (
      <div>
        <div className="board-row">
          {this.renderRow(0, false)}
        </div>
        <div className="board-row">
          {this.renderRow(8, true)}
        </div>
        <div className="board-row">
          {this.renderRow(16, false)}
        </div>
        <div className="board-row">
          {this.renderRow(24, true)}
        </div>
        <div className="board-row">
          {this.renderRow(32, false)}
        </div>
        <div className="board-row">
          {this.renderRow(40, true)}
        </div>
        <div className="board-row">
          {this.renderRow(48, false)}
        </div>
        <div className="board-row">
          {this.renderRow(56, true)}
        </div>
      </div>
    );
  }
}

//winner/loser banner
function Results(props){
  return(
  <div>
    <div className="bannerText">{props.WinnerText}</div>
    <div className="bannerText">{props.ResetText}</div>
  </div>
  );
}

//winner/loser banner
function NoMoreMoves(props){
  let loser;
  let winner;
  if(props.winner !== props.whiteIsNext){
    winner = "White "
    loser = "Black"
  }else{
    winner = "Black "
    loser = "White"
  }
  return(
  <div>
    <div className="bannerText">There are No More Moves for {loser}</div>
    <div className="bannerText">{winner} wins by default</div>
    <div className="bannerText">{props.ResetText}</div>
  </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [ //contains all the states of the board and checker locations
        {
          squares: pieces, //checker locations
          boardSquares: board //colors of the squares
        }
      ],
      actualMoves: [
        {
          squares: pieces, //has the checker locations of actual moves made
        }
      ],
      stepNumber: 0, // size of history
      whiteIsNext: false, //is white currently up
      currIndex: -1, //the index of the checker being dragged
      numWhite: 12, //the number of white checkers in the game
      numBlack: 12, //the number of black checkers in the game
      numMoves: 0, //the number of moves balck has taken
      dragging: false, //is a checker currently being dragged
      x: 0, //x location of mouse
      y: 0, //y location of mosue
      inDoubleCapture: false, //is checker that was just dragged able to multi-capture
      droppedIndex: -1, //index of the dropped checker
      areMoreMoves:true // true if both players are able to make a move
    };
   
  }  

  //unhighlights the squares on the board
  unHighlightSquares(){
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    this.setState({
      stepNumber: history.length,
      history: history.concat([
        {
          squares: squares,
          boardSquares: board
        }
      ]),
    });
  }

  //sets the variables accordingly for when a drag starts
  dragMovement(i){
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const boardSquares = current.boardSquares.slice();
     this.setState({
      stepNumber: history.length,
      dragging: true,
      currIndex: i,
      history: history.concat([
        {
          squares: squares,
          boardSquares: boardSquares
        }
      ]),
    });
  }

  //returns the x, y position of square i
  getSquarePos(i){
    let id = "square" + i
    const element = document.getElementById(id);
    const position = element.getBoundingClientRect();
    return position
  }

  //ensures the mouse location is being tracked when the drag is started
  dragStart(){  
    this.onMouseMove.bind(this)
  }

  //updates the x and y location of the mouse
  onMouseMove(e){
      this.setState({x: e.clientX, y: e.clientY})
  }

  //checks if the user dropped the checker in a highlighted square using the position of
  //the box and the postion of the mouse
  canMoveToDroppedSqaure(){
    let blockWidth = this.getSquarePos(1).x - this.getSquarePos(0).x
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const boardSquares = current.boardSquares.slice();
    let highlightIndices = this.hasH(boardSquares)
    if(highlightIndices.length === 1 && highlightIndices[0] === -1){
      return false
    }
    for(let i = 0; i < highlightIndices.length; i++){
      let highlightBlock = this.getSquarePos(highlightIndices[i])
      if(this.state.x > highlightBlock.x && this.state.x < highlightBlock.x + blockWidth){
        if(this.state.y > highlightBlock.y && this.state.y < highlightBlock.y + blockWidth){
          return highlightIndices[i]
        }
      }
    }
    return false
  }

  //checks if there are valid moves for X using the current board and the squares
  canMakeAMove(squares, boardSquares){
    for(let i = 0; i < 64; i++){
      if(squares[i] === 'X'){
        boardSquares = this.highlightSquares(i)
        let ableToCapture = this.ableToCapture(i, boardSquares)
        console.log(this.hasH(boardSquares))
        if(ableToCapture !== 0){
          return true
        } else if(this.hasH(boardSquares).length > 1 || this.hasH(boardSquares)[0] !== -1){
          return true
        }
      }
    }
    return false
  }

  //moves out of bounds checkers that were dragged and checkers that were dragged to invalid locations
  //back to their original location
  repopulateX(squares){
    let id = "checker"+this.state.currIndex
    document.getElementById(id).getBoundingClientRect().x = 0
    squares[this.state.currIndex] = 'X'
    return squares
  }

  //handles the actions that occur after a user drops a checker after dragging it
  //is ultimately repsonsible for moving the checker to the user's desired location
  //multi-captures are taken care of here
  //users must drop a checker in between each capture, but will be able to continue their captures after doing so
  onDragStop(){
    if(this.state.dragging === false ){
      return
    }
    let currTurn = this.state.whiteIsNext
    let currentMovesTaken = this.state.numMoves
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const moves = this.state.actualMoves.slice(0,this.state.numMoves + 1);
    const current = history[history.length - 1];
    let squares = current.squares.slice();
    const boardSquares = current.boardSquares.slice();
    if(this.canMakeAMove(squares, boardSquares) === false){
      this.setState({
        areMoreMoves: false,
        whiteIsNext: !this.state.whiteIsNext
      })
      return
    }
    let highlightIndices = this.hasH(boardSquares)
    let droppedIndex = this.canMoveToDroppedSqaure()
    let numberWhite = this.state.numWhite
    if(highlightIndices.length === 1 && highlightIndices[0] === -1){
      squares = this.repopulateX(squares)
      console.log("not possible")
    }else if(droppedIndex === false){
      squares = this.repopulateX(squares)
      console.log("invalid drop location")
    }else{
      squares[this.state.currIndex] = ' '
      squares[droppedIndex] = 'X'
      currTurn = !currTurn
      currentMovesTaken = currentMovesTaken + 1
      let otherPlayerPos = this.ableToCapture(this.state.currIndex, boardSquares, droppedIndex)
      if(otherPlayerPos){
        this.unHighlightSquares()
        squares[otherPlayerPos] = ' '
        numberWhite = numberWhite - 1
        otherPlayerPos = this.ableToCapture(droppedIndex, boardSquares, droppedIndex)
        if(otherPlayerPos){
          this.unHighlightSquares()
          squares[droppedIndex] = 'X'
          squares[this.state.currIndex] = ' '
          board[droppedIndex] = 'B'
          this.setState({
            numMoves: currentMovesTaken,
            stepNumber: history.length,
            whiteIsNext: !currTurn,
            numWhite: numberWhite,
            droppedIndex: droppedIndex,
            dragging: false,
            inDoubleCapture: true,
            history: history.concat([
              {
                squares: squares,
                boardSquares: board
              }
            ]),
            actualMoves: moves.concat([
              {
                squares: squares,
              }
            ]),
            
          });
          return
        }
      }
      squares[droppedIndex] = 'X'
      squares[this.state.currIndex] = ' '
    }
    this.unHighlightSquares()
    board[droppedIndex] = 'B'
    this.setState({
      numMoves: currentMovesTaken,
      stepNumber: history.length,
      whiteIsNext: currTurn,
      numWhite: numberWhite,
      dragging: false,
      droppedIndex: droppedIndex,
      inDoubleCapture: false,
      history: history.concat([
        {
          squares: squares,
          boardSquares: board
        }
      ]),
      actualMoves: moves.concat([
        {
          squares: squares,
        }
      ]),
    });
  }

  //checkers if the board boardSquares has any highlighted elements
  // note: white checkers highlighted squares will have already been converted to k
  hasH(boardSquares){
    let x = []
    let idx = 0;
    for(let i = 0; i < 64; i++){
      if(this.state.whiteIsNext){
        if(boardSquares[i] === 'K'){
          x[idx] = i
          idx = idx+1
        }
      }else{
        if(boardSquares[i] === 'H'){
          x[idx] = i
          idx = idx+1
        }
      }
    }
    if(idx === 0)
      return [-1];
    else
      return x
  }

  //checks if checker i is able to capture a piece in the board boardSquares
  //droppedIndex is used to check double capture possibilities
  //squares[i-7] and squares[i-9] correspond to white checkers if statements and 
  //squares [i+7] and squares [i+9] correspnd to black checkers
  // it could be easily extended to kave king checkers mechanics
  ableToCapture(i, boardSquares, droppedIndex=-1){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let oppositeChar = 'O'
    let change = false
    let retVal = 0;
    if(this.state.whiteIsNext){
      oppositeChar = 'X'
      if(i<=7)
        return 0
    }else{
      if(i>=56)
        return 0
    }
    if(squares[i-7] === oppositeChar && squares[i-14] === ' ' && i>=17 && (i+1)%8 !== 0 && (i+2)%8 !==0 && this.state.whiteIsNext){
      retVal = i-7
      if(boardSquares)
        boardSquares[i-14] = 'H'
      change = true
    }
    if(squares[i+7] === oppositeChar && squares[i+14] === ' ' && i<=46 && (i-1)%8 !== 0 && (i)%8 !==0 && !this.state.whiteIsNext){
      if(boardSquares)
        boardSquares[i+14] = 'H'
      change = true
      retVal = i+7
      console.log("i+7 " + retVal)
    }
    if(squares[i-9] === oppositeChar && squares[i-18] === ' ' && i>=19 && i%8 !== 0 && (i-1)%8 !== 0 && this.state.whiteIsNext){
      console.log("here" + boardSquares)
      if(boardSquares)
        boardSquares[i-18] = 'H'
      change = true
      retVal = i-9
    }
    if(squares[i+9] === oppositeChar && squares[i+18] === ' ' && i<=44 && (i+1)%8 !== 0 && (i+2)%8 !== 0 && !this.state.whiteIsNext){
      if(boardSquares)
        boardSquares[i+18] = 'H'
      change = true
      if(retVal === 0 || droppedIndex === i+18)
        retVal = i+9     
    }
    if(this.state.whiteIsNext){
      boardSquares = this.changeHtoK(boardSquares)
    }
    
    if(change === false){
      return 0;
    }
    this.setState({
      stepNumber: history.length,
      history: history.concat([
        {
          squares: squares,
          boardSquares: boardSquares
        }
      ]),
    });
    return retVal;
  }

  //highlights the valid movements on the game board for checker i that the user specifies
  //does not highlight the capture places, but it does call the function
  //returns the board with the highlighted places
  highlightSquares(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let boardSquares = current.boardSquares.slice()
    let currentTurn = this.state.whiteIsNext
    if(currentTurn){
      if(squares[i] === 'X')
        return board;
    }else{
      if(squares[i] === 'O' || squares[i] === 'D')
        return board;
    }
    if(this.ableToCapture(i, boardSquares) !== 0 || this.state.inDoubleCapture){
      return board;
    }
    if(i>7 && i < 56){
      if(i%8 === 0){
        if(squares[i-7] === ' ' && this.state.whiteIsNext)
          boardSquares[i-7] = 'H'
        if(squares[i+9] ===' ' && !this.state.whiteIsNext)
          boardSquares[i+9] = 'H'
      }else if((i+1)%8 === 0){
        if(squares[i+7] === ' ' && !this.state.whiteIsNext)
          boardSquares[i+7] = 'H'
        if(squares[i-9] === ' ' && this.state.whiteIsNext)
          boardSquares[i-9] = 'H'
      }else{
        if(squares[i+7] === ' ' && !this.state.whiteIsNext)
          boardSquares[i+7] = 'H'
        if(squares[i-7] === ' ' && this.state.whiteIsNext)
          boardSquares[i-7] = 'H'
        if(squares[i+9] === ' ' && !this.state.whiteIsNext)
          boardSquares[i+9] = 'H'
        if(squares[i-9] === ' ' && this.state.whiteIsNext)
          boardSquares[i-9] = 'H'
      }
    }else if(i >= 56){
      if(squares[i-7] === ' ' && this.state.whiteIsNext)
        boardSquares[i-7] = 'H'
      if(squares[i-9] === ' ' && i !== 56 && this.state.whiteIsNext)
        boardSquares[i-9] = 'H'
    }else{
      if(squares[i+7] === ' ' && !this.state.whiteIsNext)
        boardSquares[i+7] = 'H'
      if(squares[i+9] === ' ' && i!== 7 && !this.state.whiteIsNext)
        boardSquares[i+9] = 'H'
    }
    if(this.state.whiteIsNext){
      boardSquares = this.changeHtoK(boardSquares)
    }
    this.setState({
      stepNumber: history.length,
      history: history.concat([
        {
          squares: squares,
          boardSquares: boardSquares
        }
      ]),
    });
    return boardSquares
  }

  //changes all the highlighted squares to k
  //used to differentiate between black and white's highlighted sqaures
  //k's are used in white's board
  changeHtoK(boardSquares){
    for(let i = 0; i < 64; i++){
      if(boardSquares[i] === 'H')
        boardSquares[i] ='K'
    }
    return boardSquares
  }

  //checks if their is a winner of the game
  calculateWinner(){
    if(this.state.numBlack === 0 || this.state.numWhite === 0){
      return true;
    }else{
      return false;
    }
  }

  //determines what the computer's move is
  //will go through all the possibilities and chose a semi-random one that works
  //will prioritize capturing and double capturing
  computerTurn(){
    this.sleep(500)
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    let current = history[history.length - 1];
    let squares = current.squares.slice();
    let boardSquares = current.boardSquares.slice()
    console.log("board" + boardSquares)
    let firstFoundIndex = -1;
    let ableToCapture = false;
    let ableToCaptureVal = 0;
    for(let i = 0; i < 64; i++){
      let random = Math.floor(Math.random() * 2)
      let ableToCaptureReturnVal = this.ableToCapture(i, boardSquares)
      let hasHReturnVal = this.hasH(boardSquares)
      if(hasHReturnVal === -1)
        continue
      if(squares[i] === 'O'){
        boardSquares = this.highlightSquares(i, boardSquares)
        hasHReturnVal = this.hasH(boardSquares)
        console.log(boardSquares)
        if(ableToCaptureReturnVal !== 0){
          firstFoundIndex = i;
          ableToCapture = true
          ableToCaptureVal = ableToCaptureReturnVal
          break;
        } else if(hasHReturnVal.length > 0 && hasHReturnVal[0] !== -1   && hasHReturnVal !== -1 && firstFoundIndex === -1){
          firstFoundIndex = i;
        }else if(hasHReturnVal.length > 0 && hasHReturnVal[0] !== -1 && hasHReturnVal !== -1 && random === 0){
          firstFoundIndex = i;
        }
      }
    }
    if(firstFoundIndex === -1){
      this.setState({
        whiteIsNext: !this.state.whiteIsNext,
        areMoreMoves: false
      }); 
      return;
    }
    let numberBlack = this.state.numBlack
    let hPosition = 0;
    if(ableToCapture){
      squares[ableToCaptureVal] = ' '
      numberBlack = numberBlack - 1
      if(firstFoundIndex-7 === ableToCaptureVal)
        hPosition = firstFoundIndex-14
      else if(firstFoundIndex-9 === ableToCaptureVal)
        hPosition = firstFoundIndex-18
    }else{
      boardSquares = this.highlightSquares(firstFoundIndex)
      let hPositions = this.hasH(boardSquares)
      hPosition = -1
      let idx = 0;
      while((hPositions[idx] !== firstFoundIndex - 7 || hPositions[idx] !== firstFoundIndex - 9 ) && idx < hPositions.length){
        hPosition = this.hasH(boardSquares)[idx]
        idx++;
      }
      if(hPosition === -1){
        this.computerTurn()
      }
    }
    squares[firstFoundIndex] = ' '
    
    this.unHighlightSquares()
    let secondCaptureVal = this.ableToCapture(hPosition, boardSquares)
    if(ableToCapture&&secondCaptureVal){
      this.unHighlightSquares()
      squares[secondCaptureVal] = ' '
      squares[hPosition] = ' '
      if(hPosition-7 === secondCaptureVal)
        hPosition = secondCaptureVal-7
      else if(hPosition-9 === secondCaptureVal)
        hPosition = secondCaptureVal-9
      numberBlack = numberBlack - 1
      squares[hPosition] = 'O'
    }else{
      squares[hPosition] = 'O'
    }
    this.unHighlightSquares()
    this.setState({
      numBlack: numberBlack,
      whiteIsNext: !this.state.whiteIsNext,
      history: history.concat([
        {
          squares: squares,
          boardSquares: board
        }
      ]),
      stepNumber: history.length,
    }); 
  }

  //pauses game for (milliseconds)
  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  //checks if user has pressed the finish turn button and has made their move
  //ie it's white's turn to move
  checkIfCanMove(){
    if(this.state.whiteIsNext && this.state.numMoves > 0){
      this.computerTurn()
    }
  }

  //resets game to intial state
  resetGame(){
    this.setState({
      history: [
        {
          squares: pieces,
          boardSquares: board
        }
      ],
      actualMoves: [
        {
          squares: pieces,
        }
      ],
      stepNumber: 0,
      whiteIsNext: false,
      currIndex: -1,
      numWhite: 12,
      numBlack: 12,
      numMoves: 0,
      dragging: false,
      x: 0,
      y: 0,
      inDoubleCapture: false,
      droppedIndex: -1,
      areMoreMoves:true,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner();
    let status;
    let WinnerText = "The Computer Won. Don't worry, you'll get 'em next time."
    let ResetText = "Press Reset Game to Play Again!";
    if (winner) {
      if(this.state.numWhite === 0){
        status = "You Won!";
        WinnerText = "Congrats, You Won!"
      }else{
        status = "The Computer Won.";
        WinnerText = "The Computer Won. Don't worry, you'll get 'em next time."
      }
    } else {
      status = "Who's Up: " + (this.state.whiteIsNext ? "White" : "Black");
    }
    let numMoves 
    if(this.state.numMoves !== 1){
      numMoves = (this.state.numMoves) + " moves taken"
    } else{
      numMoves = (this.state.numMoves) + " move taken"
    }
    let numberWhitePieces = "White: " + (this.state.numWhite) + " board pieces" 
    let numberBlackPieces = "Black: " + (this.state.numBlack) + " board pieces"

     return (
      <div className="game" >
        <div>Welcome To Sarah's Checkers Game</div>
        <div className="stats2">
        <div className = "stats">
        <div className = "game-stats">Game Stats</div>
        <div className="gameText">{numberWhitePieces}</div>
        <div className="gameText">{numberBlackPieces}</div>
        <div>{numMoves}</div>
        <div>{status}</div>
        </div>
        <div className = "stats">
        <div className = "game-stats">Game Controls</div>
        <div> <button className="button" onClick={() =>this.resetGame()}>Reset Game</button></div>
        <div><button className="bigbutton" onClick={() =>this.checkIfCanMove()}>Finish Turn</button></div>
        </div>
        </div>
        <div className="winnerBanner">
          { winner ? <Results 
            WinnerText={WinnerText}
            ResetText={ResetText}
           /> : null 
          }
        </div>
        <div className="winnerBanner">
          { !this.state.areMoreMoves ? <NoMoreMoves 
            winner={this.state.whiteIsNext}
            ResetText={ResetText}
           /> : null 
          }
        </div>
        <div id="b" className="game-board" onMouseMove={this.onMouseMove.bind(this)} onMouseUp={i=> this.onDragStop()}>
          <Board 
            whiteIsNext={this.state.whiteIsNext}
            squares={current.squares}
            boardSquares={current.boardSquares}
            onMouseOver={i => this.highlightSquares(i)}
            onMouseLeave={() => this.unHighlightSquares()}
            onMouseDown={() => this.dragStart()}
            onDrag={i=> this.dragMovement(i)}
            onMouseUp={()=> this.onDragStop()}
            stepNumber={this.state.stepNumber}
          />
          
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);