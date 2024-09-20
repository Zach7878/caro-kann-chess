"use client";

import ChessboardGrid from "./board";
import { useState } from "react";

const Page = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  return (
    <div className="page-container">
      <ChessboardGrid onGameOver={setIsGameOver} />
      {isGameOver && <div className="overlay">YOUR WINNER!!!!!!</div>}
    </div>
  );
};

export default Page;
