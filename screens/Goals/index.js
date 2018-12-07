import { connect } from 'react-redux';
import { createGoal, updateGoal, deleteGoal, createImpact } from '../../store/actions';
import GoalsScreen from './GoalsScreen';

const mapStateToProps = ({ goals, people }) => ({ goals, people });
const mapDispatchToProps = { createGoal, updateGoal, deleteGoal, createImpact };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalsScreen);
