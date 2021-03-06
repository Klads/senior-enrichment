import React, { Component } from 'react';
import NewStudent from '../components/addStudent';
import { createStudent } from '../reducers/student-reducer';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    list: state.campus.list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createStudent (student) {
      dispatch(createStudent(student));
    }
  };
};

class NewStudentContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      emailValue: '',
      campusId: 1
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps (newProps, oldProps) {
      this.setState({
        campusId: newProps.list[0].id,
      });
  }

  handleChange (evt) {
    const value = evt.target.value;
    if(evt.target.id === 'nameValue'){
      this.setState({
        nameValue: value
      });
    }
    if(evt.target.id === 'emailValue'){
      this.setState({
        emailValue: value
      });
    }
    if(evt.target.id === 'campus'){
      this.setState({
        campusId: value
      });
    }
  }

  handleSubmit (evt) {
    evt.preventDefault();
    console.log("id from student create:", this.state.campusId);
    this.props.createStudent({
      name: this.state.nameValue,
      email: this.state.emailValue,
      campusId: this.state.campusId
    });
    this.setState({
      nameValue: '',
      emailValue: '',
      campusId: this.props.list[0].id
    });
  }

  render () {

    return (
      <NewStudent
        {...this.state}
        {...this.props}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewStudentContainer);
