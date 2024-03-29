import React, { useState, useEffect } from "react";
import "./FlashcardsStyles.css";
import { ReactComponent as AddIcon } from "../../assets/icons/addIcon.svg";
import AddFlashcardDeck from "../../components/molecues/AddFlashcardDeck/AddFlashcardDeck";
import FlashcardTest from "../../components/molecues/FlashcardTest/FlashcardTest";
import { Deck } from "../../types/flashCardsTypes";
import FlashcardDeck from "../../components/molecues/FlashcardDeck/FlashcardDeck";

const Flashcards = () => {
  const deckFromStorage = localStorage.getItem("decksFlashcards");
  const deckFromStorageParsed =
    deckFromStorage !== null ? JSON.parse(deckFromStorage) : [];
  const [decksFlashcards, setDecksFlashcards] = useState<Deck[]>(
    deckFromStorageParsed.length > 0
      ? JSON.parse(localStorage.decksFlashcards)
      : []
  );
  const [currentDeck, setCurrentDeck] = useState<number>(0);
  const [currentField, setCurrentField] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("decksFlashcards", JSON.stringify(decksFlashcards));
  }, [decksFlashcards]);

  const handleAddFlashcardsGroup = (): void => {
    setCurrentField("addFlashcard");
  };

  const deleteFLashcardsDeck = (id: number): void => {
    setDecksFlashcards((prevValue) => {
      return [...prevValue.filter((deck, deckindex) => deckindex !== id)];
    });
  };

  return (
    <div className="flashcards-container">
      <p>Click to add a flashcard deck!</p>
      {/* this div is temporary until i fix the svg */}
      <div style={{ height: "100px" }}>
        <AddIcon onClick={handleAddFlashcardsGroup} />
      </div>
      {(() => {
        switch (currentField) {
          case "test":
            return (
              <FlashcardTest
                deck={decksFlashcards[currentDeck]}
                setCurrentField={setCurrentField}
              />
            );
          case "addFlashcard":
            return (
              <AddFlashcardDeck
                setDecksFlashcards={setDecksFlashcards}
                setCurrentField={setCurrentField}
              />
            );
          default:
            return (
              <div className="flashcard-deck-container">
                {decksFlashcards.map((deck, index) =>
                  deck === undefined ? null : (
                    <FlashcardDeck
                      title={deck.title}
                      key={index}
                      index={index}
                      setCurrentField={setCurrentField}
                      setCurrentDeck={setCurrentDeck}
                      deleteFLashcardsDeck={deleteFLashcardsDeck}
                    />
                  )
                )}
              </div>
            );
        }
      })()}
    </div>
  );
};

export default Flashcards;
