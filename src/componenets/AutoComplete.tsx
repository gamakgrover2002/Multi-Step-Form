import React, { useState, useEffect, useRef } from "react";

interface AutocompleteProps {
  onSelect: (address: string) => void;
  readonly?: boolean;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ onSelect, readonly }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      autocompleteService.current =
        new google.maps.places.AutocompleteService();
      placesService.current = new google.maps.places.PlacesService(
        document.createElement("div")
      );
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 2 && !readonly) {
      autocompleteService.current?.getPlacePredictions(
        { input: value },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(
              predictions.map((prediction) => prediction.description)
            );
          } else {
            setSuggestions([]);
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
    onSelect(suggestion); // Pass the selected address string to the parent
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter address"
        className="autocomplete-input"
        // Disable user input if readonly is true
        disabled={readonly}
      />
      {suggestions.length > 0 && !readonly && (
        <ul className="autocomplete-suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="autocomplete-suggestion"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
