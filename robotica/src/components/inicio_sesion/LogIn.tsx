import * as React from 'react';
import FormInput from '../general/FormInput';
import Actions from './flux/InicioSesionActions';

import '../../styles/Login.css';

class LogIn extends React.Component {

  private emailUsername: any;
  private password: any;
  private submitBtn: any;

  constructor(props: any) {
    super(props);
  }

  onSubmit(event: any) {

    this.submitBtn.disabled = true;

    let objetoSesion: any = {
      usernameOrEmail: null,
      password: '',
    };

    objetoSesion.usernameOrEmail = this.emailUsername.getValue();
    objetoSesion.password = this.password.value;

    Actions.iniciarSesion(objetoSesion);

    event.preventDefault();
    event.stopPropagation();

  }

  render() {
    return(
      <section className="nicdark_section">
        <div className="nicdark_container nicdark_clearfix">
          <form onSubmit={(submit) => this.onSubmit(submit)}>
            <div className="login-form nicdark_width_percentage50">
              <div className="nicdark_space20"/>
              <h3 className="subtitle greydark">INICIAR SESIÓN</h3>
              <div className="form-child">
                <FormInput
                  inputType="text"
                  isRequired={true}
                  textoLabel="Email / Username"
                  ref={(email) => this.emailUsername = email}
                />
              </div>
              <div className="form-child">
                <div className="nicdark_focus nicdark_width_percentage70">
                  <div className="nicdark_space10"/>
                  <h3 className="subtitle greydark">Password</h3>
                  <div className="nicdark_space10"/>
                  <input
                    type="password"
                    required={true}
                    className="nicdark_bg_grey2 nicdark_radius nicdark_shadow grey medium subtitle"
                    style={{
                      fontSize: '17px',
                      width: '90%',
                      padding: '10px 5%',
                      border: '0px'
                    }}
                    ref={(pass) => this.password = pass}
                  />
                  <br/>
                  <div style={{ height: '20px'}} className="nicdark_width_percentage70 nicdark_focus"/>
                </div>
              </div>
              <div className="nicdark_space10"/>
              <div className="form-child">
                <div className="nicdark_width_percentage70">
                  <input
                    type="Submit"
                    defaultValue="INGRESAR"
                    ref={(submitBtn) => this.submitBtn = submitBtn}
                    className={
                      'nicdark_btn fullwidth nicdark_bg_blue medium ' +
                      'nicdark_shadow nicdark_radius white nicdark_press'
                    }
                  />
                </div>
              </div>
              <br/><br/>
            </div>
          </form>
        </div>
      </section>
    );
  }

}

export default LogIn;
