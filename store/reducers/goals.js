import store from 'react-native-simple-store';

export default (state = [], action) => {
  const goals = [...state];
  switch (action.type) {
    case 'RECEIVE_GOALS':
      return action.goals && action.goals.length ? action.goals : [];
    case 'CREATE_GOAL': {
      const newGoal = {
        goal: action.goal,
        person: action.person
      };
      goals.push(newGoal);
      store.push('goals', newGoal);
      return goals;
    }
    case 'UPDATE_GOAL':
      goals[action.index] = {
        goal: action.goal,
        person: action.person
      };
      store.save('goals', goals);
      return goals;
    case 'DELETE_GOAL':
      goals.splice(action.index, 1);
      store.save('goals', goals);
      return goals;
    default:
      return state;
  }
};
