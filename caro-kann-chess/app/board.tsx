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

// Create a class component for the chessboard
class Board extends Component {
  chess = new Chess(); // Create a new Chess instance
  state = {
    board: this.make2DArray(), // Set the initial chessboard with pieces
    selectedPiece: null as { row: number; col: number } | null, // Track the selected piece
    isValidMove: false, // Track if the move is valid
  };

  // Method to create the initial chessboard array
  make2DArray(): string[][] {
    const mainArray: string[][] = [];

    // Initialize the board with empty strings
    for (let i = 0; i < 8; i++) {
      mainArray[i] = [];
      for (let j = 0; j < 8; j++) {
        mainArray[i][j] = ""; // Empty spots represented by an empty string
      }
    }

    // Assign black pieces ('b' prefix for black pieces)
    mainArray[0][0] = "br"; // Black Rook
    mainArray[0][1] = "bn"; // Black Knight
    mainArray[0][2] = "bb"; // Black Bishop
    mainArray[0][3] = "bq"; // Black Queen
    mainArray[0][4] = "bk"; // Black King
    mainArray[0][5] = "bb"; // Black Bishop
    mainArray[0][6] = "bn"; // Black Knight
    mainArray[0][7] = "br"; // Black Rook

    // Assign black pawns
    for (let j = 0; j < 8; j++) {
      mainArray[1][j] = "bp"; // Black Pawn
    }

    // Assign white pieces ('w' prefix for white pieces)
    mainArray[7][0] = "wr"; // White Rook
    mainArray[7][1] = "wn"; // White Knight
    mainArray[7][2] = "wb"; // White Bishop
    mainArray[7][3] = "wq"; // White Queen
    mainArray[7][4] = "wk"; // White King
    mainArray[7][5] = "wb"; // White Bishop
    mainArray[7][6] = "wn"; // White Knight
    mainArray[7][7] = "wr"; // White Rook

    // Assign white pawns
    for (let j = 0; j < 8; j++) {
      mainArray[6][j] = "wp"; // White Pawn
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
        return piece ? <span>{piece}</span> : null; // Default to showing the text or nothing if no piece
    }
  }

  handleClick = (row: number, col: number) => {
    const { selectedPiece, board } = this.state;

    if (selectedPiece) {
      // Move piece logic
      const newBoard = [...board];

      // Move the piece to the new position
      newBoard[row][col] = board[selectedPiece.row][selectedPiece.col];
      newBoard[selectedPiece.row][selectedPiece.col] = ""; // Empty the old position

      // Reset selection and state
      this.setState({
        board: newBoard,
        selectedPiece: null,
      });
    } else {
      // Select piece logic
      if (board[row][col]) {
        this.setState({ selectedPiece: { row, col } });
      }
    }
  };

  getSquareName(row: number, col: number): string {
    const letters = "abcdefgh";
    return `${letters[col]}${8 - row}`;
  }

  render() {
    const { board } = this.state; // Access the board state

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
                {/* Render the chess piece or image */}
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
