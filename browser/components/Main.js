import React, { Component } from 'react';
import axios from 'axios';

import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import NewStudent from './NewStudentForm.js';
import { runInNewContext } from 'vm';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: {},
      showForm :false
    };

    this.selectStudent = this.selectStudent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }

  componentDidMount() {
    this.getStudents();
  }

  async getStudents() {
    console.log('fetching');
    try {
      const { data } = await axios.get('/student');
      this.setState({ students: data });
    } catch (err) {
      console.error(err);
    }
  }

  async addStudent(studentObj){
    try{
   const res = await axios.post('/student',studentObj);
   const newStudent = res.data;
   this.setState({students:[...this.state.students, newStudent]})
    } catch(error){
      console.error(error)
    }
  }
  selectStudent(student) {
   return this.setState({
      selectedStudent: student,
    });
  }

  handleClick(){
   return this.setState({
      showForm: !this.state.showForm
    });
  }

  render() {
    return (
      <div>
        <h1>Students</h1>
        <button onClick={this.handleClick}>Add New Student</button>
        {this.state.showForm ? <NewStudent addedStudent ={this.addStudent}/> : null}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList
            students={this.state.students}
            selectStudent={this.selectStudent}
          />
        </table>
        {this.state.selectedStudent.id ? (
          <SingleStudent student={this.state.selectedStudent} />
        ) : null}
      </div>
    );
  }
}
