import * as React from 'react';

interface MyProps {
  placeholder: string;
  searchHandler(value: any): void;
}

interface MyState {

}

class InputBusqueda extends React.Component<MyProps, MyState> {

  private input: any;

  constructor(props: MyProps) {
    super(props);
  }

  render() {
    return(
      <div>
        <div className="nicdark_focus nicdark_width_percentage70">
          <input
              className={
                'nicdark_bg_grey2 nicdark_width_percentage40 ' +
                'nicdark_radius nicdark_shadow grey medium subtitle'
              }
              placeholder={this.props.placeholder}
              style={{
                height: '30px'
              }}
              ref={(ref) => this.input = ref}
          />
          &ensp;
          <a
            onClick={(ref) => this.props.searchHandler(this.input)}
            className={
              'nicdark_btn nicdark_bg_violet medium icon-search ' +
              'nicdark_shadow nicdark_radius white nicdark_width_percentage10'
            }
          />
        </div>
        <div style={{ height: '25px'}} className="nicdark_width_percentage70 nicdark_focus"/>
      </div>
    );
  }

}

export default InputBusqueda;
