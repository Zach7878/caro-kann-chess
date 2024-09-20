import React, { Component } from "react";
import Image from "next/image";
import { Chess } from "chess.js";
import bb from ".//images/bb.png";
import wb from ".//images/wb.png";
import bk from ".//images/bk.png";
import wk from ".//images/wk.png";
import bn from ".//images/bn.png";
import wn from ".//images/wn.png";
import bp from ".//images/bp.png";
import wp from ".//images/wp.png";
import bq from ".//images/bq.png";
import wq from ".//images/wq.png";
import br from ".//images/br.png";
import wr from ".//images/wr.png";

interface BoardProps {
  onGameOver: (isGameOver: boolean) => void;
}

class Board extends Component<BoardProps> {
  chess = new Chess();
  state = {
    board: this.make2DArray(),
    selectedPiece: null as { row: number; col: number } | null,
    isValidMove: false,
    isWhiteTurn: true,
  };

  static defaultProps = {
    onGameOver: () => {},
  };

  make2DArray(): string[][] {
    const mainArray: string[][] = [];
    for (let i = 0; i < 8; i++) {
      mainArray[i] = [];
      for (let j = 0; j < 8; j++) {
        mainArray[i][j] = "";
      }
    }

    mainArray[0][0] = "br";
    mainArray[0][1] = "bn";
    mainArray[0][2] = "bb";
    mainArray[0][3] = "bq";
    mainArray[0][4] = "bk";
    mainArray[0][5] = "bb";
    mainArray[0][6] = "bn";
    mainArray[0][7] = "br";

    for (let j = 0; j < 8; j++) {
      mainArray[1][j] = "bp";
    }

    mainArray[7][0] = "wr";
    mainArray[7][1] = "wn";
    mainArray[7][2] = "wb";
    mainArray[7][3] = "wq";
    mainArray[7][4] = "wk";
    mainArray[7][5] = "wb";
    mainArray[7][6] = "wn";
    mainArray[7][7] = "wr";

    for (let j = 0; j < 8; j++) {
      mainArray[6][j] = "wp";
    }

    return mainArray;
  }

  renderPiece(piece: string) {
    switch (piece) {
      case "wr":
        return <Image src={wr} alt="White Rook" width={60} height={60} />;
      case "br":
        return <Image src={br} alt="Black Rook" width={60} height={60} />;
      case "wn":
        return <Image src={wn} alt="White Knight" width={60} height={60} />;
      case "bn":
        return <Image src={bn} alt="Black Knight" width={60} height={60} />;
      case "wb":
        return <Image src={wb} alt="White Bishop" width={60} height={60} />;
      case "bb":
        return <Image src={bb} alt="Black Bishop" width={60} height={60} />;
      case "wq":
        return <Image src={wq} alt="White Queen" width={60} height={60} />;
      case "bq":
        return <Image src={bq} alt="Black Queen" width={60} height={60} />;
      case "wk":
        return <Image src={wk} alt="White King" width={60} height={60} />;
      case "bk":
        return <Image src={bk} alt="Black King" width={60} height={60} />;
      case "wp":
        return <Image src={wp} alt="White Pawn" width={60} height={60} />;
      case "bp":
        return <Image src={bp} alt="Black Pawn" width={60} height={60} />;
      default:
        return piece ? <span>{piece}</span> : null;
    }
  }

  makeAIMove = () => {
    const possibleMoves = this.chess.moves({ verbose: true });
    let madeAMove = false;
    let aiMove;
    possibleMoves.forEach((move) => {
      if (move.to === "c6" && !madeAMove && move.from === "c7") {
        this.chess.move(move);
        aiMove = move;
        madeAMove = true;
      } else if (move.to === "d5" && !madeAMove && move.from === "d7") {
        this.chess.move(move);
        aiMove = move;
        madeAMove = true;
      }
    });
    if (!madeAMove) {
      const randomMove =
        possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      this.chess.move(randomMove);
      aiMove = randomMove;
    }
    if (aiMove) {
      const newBoard = this.state.board.map((row) => row.slice());
      const fromSquare = this.getSquareCoordinates(aiMove.from);
      const toSquare = this.getSquareCoordinates(aiMove.to);
      newBoard[toSquare.row][toSquare.col] =
        newBoard[fromSquare.row][fromSquare.col];
      newBoard[fromSquare.row][fromSquare.col] = "";

      this.setState({
        board: newBoard,
        isWhiteTurn: true,
      });
    }
  };

  getSquareCoordinates(square: string): { row: number; col: number } {
    const letters = "abcdefgh";
    const col = letters.indexOf(square[0]);
    const row = 8 - parseInt(square[1]);
    return { row, col };
  }

  handleClick = (row: number, col: number) => {
    const { selectedPiece, board } = this.state;

    if (selectedPiece) {
      if (selectedPiece.row === row && selectedPiece.col === col) {
        this.setState({
          selectedPiece: null,
          isValidMove: false,
        });
      } else {
        const moveFrom = this.getSquareName(
          selectedPiece.row,
          selectedPiece.col
        );
        const moveTo = this.getSquareName(row, col);
        const move = this.chess.move({
          from: moveFrom,
          to: moveTo,
          promotion: "q",
        });
        if (move) {
          const newBoard = [...board];
          newBoard[row][col] = board[selectedPiece.row][selectedPiece.col];
          newBoard[selectedPiece.row][selectedPiece.col] = "";
          this.setState({
            board: newBoard,
            selectedPiece: null,
            isValidMove: false,
            isWhiteTurn: false,
          });
          if (this.chess.isGameOver()) {
            this.props.onGameOver(true);
          }
          setTimeout(this.makeAIMove, 500);
        } else {
          console.log("Invalid move");
          this.setState({ selectedPiece: null, isValidMove: false });
        }
      }
    } else {
      if (board[row][col]) {
        const possibleMoves = this.chess.moves({
          verbose: true,
        });

        if (possibleMoves.length > 0) {
          this.setState({
            selectedPiece: { row, col },
            isValidMove: true,
          });
        }
      }
    }
  };

  getSquareName(row: number, col: number): string {
    const letters = "abcdefgh";
    return `${letters[col]}${8 - row}`;
  }

  render() {
    const { board } = this.state;

    return (
      <div className="chessboard-grid">
        {Array.from({ length: 8 }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: 8 }).map((_, colIndex) => (
              <button
                key={colIndex}
                className={`button ${
                  (rowIndex + colIndex) % 2 === 0 ? "white" : "black"
                } ${
                  this.state.selectedPiece?.row === rowIndex &&
                  this.state.selectedPiece?.col === colIndex
                    ? "selected"
                    : ""
                }`}
                onClick={() => this.handleClick(rowIndex, colIndex)}
              >
                {this.renderPiece(board[rowIndex][colIndex])}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
export default Board;
