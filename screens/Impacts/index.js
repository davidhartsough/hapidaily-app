import { connect } from 'react-redux';
import ImpactsScreen from './ImpactsScreen';

const mapStateToProps = ({ impacts }) => ({ impacts });

export default connect(mapStateToProps)(ImpactsScreen);
