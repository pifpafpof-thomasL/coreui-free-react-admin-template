import React from 'react'
import Goto from './Goto'

class GotoFetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all?fields=capital;timezones")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      // return (
      //   <ul>
      //     {items
      //       .filter(item => item.capital)
      //       .map (item=> (
      //       <li key={item.id}>
      //         {item.capital} {item.timezones}
      //       </li>
      //     ))}
      //   </ul>
      // );
      return <Goto options={items} />
    }
  }
}
export default GotoFetch