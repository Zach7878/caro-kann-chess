// app/page.tsx
"use client";

import ChessboardGrid from "./board";

const Page = () => {
  return (
    <div className="page-container">
      <h1>Chess Game</h1>
      <ChessboardGrid />
    </div>
  );
};

export default Page;
