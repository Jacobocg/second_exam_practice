import {Observable} from 'rxjs/Observable';

import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {signRequest, ajaxErrorToMessage} from '../../util';
import {server as serverConfig} from '../../../config';

const host = serverConfig.host;
const port = serverConfig.port;

export const getMoreQuestions = action$ => action$
  .ofType(ActionTypes.GET_MORE_QUESTIONS)
  .map(signRequest)
  .mergeMap(({headers, payload}) => Observable
    .ajax.get(`http://${host}:${port}/api/question?skip=${payload.skip || 0}&limit=${payload.limit || 10}`, headers)
    .delayInDebug(2000)
    .map(res => res.response)
    .map(questions => ({
      type: ActionTypes.GET_MORE_QUESTIONS_SUCCESS,
      payload: {questions},
    }))
    .catch(error => Observable.of(
      {
        type: ActionTypes.GET_MORE_QUESTIONS_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: `[get more questions] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
      ),
    )),
  );

export const getAnswers = action$ => action$
  .ofType(ActionTypes.GET_ANSWERS)
  .map(signRequest)
  .mergeMap(({headers, payload}) => Observable
    .ajax.get(`http://${host}:${port}/api/question/${payload.questionId}`, headers)
    .delayInDebug(2000)
    .map(res => res.response)
    .map(question => ({
      type: ActionTypes.GET_ANSWERS_SUCCESS,
      payload: question,
    }))
    .catch(error => Observable.of(
      {
        type: ActionTypes.GET_ANSWERS_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: `[get answers] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
      ),
    )),
  );

export const answerQuestion = action$ => action$
  .ofType(ActionTypes.ANSWER_QUESTION)
  .map(signRequest)
  .mergeMap(({headers, payload}) => Observable
    .ajax.post(`http://${host}:${port}/api/question/${payload.question.id}/answer`, {answer: payload.answer}, headers)
    .delayInDebug(2000)
    .map(res => res.response)
    .mergeMap(question => Observable.of(
      {
        type: ActionTypes.ANSWER_QUESTION_SUCCESS,
        payload: question,
      },
      Actions.addNotificationAction(
        {text: `Answer: "${payload.answer}" added to question: "${question.text}"`, alertType: 'info'},
      ),
      Actions.removeNotificationByRefAction(question.id),
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.ANSWER_QUESTION_ERROR,
        payload: {error},
        h: console.log(error),
      },
      Actions.addNotificationAction(
        {text: `[answer create] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
      ),
    )),
  );

export const createQuestion = action$ => action$
  .ofType(ActionTypes.CREATE_QUESTION)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.post(`http://${host}:${port}/api/question`, payload, headers)
    .map(res => res.response)
    .mergeMap(question => Observable.of(
      {
        type: ActionTypes.CREATE_QUESTION_SUCCESS,
        payload: question,
      },
      Actions.addNotificationAction(
        {text: `Question with text "${question.text}" created`, alertType: 'info'},
      ),
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.CREATE_QUESTION_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: `[question create] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
      ),
    )),
  );

export const removePendingQuestionNotifications = action$ => action$
  .ofType(ActionTypes.REMOVE_OBSERVABLE)
  .filter(action => action.payload && action.payload.question)
  .map(action => action.payload.question)
  .map(question =>
    Actions.removeNotificationByRefAction(question.id),
  );

export const deleteQuestion = action$ => action$
    .ofType(ActionTypes.DELETE_QUESTION)
    .map(signRequest)
    .switchMap(({headers, questionId}) => Observable
      .ajax.delete(`http://localhost:8080/api/question/${questionId}`, headers)
      .map(res => res.response)
      .mergeMap(questionDeleted => Observable.of({
        type: ActionTypes.DELETE_QUESTION_SUCCESS,
        payload: questionDeleted,
      },
      Actions.addNotificationAction(
        {text: 'Question deleted', alertType: 'info'}),
      ))
      .catch(error => Observable.of({
        type: ActionTypes.DELETE_QUESTION_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: `[question deleted] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
      ),
    )),
    );

export const searchQuestions = action$ => action$
    .ofType(ActionTypes.SEARCH_QUESTIONS)
    .map(signRequest)
    .throttleTime(1000)
    .switchMap(({headers, payload}) => Observable
      .ajax.get(`http://${host}:${port}/api/question?skip=${payload.skip || 0}&limit=${payload.limit || 10}&text=${payload.searchText}`, headers)
      .map(res => res.response)
      .map(questions => ({
        type: ActionTypes.GET_MORE_QUESTIONS_SUCCESS,
        payload: {questions},
      }))
      .catch(error => Observable.of(
        {
          type: ActionTypes.SEARCH_QUESTIONS_ERROR,
          payload: {error},
        },
        Actions.addNotificationAction(
          {text: `[search questions] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
        ),
      )),
    );
