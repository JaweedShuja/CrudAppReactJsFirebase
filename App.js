import React from 'react'
import CardView from './CardView'
import firebase from './firebase.js'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      id:'',
      Name:'',
      Email:'',
      DATA:[]
    }

    this.setName = this.setName.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.Add = this.Add.bind(this)
    this.Show = this.Show.bind(this)
    this.Delete = this.Delete.bind(this)
    this.ShowEdit = this.ShowEdit.bind(this)
  }

  componentDidMount(){
    this.Show();
  }


  setName(event){
    this.setState({
      Name: event.target.value
    })
  }

  setEmail(event){
    this.setState({
      Email: event.target.value
    })
  }

  Add = (Name, Email) => {
    let id = firebase.database().ref("userdata").push().getKey();
    firebase.database().ref("userdata").child(id).set({
      id,
      Name,
      Email
    }).then(
      () => {
        alert("Data Added")
      }
    ).catch(
      (error) => {
        alert(error.message)
      }
    )
  }
  Show = () => {
    let userdataRef = firebase.database().ref("userdata");
    userdataRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newData = [];

      for(let item in items){
        newData.push({
            id:items[item].id,
            Name:items[item].Name,
            Email:items[item].Email
        })
      }

      this.setState({
        DATA:newData
      })
    })
  }

  Delete = (id) => {
    firebase.database().ref("userdata").child(id).remove().then(() => {
      alert("deleted")
    })
  }
  
  ShowEdit = (id) => { // name.map(function(value){
        //     document.write(value + "<br/>")
        // })
    this.setState({
      id:id
    })
    for(let i = 0; i < this.state.DATA.length; i++){
      if(this.state.DATA[i].id == id){
        this.setState({
          Name:this.state.DATA[i].Name,
          Email: this.state.DATA[i].Email
        })
        break;
      }
    }   
  }

  Edit = (id, Name, Email) => {
    firebase.database().ref("userdata").child(id).update({
      "id":id,
      "Name":Name,
      "Email":Email
    }).then(() => {
      alert("Data Edited")
    })
  }

  

  render(){
    return(
      <div 
      style={{
        backgroundColor:'lightblue',
        textAlign:'center',
        
      }}
      >
        {/* <form> */}
          <label>
            Name  
            <input type="text" value={this.state.Name} onChange={this.setName} />
          </label> <br/>
          <label>
            Email
            <input type="text" value={this.state.Email} onChange={this.setEmail} />
          </label> <br />

          {/* <input type="submit" value="Add" onSubmit={() => this.Add(this.state.Name,this.state.Email)}/> */}

          <button onClick={() => this.Add(this.state.Name,this.state.Email)} >Add</button>
          <button onClick={() => this.Edit(this.state.id,this.state.Name, this.state.Email)}>Edit</button>

        {/* </form> */}

        {/* <CardView Name="Javed" Email="Javed@gmail.com"/> */}
        {this.state.DATA.map((data) => <CardView Name={data.Name} Email={data.Email} Delete={() => {this.Delete(data.id)}} ShowEdit={() => {this.ShowEdit(data.id)}} />)} 
      </div>
    );
  }
}

export default App
