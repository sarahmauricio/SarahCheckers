import React from 'react';
import ReactDOM from 'react-dom/client';
import Draggable from 'react-draggable';
import './index.css';

let pieces = 
  [' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X',
  'X', ' ', 'X', ' ', 'X', ' ', ' ', ' ',
  ' ', 'O', ' ', 'X', ' ', 'X', ' ', 'X',
  ' ', ' ', ' ', ' ', ' ', ' ', 'O', ' ',
  ' ', 'O', ' ', 'O', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', 'O', ' ',
  ' ', 'X', ' ', 'O', ' ', 'O', ' ', 'O',
  'O', ' ', ' ', ' ', ' ', ' ', ' ', ' '
]

let board = 
  ['W', 'B', 'W', 'B', 'W', 'B', 'W', 'B',
  'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W',
  'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B',
  'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W',
  'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B',
  'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W',
  'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B',
  'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W'
]

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
  renderSquare(i, odd, highlight) {
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
    return (
      <div className="board-row">
        {this.renderChecker(start)}
        {this.renderSquare(start, odd)}
        {this.renderChecker(start+1)}
        {this.renderSquare(start+1, odd)}
        {this.renderChecker(start+2)}
        {this.renderSquare(start+2, odd)}
        {this.renderChecker(start+3)}
        {this.renderSquare(start+3, odd)}
        {this.renderChecker(start+4)}
        {this.renderSquare(start+4, odd)}
        {this.renderChecker(start+5)}
        {this.renderSquare(start+5, odd)}
        {this.renderChecker(start+6)}
        {this.renderSquare(start+6, odd)}
        {this.renderChecker(start+7)}
        {this.renderSquare(start+7, odd)}
      </div>
    );
  }

  render() {

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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      len:0,
      stepNumber: 0,
      whiteIsNext: false,
      currIndex: -1,
      numWhite: 12,
      numBlack: 12,
      numMoves: 0,
      hasChanged:false,
      dragging: false,
      currSquareX:0,
      currSquareY:0,
      x: 0,
      y: 0,
      updateWhite: false,
      capturedPieces:[],
    };
   
  }  

  onClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const boardSquares = current.boardSquares.slice()
    let boardPiece = 'X'
    if(this.state.whiteIsNext)
      boardPiece = 'O'
    if(!this.state.whiteIsNext && squares[i] === 'O')
      return
    let hIndex = -1;
    for(let i = 0; i < 64; i++){
      if(boardSquares[i] === 'H'){
        hIndex = i;
        break;
      }
    }
    let otherPlayerPos = this.ableToCapture(i, boardSquares)
    let numberWhite = this.state.numWhite
    if(otherPlayerPos){
      squares[otherPlayerPos] = ' '
      numberWhite = numberWhite - 1
    }

    if(hIndex !== -1){
      squares[hIndex] = boardPiece
      squares[i] = ' '
    }
    this.setState({
      history: history.concat([
        {
          squares: squares,
          boardSquares: board
        }
      ]),
      numWhite: numberWhite,
      stepNumber: history.length,
      len: history.length,
      whiteIsNext: true,
      numMoves: this.state.numMoves+1,
    });
  }

  unHighlightSquares(){
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    this.setState({
      len: history.length,
      stepNumber: history.length,
      history: history.concat([
        {
          squares: squares,
          boardSquares: board
        }
      ]),
      
    });
  }

  dragMovement(i){
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const boardSquares = current.boardSquares.slice();
    const position = this.getSquarePos(i)
     this.setState({
      len: history.length,
      stepNumber: history.length,
      dragging: true,
      currIndex: i,
      currSquareX: position.x,
      currSquareY: position.y,
      history: history.concat([
        {
          squares: squares,
          boardSquares: boardSquares
        }
      ]),
      
    });
  }

  getSquarePos(i){
    let id = "square" + i
    const element = document.getElementById(id);
    const position = element.getBoundingClientRect();
    return position
  }

  dragStart(){  
    this.onMouseMove.bind(this)
  }

  onMouseMove(e){
      this.setState({x: e.clientX, y: e.clientY})
  }

  canMoveToDroppedSqaure(){
    let blockWidth = this.getSquarePos(1).x - this.getSquarePos(0).x
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const boardSquares = current.boardSquares.slice();
    let highlightIndices = this.hasH(boardSquares)
    console.log(highlightIndices)
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

  canMakeAMove(squares, boardSquares){
    for(let i = 0; i < 64; i++){
      if(squares[i] === 'X'){
        boardSquares = this.highlightSquares(i)
        if(this.ableToCapture(i, boardSquares) !== 0){
          return true
        } else if(this.hasH(boardSquares).length > 1 || this.hasH(boardSquares[0] === -1)){
          return true
        }
      }
    }
    return false
  }

  repopulateX(squares){
    let id = "checker"+this.state.currIndex
    document.getElementById(id).getBoundingClientRect().x = 0
    squares[this.state.currIndex] = 'X'
    return squares
  }

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
      alert("No More Moves")
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
      let otherPlayerPos = this.ableToCapture(this.state.currIndex, boardSquares)
      if(otherPlayerPos){
        squares[otherPlayerPos] = ' '
        numberWhite = numberWhite - 1
        /* for(let j = 0; j < this.state.capturedPieces.length; j++){
          squares[this.state.capturedPieces[j]] = ' '
          numberWhite = numberWhite - 1
        } */
      }
      squares[droppedIndex] = 'X'
      squares[this.state.currIndex] = ' '
    }
    this.unHighlightSquares()
    this.setState({
      len: history.length,
      numMoves: currentMovesTaken,
      stepNumber: history.length,
      whiteIsNext: currTurn,
      numWhite: numberWhite,
      dragging: false,
      capturedPieces: [],
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

  ableToCapture(i, boardSquares){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    let oppositeChar = 'O'
    let change = false
    let retVal = 0;
    if(this.state.whiteIsNext){
      oppositeChar = 'X'
    }
    let capturedIndex = -1;
    if(squares[i-7] === oppositeChar && squares[i-14] === ' ' && i>=17 && (i+1)%8 !== 0 && (i+2)%8 !==0 && this.state.whiteIsNext){
      retVal = i-7
      if(boardSquares)
        boardSquares[i-14] = 'H'
      change = true
      capturedIndex = i-7
      this.ableToCapture(i-14, boardSquares)
    }
    if(squares[i+7] === oppositeChar && squares[i+14] === ' ' && i<=46 && (i-1)%8 !== 0 && (i)%8 !==0 && !this.state.whiteIsNext){
      if(boardSquares)
        boardSquares[i+14] = 'H'
      change = true
      retVal = i+7
      capturedIndex = i+7
      this.ableToCapture(i+14, boardSquares)
    }
    if(squares[i-9] === oppositeChar && squares[i-18] === ' ' && i>=19 && i%8 !== 0 && (i-1)%8 !== 0 && this.state.whiteIsNext){
      console.log("here" + boardSquares)
      if(boardSquares)
        boardSquares[i-18] = 'H'
      change = true
      retVal = i-9
      capturedIndex = i-9
      this.ableToCapture(i-18, boardSquares)
    }
    if(squares[i+9] === oppositeChar && squares[i+18] === ' ' && i<=44 && (i+1)%8 !== 0 && (i+2)%8 !== 0 && !this.state.whiteIsNext){
      if(boardSquares)
        boardSquares[i+18] = 'H'
      change = true
      retVal = i+9     
      capturedIndex = i+9 
      this.ableToCapture(i+18, boardSquares)
    }
    if(this.state.whiteIsNext){
      //boardSquares = this.changeHtoK(boardSquares)
    }
    
    if(change === false)
      return 0;
      this.setState({
        len: history.length,
        stepNumber: history.length,
        capturedPieces: this.state.capturedPieces.concat(capturedIndex),
        history: history.concat([
          {
            squares: squares,
            boardSquares: boardSquares
          }
        ]),
      });
    return retVal;
  }

  highlightSquares(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let boardSquares = current.boardSquares.slice()
    let currentTurn = this.state.whiteIsNext
    if(currentTurn){
      if(squares[i] === 'X')
        return;
    }else{
      if(squares[i] === 'O' || squares[i] === 'D')
        return;
    }
    if(this.ableToCapture(i, boardSquares) !== 0){
      return;
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
      len: history.length,
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

  changeHtoK(boardSquares){
    for(let i = 0; i < 64; i++){
      if(boardSquares[i] === 'H')
        boardSquares[i] ='K'
    }
    return boardSquares
  }

  calculateWinner(){
    if(this.state.numBlack === 0 || this.state.numWhite === 0){
      return true;
    }else{
      return false;
    }
  }

  computerTurn(){
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    let current = history[history.length - 1];
    let squares = current.squares.slice();
    let boardSquares = current.boardSquares.slice()
    let firstFoundIndex = -1;
    let ableToCapture = false;
    let ableToCaptureVal = 0;
    for(let i = 0; i < 64; i++){
      let random = Math.floor(Math.random() * 2)
      let ableToCaptureReturnVal = this.ableToCapture(i, boardSquares)
      let hasHReturnVal = this.hasH(boardSquares)
      if(squares[i] === 'O'){
        boardSquares = this.highlightSquares(i, boardSquares)
        if(ableToCaptureReturnVal !== 0){
          firstFoundIndex = i;
          ableToCapture = true
          ableToCaptureVal = ableToCaptureReturnVal
          break;
        } else if(hasHReturnVal !== -1 && firstFoundIndex === -1){
          firstFoundIndex = i;
        }else if(hasHReturnVal !== -1 && random === 0){
          firstFoundIndex = i;
        }
      }
    }
    if(firstFoundIndex === -1){
      alert("Computer Has No Where To Go")
      this.setState({
        whiteIsNext: !this.state.whiteIsNext,
        hasChanged:false
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
      else if(firstFoundIndex+7 === ableToCaptureVal)
        hPosition = firstFoundIndex+14
      else if(firstFoundIndex-9 === ableToCaptureVal)
        hPosition = firstFoundIndex-18
      else
        hPosition = firstFoundIndex+18
    }else{
      boardSquares = this.highlightSquares(firstFoundIndex)
      hPosition = this.hasH(boardSquares)[0]
    }
    squares[firstFoundIndex] = ' '
    squares[hPosition] = 'O'
    if(this.ableToCapture(hPosition, boardSquares)){
      //add for double jumping
    }
    this.unHighlightSquares()
    this.setState({
      len: history.length,
      numBlack: numberBlack,
      whiteIsNext: !this.state.whiteIsNext,
      history: history.concat([
        {
          squares: squares,
          boardSquares: board
        }
      ]),
      stepNumber: history.length,
      hasChanged:false
    }); 
  }

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  checkIfCanMove(){
    if(this.state.whiteIsNext && this.state.numMoves > 0){
      this.computerTurn()
    }
  }

  countCharC(c, squares){
    let numChar = 0;
    for(let i = 0; i < 64; i++){
      if(squares[i] === c)
        numChar++;
    }
    return numChar
  }

  undoMove(){
    if(this.state.numMoves < 1){
      return;
    }else if(this.state.numMoves === 1){
      this.resetGame()
      return
    }
    const actualMoves = this.state.actualMoves;
    const currentSquare = actualMoves[this.state.numMoves];
    //let currentSquare = squares = squares[squares.length - 1]
    console.log(currentSquare)
    let newSquares = actualMoves.slice(0, actualMoves.length-1)
    console.log(newSquares)
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    
    this.setState({
      len: history.length,
      numMoves: this.state.numMoves-1,
      stepNumber: history.length,
      whiteIsNext: this.state.whiteIsNext,
      numWhite: this.countCharC('O', currentSquare),
      numBlack: this.countCharC('X', currentSquare),
      dragging: false,
      history: history.concat([
        {
          squares: currentSquare,
          boardSquares: board
        }
      ]),
      //actualMoves: newSquares,
    })
  }

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
      len:0,
      stepNumber: 0,
      whiteIsNext: false,
      currIndex: -1,
      numWhite: 12,
      numBlack: 12,
      numMoves: 0,
      hasChanged:false,
      dragging: false,
      currSquareX:0,
      currSquareY:0,
      x: 0,
      y: 0,
      updateWhite: false,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.len];
    const winner = this.calculateWinner();
    let status;
    if (winner) {
      if(this.state.numWhite === 0){
        status = "You Won!";
      }else{
        status = "The Computer Won.";
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
        <div className = "stats">
          <div className = "game-stats">Game Stats</div>
          <div>{numberWhitePieces}</div>
          <div>{numberBlackPieces}</div>
          <div>{numMoves}</div>
          <div>{status}</div>
          <button className="button" onClick={() =>this.undoMove()}>Undo Move</button>
          <button className="bigbutton" onClick={() =>this.checkIfCanMove()}>Finish Turn</button>
          <button className="button" onClick={() =>this.resetGame()}>Reset Game</button>
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