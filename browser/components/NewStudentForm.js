import React from 'react';

export default class NewStudent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      firstname:'',
      lastname:'',
      email:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }
  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }
    handleSubmit(event) {
    event.preventDefault();
    const {addedStudent} = this.props;
   addedStudent(this.state)
    this.setState({
     firstname:'',
     lastname:'',
     email:''
    });
    }

 render (){
return (
<form onSubmit={this.handleSubmit}>
  <label>
   First Name:
    <input type="text" name="firstname" onChange={this.handleChange}  value= {this.state.firstname} />
  </label>
  <label>
   Last Name:
    <input type="text" name="lastname"  onChange={this.handleChange} value={this.state.lastname} />
  </label>
  <label>
   Email:
    <input  type="text" name="email" onChange={this.handleChange} value={this.state.email}  />
  </label>
  <button type="submit">Submit</button>
</form>
)
 }
}

