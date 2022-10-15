import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function SearchBar({ placeholder, data}: any) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event: any) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value: any) => {
      return value.title.toLowerCase().startsWith(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="bg-slate-300 text-lg h-12 rounded-lg">
      <div className="flex">
        <input
          className="w-full rounded-lg pl-3 border-0"  
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="bg-slate-300  h-12 w-12 grid justify-items-center rounded-lg items-center">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon className="cursor-pointer" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="w-full max-h-52 h-auto items-center mt-1 bg-gray-100 overflow-hidden overflow overflow-y-auto shadow-md rounded-sm">
          {filteredData.slice(0, 15).map((value: any, key: any) => {
            return (
              <a className="w-full h-12 flex items-center text-black pl-4 hover:bg-gray-200" href={value.link} target="_blank">
                <p>{value.title} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;