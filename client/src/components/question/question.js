import React, {Component} from 'react';
import {connect} from 'react-redux';

import Answers from './answers.js';
import AddAnswer from './addAnswer.js';

import {deleteQuestion, saveOpenQuestion, clearOpenQuestion} from '../../store/actions';
import Modal from '../modal';

const mapStateToProps = state => ({
  userId: state.auth.user.id,
  openQuestions: state.questions.openQuestions,
});

const mapDispatchToProps = dispatch => ({
  onRemoveQuestionClick: questionId => dispatch(deleteQuestion(questionId)),
  onSaveOpenQuestion: questionId => dispatch(saveOpenQuestion(questionId)),
  onClearOpenQuestion: questionId => dispatch(clearOpenQuestion(questionId)),
});

class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: this.props.openQuestions.filter(open => open === this.props.question.id).length > 0 ? false : true,
    };
  }

  componentWillUnmount() {
    if (!this.state.collapse) {
      this.props.onSaveOpenQuestion(this.props.question.id);
    }
  }

  componentDidMount() {
    this.props.onClearOpenQuestion(this.props.question.id);
  }

  render() {
    const {question} = this.props;
    const {collapse} = this.state;

    const handleRemoveClick = (e) => {
      e.preventDefault();
      this.setState({collapse: true});
      // this.props.onRemoveQuestionClick(question.id);
      return false;
    };

    const handleCollapseClick = (e) => {
      e.preventDefault();
      this.setState({
        collapse: !this.state.collapse,
      });
      return false;
    };

    return (
      <div className="panel panel-default">
        <Modal id={question.id} action={deleteQuestion} />
        <div className="panel-heading">
          <span className={`glyphicon glyphicon-${collapse ? 'plus' : 'minus'}`}
            style={{cursor: 'pointer'}}
            onClick={handleCollapseClick} />{' '}
          {question.text}
          <button
            className={`btn btn-xs btn-warning glyphicon glyphicon-trash pull-right ${this.props.userId !== question.owner ? 'hidden' : ''}`}
            onClick={handleRemoveClick}
            data-toggle="modal" data-target={'#modal' + question.id}
          >
          </button>
          <span className="pull-right">Owner: {question.login}</span>
        </div>
        {collapse ? null : <Answers question={question} loading />}
        {collapse ? null : <AddAnswer question={question} />}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Question);
