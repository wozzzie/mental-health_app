import { useEffect, useState } from "react";
import Image from "next/image";

interface TarotData {
  _id: string;
  description: string;
  cards: TarotCard[];
}

interface TarotCard {
  name: string;
  number: string;
  arcana: string;
  suit: string;
  img: string;
  fortune_telling: string[];
  keywords: string[];
  meanings: {
    light: string[];
    shadow: string[];
  };
  Archetype: string;
  "Hebrew Alphabet": string;
  Numerology: string;
  Elemental: string;
  "Mythical/Spiritual": string;
  "Questions to Ask": string[];
}

const Tarot: React.FC = () => {
  const [tarotData, setTarotData] = useState<TarotData | null>(null);

  const getTarotFromServer = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/tarotcards", {
        method: "GET",
      });

      if (response.ok) {
        const tarot = await response.json();
        console.log("Tarot data received:", tarot);
        setTarotData(tarot);
      } else {
        console.error(
          "Failed to retrieve tarot. Response status:",
          response.status
        );
        const errorText = await response.text();
        console.error("Error details:", errorText);
      }
    } catch (error) {
      console.error("Error fetching tarot cards:", error);
    }
  };

  useEffect(() => {
    getTarotFromServer();

    console.log(
      "tarotData",
      tarotData ? Object.entries(tarotData).map((el) => el[1].cards) : "ss"
    );
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {tarotData && (
        <div>
          <h1>Tarot Cards</h1>
          <p>Description: {tarotData.description}</p>
          <ul>
            {Object.entries(tarotData).map((el) =>
              el[1].cards.map((card: TarotCard, index: number) => (
                <li key={index}>
                  <h2>{card.name}</h2>
                  <p>Number: {card.number}</p>
                  <p>Arcana: {card.arcana}</p>
                  <Image
                    src={card.img}
                    alt={card.name}
                    width="100"
                    height="100"
                  />
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tarot;
