import React from "react";

const ChooseSignWindow: React.FC<{
  inputValue: string;
  handleZodiacChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSaveClick: () => void;
  zodiacSigns: string[];
}> = React.memo(
  ({ inputValue, handleZodiacChange, handleSaveClick, zodiacSigns }) => (
    <>
      <select value={inputValue} onChange={handleZodiacChange}>
        <option value="" disabled>
          Select a Zodiac Sign
        </option>
        {zodiacSigns.map((sign) => (
          <option key={sign} value={sign}>
            {sign}
          </option>
        ))}
      </select>
      <button onClick={handleSaveClick}>Save Zodiac Sign</button>
    </>
  )
);
ChooseSignWindow.displayName = "ChooseSignWindow";

export default ChooseSignWindow;
