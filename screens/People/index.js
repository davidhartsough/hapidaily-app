import { connect } from 'react-redux';
import { createPerson, updatePerson, deletePerson } from '../../store/actions';
import PeopleScreen from './PeopleScreen';

const mapStateToProps = ({ people }) => ({ people });
const mapDispatchToProps = { createPerson, updatePerson, deletePerson };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeopleScreen);
