import * as React from 'react';
import { Link } from 'react-router-dom';

class Menu extends React.Component {

  constructor(props: any) {
    super(props);
  }

    render() {
      return(
        <div className="Menu">
        <h1>Hola</h1>
        <Link to=""/>
        </div>
      );
    }
}

export default Menu;
