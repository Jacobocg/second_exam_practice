// npm packages
import React from 'react';
import MediaQuery from 'react-responsive';

// our packages
import {QuestionList, QuestionSingle} from '../../components/question';
import SearchBar from '../../components/searchbar';

const Home = () => (
  <div className="container">
    <SearchBar />
    <MediaQuery query="(min-width: 992px)">
      {(matches) => {
        if (matches) {
          return <QuestionList />;
        } else {
          return <QuestionSingle />;
        }
      }}
    </MediaQuery>
  </div>
);

export default Home;
