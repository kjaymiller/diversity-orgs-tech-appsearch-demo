import PropTypes from "prop-types";
import React from "react";

import { FacetValue } from "@elastic/react-search-ui-views/lib/types";
import { appendClassName } from "@elastic/react-search-ui-views/lib/view-helpers";

function getFilterValueDisplay(filterValue) {
  if ([undefined, null, ''].includes(filterValue)) {
      console.log(filterValue)
      return "N/A";
  }
  if (filterValue.hasOwnProperty("name")) return filterValue.name;
  return String(filterValue);
}

function _MultiCheckboxFacet({
  className,
  label,
  onMoreClick,
  onRemove,
  onSelect,
  options,
  showMore,
  showSearch,
  onSearch,
  searchPlaceholder
}) {
  return (
    <fieldset className={appendClassName("sui-facet", className)}>
      <div className="xl:flex items-center justify-around px-3 text-lg">
        {options.length < 1 && <div>No matching options</div>}
        {options.map(option => {
          return (
            <label
              className="m-3"
              key={`${getFilterValueDisplay(option.value)}`}
              htmlFor={`example_facet_${label}${getFilterValueDisplay(
                option.value
              )}`}
            >
              <button 
              className="border hover:text-gray-100 focus:text-gray-100 hover:font-bold focus:font-bold bg-gradient-to-br from-indigo-100 focus:to-blue-200 focus:from-indigo-500  hover:to-blue-200 hover:from-indigo-500  p-3 border-gray-200 rounded-lg"
              onClick={() =>
                    onSelect(option.value)
                  }
              >
                  {getFilterValueDisplay(option.value)}

              </button>
            </label>
          );
        })}
      <button 
      onClick = {() => 
        onRemove(options.value)
      }
      className="h-7 px-2 focus:bg-red-200 border-gray-200 hover:bg-red-200"
      >Reset</button>
      </div>

      {showMore && (
        <button
          type="button"
          className=""
          onClick={onMoreClick}
          aria-label="Show more options"
        >
          + More
        </button>
      )}
    </fieldset>
  );
}

_MultiCheckboxFacet.propTypes = {
  label: PropTypes.string.isRequired,
  onMoreClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(FacetValue).isRequired,
  showMore: PropTypes.bool.isRequired,
  className: PropTypes.string,
  showSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string
};

export default _MultiCheckboxFacet;
