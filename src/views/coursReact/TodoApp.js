import React from 'react'
import { Button, Form } from 'react-bootstrap';
import {
  CCard, CCardBody, CCardFooter
} from  '@coreui/react'

class TodoApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        items: [
          { text: "Dormir", id: 1 },
          { text: "Courir", id: 2 }
        ], 
        text: '',
        ligne2:''
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
      //console.log("<TodoApp> this.state", this.state)
      //const items = this.state.items
      return (
        <div>
          <h3>À faire</h3>
          {"<TodoList>" }
          <CCard>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              <TodoList itemsProps={this.state.items} handleClickDelMe={this.handleClickDelMe} />

            </CCardBody>
            <CCardFooter>Card footer</CCardFooter>
          </CCard>

          {/* <ul>
            {this.state.items.map(item => (
                <li key={item.id}>{item.text}
                  <Button className="mx-5" onClick={()=>this.handleClickDelMe(item.id)}>
                    Del me
                  </Button>
                </li>          
              ))}
          </ul> */}
          {"<TodoList/>" }
        <br/>

          <Form className="mb-20" onSubmit={this.handleSubmit} >
            <label htmlFor="new-todo">
              Que faut-il faire ?
            </label>
            <input 
              style={{marginLeft: '40px'}}
              id="new-todo"
              onChange={this.handleChange}
              value={this.state.text}
            />
            <Button onClick={this.handleSubmit}>
              Ajouter un item #{this.state.items.length + 1}
            </Button>
            <br/>
          </Form>

          <Button onClick={this.handleClickDeleteAll}>
              Vider la liste
          </Button>
          <br/>
          <p className="mt-20"> - </p>
          <label >
              input state.ligne2 (not in todo list)
          </label>
          <input 
            style={{marginLeft: '40px'}}
            onChange={e => this.setState({ ligne2: e.target.value })}
          />
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
          {this.props.itemsProps.map(item => (
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
  

  export default TodoApp