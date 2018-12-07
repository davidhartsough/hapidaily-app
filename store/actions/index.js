import store from 'react-native-simple-store';

// Goals

export const createGoal = (goal, person) => ({
  type: 'CREATE_GOAL',
  goal,
  person
});

export const updateGoal = (index, goal, person) => ({
  type: 'UPDATE_GOAL',
  index,
  goal,
  person
});

export const deleteGoal = index => ({
  type: 'DELETE_GOAL',
  index
});

export const receiveGoals = goals => ({
  type: 'RECEIVE_GOALS',
  goals
});

export const fetchGoals = () => dispatch => store.get('goals').then(goals => dispatch(receiveGoals(goals)));

// Impacts

export const createImpact = impact => ({
  type: 'CREATE_IMPACT',
  impact,
  date: Date.now()
});

export const receiveImpacts = impacts => ({
  type: 'RECEIVE_IMPACTS',
  impacts
});

export const fetchImpacts = () => dispatch => store.get('impacts').then(impacts => dispatch(receiveImpacts(impacts)));

// People

export const createPerson = name => ({
  type: 'CREATE_PERSON',
  name
});

export const updatePerson = (index, name) => ({
  type: 'UPDATE_PERSON',
  index,
  name
});

export const deletePerson = index => ({
  type: 'DELETE_PERSON',
  index
});

export const receivePeople = people => ({
  type: 'RECEIVE_PEOPLE',
  people
});

export const importPeople = people => ({
  type: 'IMPORT_PEOPLE',
  people
});

export const fetchPeople = () => dispatch => store.get('people').then(people => dispatch(receivePeople(people)));
