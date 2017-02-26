// npm packages
import React from 'react';

import {connect} from 'react-redux';

import {searchQuestions} from '../../store/actions';

const mapStateToProps = state => ({
  questions: state.questions.questions,
});

const mapDispatchToProps = dispatch => ({
  onUserInput: searchText => dispatch(searchQuestions(searchText)),
});


const SearchBar = ({onUserInput, questions}) => {
  let filterTextInput;

  const handleChange = () => {
    // if (filterTextInput.value.length >= 3) {
    //
    // }
    onUserInput({
      skip: questions.length,
      limit: 10,
      searchText: filterTextInput.value,
    });
  };

  return (
    <div className="input-group">
      <input
        type="text"
        id="searchInput"
        className="form-control"
        placeholder="Search..."
        ref={(input) => { filterTextInput = input; }}
        onChange={handleChange}
      />
    </div>

  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
