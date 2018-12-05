import React from 'react';
import { connect } from 'react-redux';
import { fetchGoals, fetchImpacts, fetchPeople } from './actions';

class FetchData extends React.Component {
  componentDidMount() {
    this.props.fetchGoals();
    this.props.fetchImpacts();
    this.props.fetchPeople();
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default connect(
  null,
  { fetchGoals, fetchImpacts, fetchPeople }
)(FetchData);
