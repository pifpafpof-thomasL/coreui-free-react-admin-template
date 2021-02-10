import React from 'react'
import { Button, Form } from 'react-bootstrap';
import {
  CCard, CCardBody, CCardFooter
} from  '@coreui/react'
import FetchTemp from './FetchTemp'

import ComponentA from './ComponentA'
import ComponentB from './ComponentB'
import SumTemp from './SumTemp'


class Goto extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        items: [],
        text: '',
        ligne2:'',
        // opt ions: props.options
       };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }
  
      
    handleChange(e) {
      this.setState({ text: e.target.value });
      //console.log("handleChange value, this.state", e.target.value, this.state)
    }
  
    handleSubmit(e) {
      e.preventDefault();  // pour ne pas recharger la page
      if (this.state.text.length === 0) {
        return;
      }
      const newItem = {
        text: this.state.text,
        id: Date.now()   // fpr later use, <li> key to be unique
      };
      this.setState({
        items: this.state.items.concat(newItem),
        text: ''
      });

      //console.log("handleSubmit this.state", this.state)
    }

    handleClickDelMe = (id, e) => {
      console.log("handleClickDelMe", id)
      const array = this.state.items
      const index = array.findIndex(arrayItem=> arrayItem.id === id);
      if (index > -1) {
        array.splice(index, 1);
      }      
      this.setState({
        items: array
      });
    }

    render() {
      //console.log("<TodoApp> this.state", this.state)
      const { items, text }  = this.state
      return (
        <div>
          <h3>
            Vous avez choisi de visiter
          </h3>
          <CCard>
            <CCardBody>
              {items.length ? "Voici votre selection" : ""}

              <TodoList toto={items} handleClickDelMe={this.handleClickDelMe} />

            </CCardBody>
            <CCardFooter>
              <Button className="ml-2 " onClick={this.handleClickDeleteAll}>
                Vider la liste
              </Button>
            </CCardFooter>
          </CCard>
        <br/>

        <CCard>
            <CCardBody>
              <Form className="mb-20" onSubmit={this.handleSubmit} >
              <label htmlFor="new-todo">
                Ou voulez vous aller ?
              </label>
              <br/>

              <input 
                style={{marginLeft: '10px'}}
                id="new-todo"
                onChange={this.handleChange}
                value={this.state.text}
              />
              <br/>
              <select className="my-3 ml-2 mx-2" value={this.state.text} onChange={this.handleChange} >
                <option defaultValue value="DemoCapital">Ouagadougou</option> 
                {this.props.options.map((option,i)=>
                    <option key={option.capital+i} value={option.capital} >{option.capital}</option>
                  )}
              </select>

              <FetchTemp city={text} />

              <Button className="ml-2"  onClick={this.handleSubmit}>
                Ajouter un item #{this.state.items.length + 1}
              </Button>
              <br/>

            </Form>


            </CCardBody>
            <CCardFooter>
              <SumTemp/>
            </CCardFooter>
          </CCard>
          
          <br/>
          <CCard>
            <CCardBody>
                <ComponentA/>
                <ComponentB/>
            </CCardBody>
          </CCard>
        </div>
      );
    }



    handleClickDeleteAll = () => {
      this.setState({ items: []})
    }

  }
  
  
  class TodoList extends React.Component {

    // interdit de mettre à jour les props (ils sont en lecture seuls)
    render() {
      return (
        <div>
          <ul>
            {this.props.toto
                .map(item => (
                <li key={item.id}>{item.text}
                  <FetchTemp city={item.text} save />
                  <Button className="mx-5 mt-2" onClick={()=>this.props.handleClickDelMe(item.id)}>
                    Del me
                  </Button>
                </li>          
              ))}
          </ul>
        </div>

      );
    }
  }
  

  export default Goto