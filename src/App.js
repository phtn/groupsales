import React, { Component } from 'react';
import Fire from './Fire'
import firebase from 'firebase'
import './App.css';
import './bootstrap.min.css'
import Landing from './Landing'

let provider = new firebase.auth.GoogleAuthProvider()
const auth = firebase.auth()

class App extends Component {
  constructor(){
    super()
    this.state = {
      items: [],
      email: 'clarionsalespa@gmail.com',
      user: null
    }
  }
  
  signInToGoogle(){
    auth.signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // let token = result.credential.accessToken;
      // console.log(token)
      // The signed-in user info.
      // let user = result.user;
      // console.log(agent)
      
      
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      // let errorCode = error.code;
      // let errorMessage = error.message;
      // The email of the user's account used.
      // let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // let credential = error.credential;
      // ...
    })
  }

  getUserState(state){
    if (state === ''){
      console.log('nothing')
    } else {
      console.log(state)
    }
  }

  componentDidMount(){
    const db = Fire.database().ref('groups')
    db.on('value', snap => {
      
      let items = snap.val()
      let newState = []
      
      for (let item in items){
        newState.push({
          id: item,
          name: items[item].name,
          email: items[item].email,
          phone: items[item].phone,
          group: items[item].groupName,
          type: items[item].groupType,
          rooms: items[item].numberOfRooms,
          nights: items[item].numberOfNights,
          arrival: items[item].arrivalDate,
        })
      }

      this.setState({items: newState})
      // console.log(this.state.user)
    })

    auth.onAuthStateChanged(user => {
      // console.log(user.email)
      // user ? this.setState(()=>({user})) : this.setState(()=>({user: null}))  
      
      if (user !== null){
        this.setState({user: user.email})
      } else {
        this.setState({user: null})
      }
    
    })
    
  }

  signOut(){
    auth.signOut()
  }

  getItems(state){
    console.log(state)
  }

  securePieline(){
    if (this.state.email === this.state.user){
      return <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">phone</th>
              <th scope="col">group</th>
              <th scope="col">Type</th>
              <th scope="col">Rooms</th>
              <th scope="col">Nights</th>
              <th scope="col">Arrival</th>
            </tr>
          </thead>
          <tbody>

            {
              this.state.items.map(item=> {
                return (
                  <tr key={item.id} style={{fontSize: 10, color: '#666'}}>
                    <th scope="row">{item.name}</th>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.group}</td>
                    <td>{item.type}</td>
                    <td>{item.rooms}</td>
                    <td>{item.nights}</td>
                    <td>{item.arrival}</td>
                  </tr>
                )
              })
            }
            
            
          </tbody>
        </table>
      </div>
    } else {
      return <div>Failed to Authenticate!</div>
    }
  }

  render() {
    
   

    return (
      <div className="App">
        
        
        <Landing 
          sign={(e)=>{
            e.preventDefault()
            // console.log(this.state.user === this.state.email)
            if (this.state.user === this.state.email){
              this.signOut()
            } else {
              this.signInToGoogle()
              
              // this.setState({user: null})
            }
            // console.log(this.state.user)
          }}
          user={this.state.user}
        />
        
        {this.securePieline()}

         

      </div>
    );
  }
}

export default App;
