// actions.js
const CHANGE_STATE = 'CHANGE_STATE';

const changeState = newState => ({ type: CHANGE_STATE, newState });

module.exports = {
  CHANGE_STATE,
  changeState,
};
