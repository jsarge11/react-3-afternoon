import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(){
    super()

    this.state = {
      userInput: ''
    }

    
  }

  updateUserInput(e) {
    console.log(e);

    this.setState({ 
      userInput: e
    })
  }
  search() {
    const {userInput} = this.state;
    const {searchFn} = this.props;

    this.setState({ 
      userInput: ''
    })

    searchFn(userInput);
  }


  render() {
    

    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={(e)=>this.updateUserInput(e.target.value)} value={this.state.userInput}/>

          <SearchIcon onClick={()=>this.search()} id="Search__icon" />
        </div>
        
      </section>
    )
  }
}