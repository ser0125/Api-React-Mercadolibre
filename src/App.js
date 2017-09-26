import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import NumberFormat from 'react-number-format';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemName :'',
      objectResponse :''
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchItem = this.searchItem.bind(this);
  }
  handleChange(event){
    this.setState({itemName: event.target.value});
  }

  searchItem(){
  
    var url = 'https://api.mercadolibre.com/sites/MCO/search?q=';
    var item= this.state.itemName;
    var self = this
    url= url+item;
    axios.get(url)
      .then(function(response){
        self.setState({objectResponse : response.data.results.map(function(item,index){
         return (
          <div className="media" key={index}>
          <div className="media-left media-middle">
          <img src={item.thumbnail} className="media-object" >
          </img>
          </div>
          <div className="media-body">
          <p className="product-name">{item.title}</p> 
          <p className="product-price"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p> 
          <p className="product-solds">{item.sold_quantity} vendidos</p>
          </div>
        </div>)
      })
    })
  })
      .catch(function(error){
        if (error.response) {
          // The request was made and the server responded with a status code 
          // that falls out of the range of 2xx 
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received 
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of 
          // http.ClientRequest in node.js 
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error 
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
    }

  render() {
  

    return (
      <div className="App">
        <div class Name="App-header">
          <h1>Search your product</h1>
          <input type="text" onChange={this.handleChange}/>
          <button className="btn btn-primary btn-md" onClick={this.searchItem} >Search</button>
          <ul>{this.state.objectResponse}</ul>
        </div>
      </div>
    );
  }
}

export default App;
