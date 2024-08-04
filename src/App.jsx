import { useState } from "react";
import CustomSelect from "./components/CustomSelect/CustomSelect";


const App = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);


  const groupedOptions = [
    {
      label: 'Asia',
      options: [
        {label: "Afghanistan"},
        {label: "Bangladesh"},
        {label: "Bhutan"},
        {label: "China"},
        {label: "India"},
        {label: "Japan"},
        {label: "Malaysia"},
        {label: "Nepal"},
        {label: "Pakistan"},
      ]
    },
    {
      label: 'Middle East',
      options: [
        {label: "Egypt"},
        {label: "Iran"},
        {label: "Jordan"},
        {label: "Palestine"},
        {label: "Qatar"},
        {label: "Saudi Arabia"},
      ]
    }
  ];


  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption);
  }

  const handleMenuOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleSearch = (text) => {
    setSearchText(text)
  }


  return (
    <div className="kzui_component-box">
      <h1>Select Your Desired Country</h1>

      <CustomSelect
      isClearable = {true}
      isSearchable = {true}
      isDisabled = {false}
      options = {groupedOptions}
      value = {selectedValue}
      placeholder = 'Select Country...'
      isGrouped = {true}
      isMulti = {true}
      onChangeHandler = {handleChange}
      onMenuOpen = {handleMenuOpen}
      onSearchHandler = {handleSearch}
      searchText = {searchText}
      isOpen = {isOpen}
      />
    </div>
  );
};

export default App;