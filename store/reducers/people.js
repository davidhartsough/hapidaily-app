import store from 'react-native-simple-store';

export default (state = [], action) => {
  const people = [...state];
  switch (action.type) {
    case 'RECEIVE_PEOPLE':
      return action.people;
    case 'CREATE_PERSON':
      people.push(action.name);
      store.push('people', action.name);
      return people;
    case 'UPDATE_PERSON':
      people[action.index] = action.name;
      store.save('people', people);
      return people;
    case 'DELETE_PERSON':
      people.splice(action.index, 1);
      store.save('people', people);
      return people;
    default:
      return state;
  }
};