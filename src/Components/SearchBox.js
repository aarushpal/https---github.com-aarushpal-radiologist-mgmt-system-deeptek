import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBox.css";

const SearchBox = ({
  onSearch,
  keyword,
  setKeyword,
  searchBy,
  setSearchBy,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Filter By");
  //   const [keyword, setKeyword] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSearchBy(option);
    setIsActive(false);
  };

  const handleSearch = () => {
    onSearch(searchBy.toLowerCase(), keyword);
    console.log("keyword in searchBox", keyword);
  };

  return (
    <div className="wrapper">
      <div className="search_box">
        <div className="dropdown">
          <div
            className="default_option"
            onClick={() => setIsActive(!isActive)}
          >
            <b>{selectedOption}</b>
          </div>
          <ul className={isActive ? "active" : ""}>
            <li onClick={() => handleOptionClick("name")}>Name</li>
            <li onClick={() => handleOptionClick("email")}>Email</li>
            <li onClick={() => handleOptionClick("contact")}>Contact</li>
            <li onClick={() => handleOptionClick("username")}>Username</li>
            <li onClick={() => handleOptionClick("type")}>Type</li>
          </ul>
        </div>
        <div className="search_field">
          <input
            type="text"
            className="input"
            placeholder="Enter Keyword"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
        </div>
        <button type="submit" className="search-btn" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
