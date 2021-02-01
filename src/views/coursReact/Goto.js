import React from 'react'
import { Button, Form } from 'react-bootstrap';
import {
  CCard, CCardBody, CCardFooter
} from  '@coreui/react'

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
      console.log("handleChange value, this.state", e.target.value, this.state)
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

      console.log("handleSubmit this.state", this.state)
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
      console.log("<TodoApp> this.state", this.state)
      const { items, options }  = this.state
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
            <CCardFooter>Card footer</CCardFooter>
          </CCard>
        <br/>

          <Form className="mb-20" onSubmit={this.handleSubmit} >
            <label htmlFor="new-todo">
              Ou voulez vous aller ?
            </label>
            <input 
              style={{marginLeft: '40px'}}
              id="new-todo"
              onChange={this.handleChange}
              value={this.state.text}
            />

            <select value={this.state.text} onChange={this.handleChange} className="mx-5" >
              <option value="Choisissez" >Choisissez</option>
              <option selected value="Ouagadougou">Ouagadougou</option> 
              {this.props.options.map(option=>
                  <option value={option.capital} >{option.capital}</option>
                )}
            </select>

            <Button onClick={this.handleSubmit}>
              Ajouter un item #{this.state.items.length + 1}
            </Button>
            <br/>

            {/* <ul>
              {options
                .filter(item => item.capital)
                .map (item=> (
                <li key={item.id}>
                  {item.capital} {item.timezones}
                </li>
              ))}
            </ul> */}

          </Form>

          <Button onClick={this.handleClickDeleteAll}>
              Vider la liste
          </Button>
          <br/>

        </div>
      );
    }



    handleClickDeleteAll = () => {
      this.setState({ items: []})
    }

  }
  
  
  class TodoList extends React.Component {

    // interdit de mettre à jour les props (ils sont en lecture seuls)
    // handleClickDelMe = (id, e) => {
    //   console.log("handleClickDelMe", id)
    //   const array = this.props.itemsProps
    //   const index = array.findIndex(arrayItem=> arrayItem.id === id);
    //   if (index > -1) {
    //     array.splice(index, 1);
    //   }      
    //   // this.setState({   // does not exist
    //   //   items: array
    //   // });
    // }

    render() {
      return (
        <ul>
          {this.props.toto
              .map(item => (
              <li key={item.id}>{item.text}
                <Button className="mx-5 mt-2" onClick={()=>this.props.handleClickDelMe(item.id)}>
                  Del me
                </Button>
              </li>          
            ))}
        </ul>
      );
    }
  }
  

  export default Goto