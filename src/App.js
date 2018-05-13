import React, { Component } from 'react';
import Fire from './Fire'
import firebase from 'firebase'
import './App.css';
import './bootstrap.min.css'
import Landing from './Landing'
import _ from 'lodash'
import dateformat from 'dateformat'

let provider = new firebase.auth.GoogleAuthProvider()
const auth = firebase.auth()

class App extends Component {
  constructor(){
    super()
    this.state = {
      items: [],
      orderByDate: [],
      email: 'clarionsalespa@gmail.com',
      user: null
    }
  }
  
  signInToGoogle(){
    auth.signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // let token = result.credential.accessToken;
      // console.log(token)
      // if (result){
      //   console.log('success!')
      // }
      // The signed-in user info.
      // let user = result.user;
      // console.log(agent)
      
      
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      // let errorCode = error.code;
      // console.log('code: ', errorCode)

      // let errorMessage = error.message;
      // console.error('message', errorMessage)
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
          id: new Date(item),
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
      let byDate = _.orderBy(newState, 'id', 'desc')
      this.setState({items: newState})
      this.setState({orderByDate: byDate})
      // console.log(typeof(byDate[0].id))
      // console.log(new Date(byDate[0].id))     
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

  securePipeline(email, user){
    if (email === user){
      return <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">created</th>
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
              this.state.orderByDate.map(item=> {
                return (
                  <tr key={item.id} style={{fontSize: 10, color: '#333', maxHeight: 20, height: '10px'}} >
                    <td>{dateformat(item.id, 'mmm dd yyyy')}</td>
                    <th scope="row">{item.name}</th>
                    <td onClick={(e)=>console.log(item.email)}>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.group}</td>
                    <td>{item.type}</td>
                    <td>{item.rooms}</td>
                    <td>{item.nights}</td>
                    <td>{item.arrival}</td>
                  </tr>
                )
              }) // map
            }
            
            
          </tbody>
        </table>
      </div>
    } else {
      return <div style={{marginTop: 50}}>
        Authentication Required
        <div className="progress" >
          <div 
            className="progress-bar progress-bar-striped progress-bar-animated" 
            role="progressbar" 
            aria-valuenow="75" 
            aria-valuemin="0" 
            aria-valuemax="100" 
            style={{width: '75%', margin: '0 auto'}}>
          </div>


        </div>
        </div>
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
        
        {this.securePipeline(this.state.email, this.state.user)}

         

      </div>
    );
  }
}

export default App;
