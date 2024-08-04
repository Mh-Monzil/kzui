import "./CustomSelect.css";

const CustomSelect = ({
  isClearable,
  isSearchable,
  isDisabled,
  options,
  value,
  placeholder,
  isGrouped,
  isMulti,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
  searchText,
  isOpen,
}) => {
  // Handle value change
  const handleChange = (val) => {
    if (isMulti) {
      if (value && value.includes(val)) {
        // setSelectedValue(selectedValue.filter((v) => v !== value));
        onChangeHandler(value.filter((v) => v !== val));
      } else {
        onChangeHandler([...value, val]);
      }
    } else {
      onChangeHandler(value);
      onMenuOpen(); // Close menu for single selection
    }

    onChangeHandler && onChangeHandler(selectedValue);
  };

  // Handle search text change
  const handleSearch = (e) => {
    onSearchHandler(e.target.value);
  };

  // Clear selected value
  const handleClear = () => {
    onChangeHandler(isMulti ? [] : null);
  };

  // Filter options based on search text
  const filteredOptions = isGrouped
    ? options
        .map((group) => ({
          label: group.label,
          options: group.options.filter((option) =>
            option.label.toLowerCase().includes(searchText.toLowerCase())
          ),
        }))
        .filter((group) => group.options.length > 0)
    : options.filter((option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase())
      );

  return (
    <div
      className={`kzui_main-div ${isDisabled ? "kzui_select-disabled" : ""}`}
    >
      <div
        className="kzui_select-input "
      >
        {isMulti && value.length > 0 ? (
          // Display selected values for multi-select
          <div className="kzui_multi-values">
            {value.map((val, idx) => (
              <span key={idx} className="kzui_multi-value">
                {val.label}
                {isClearable && (
                  // Display selected value for single-select
                  <span
                    className="kzui_clear-single"
                    onClick={() => handleChange(val)}
                  >
                    &times;
                  </span>
                )}
              </span>
            ))}
          </div>
        ) : value ? (
          // Display selected value for single-select
          <span className="kzui_single-value">{value.label}</span>
        ) : (
          // Display placeholder when no selection is made
          <span className="kzui_placeholder">{placeholder}</span>
        )}

        {/* {isClearable && value && (
          // Button to clear all selections
          <span className="kzui_clear-all" onClick={handleClear}>
            &times;
          </span>
        )} */}

        <div onClick={() => !isDisabled && onMenuOpen()} className="kzui_dropdown-arrow">&#x25BC;</div>
      </div>

      {isOpen && (
        <div className="kzui_menu">
          {isSearchable && (
            <input
              type="text"
              className="kzui_search-input"
              value={searchText}
              onChange={handleSearch}
              placeholder="Search..."
            />
          )}

          <ul className="kzui_list">
            {isGrouped
              ? filteredOptions.map((group, idx) => (
                  <li key={idx} className="kzui_group">
                    <div className="kzui_group-label">{group.label}</div>
                    <ul className="kzui_group-list">
                      {group.options.map((option, idx) => (
                        <li
                          key={idx}
                          className={`kzui_option ${
                            value && value.includes(option)
                              ? "kzui_selected-option"
                              : ""
                          }`}
                          onClick={() => handleChange(option)}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))
              : filteredOptions.map((option, idx) => (
                  <li
                    key={idx}
                    className={`kzui_option ${
                      value && value.includes(option)
                        ? "kzui_selected-option"
                        : ""
                    }`}
                    onClick={() => handleChange(option)}
                  >
                    {option.label}
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
