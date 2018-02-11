import React, { Component } from 'react';
import Fire from './Fire'
import './App.css';
import './bootstrap.min.css'
import Landing from './Landing'



class App extends Component {
  constructor(){
    super()
    this.state = {
      items: []
    }
  }
  test(arg){
    console.log(arg)
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
          giftbags: items[item].giftbags,
          request: items[item].specialRequest,
        })
      }

      this.setState({items: newState})
      
    })
  }


  getItems(state){
    console.log(state)
  }
  render() {
    
   

    return (
      <div className="App">
        <Landing/>
        
        

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
              <th scope="col">giftbags</th>
              <th className='col-md-4'scope="col">Special requests</th>
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
                    <td>{item.giftbags}</td>
                    <td className='col-md-6'>{item.request}</td>
                  </tr>
                )
              })
            }
            
            
          </tbody>
        </table> 

      </div>
    );
  }
}

export default App;
