import store from 'react-native-simple-store';

export default (state = [], action) => {
  const impacts = [...state];
  switch (action.type) {
    case 'RECEIVE_IMPACTS':
      return action.impacts && action.impacts.length ? action.impacts : [];
    case 'CREATE_IMPACT': {
      const newImpact = {
        impact: action.impact,
        date: action.date
      };
      impacts.push(newImpact);
      store.push('impacts', newImpact);
      return impacts;
    }
    default:
      return state;
  }
};
