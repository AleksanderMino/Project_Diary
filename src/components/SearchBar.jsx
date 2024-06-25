import React, { useState } from "react";
import Autosuggest from "react-autosuggest";

const SearchBar = ({ searchQuery, handleSearchChange, suggestions }) => {
  const [value, setValue] = useState(searchQuery);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    handleSearchChange({ target: { value: newValue } });
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setFilteredSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setFilteredSuggestions([]);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : suggestions.filter((suggestion) =>
          suggestion.name.toLowerCase().startsWith(inputValue)
        );
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  const inputProps = {
    placeholder: "Search projects...",
    value,
    onChange,
    className: "w-1/2 px-3 py-2 border rounded",
  };

  return (
    <div className="mb-4">
      <Autosuggest
        suggestions={filteredSuggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
};

export default SearchBar;
