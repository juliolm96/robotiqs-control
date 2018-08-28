import * as React from 'react';
import FormInput from '../general/FormInput';
import Actions from './flux/InicioSesionActions';

import '../../styles/Login.css';

class SignIn extends React.Component {

  private email: any;
  private username: any;
  private password: any;
  private confirmPassword: any;
  private submitBtn: any;

  constructor(props: any) {
    super(props);
  }

  onSubmit(event: any) {

    this.submitBtn.disabled = true;

    let objetoSesion: any = {
      username: '',
      password: '',
      email: ''
    };

    if (this.password.value !== this.confirmPassword.value) {
      event.preventDefault();
      event.stopPropagation();
      alert ('LAS CONTRASEÑAS NO COINCIDEN\n\nIntentelo de nuevo');
      this.password.value = '';
      this.confirmPassword.value = '';
      this.submitBtn.disabled = false;
      return;
    }

    objetoSesion.username = this.username.getValue();
    objetoSesion.password = this.confirmPassword.value;
    objetoSesion.email = this.email.getValue();

    Actions.registrarUsuario(objetoSesion);
    this.submitBtn.disabled = false;
    event.preventDefault();
    event.stopPropagation();

  }

  render() {
    return(
      <section className="nicdark_section">
        <div className="nicdark_container nicdark_clearfix">
          <form onSubmit={(submit) => this.onSubmit(submit)}>
            <div
              className="signup-form nicdark_width_percentage50"
              style={{marginTop: '0px !important'}}
            >
              <div className="nicdark_space20"/>
              <h3 className="subtitle greydark">REGISTRARSE</h3>
              <div className="form-child">
                <FormInput
                  inputType="text"
                  isRequired={true}
                  textoLabel="Email"
                  ref={(email) => this.email = email}
                />
              </div>
              <div className="form-child">
                <FormInput
                  inputType="text"
                  isRequired={true}
                  textoLabel="Username"
                  ref={(user) => this.username = user}
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
                    pattern=".{6,40}"
                    title="La contraseña debe contener de 6 a 40 caractéres"
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
              <div className="form-child">
                <div className="nicdark_focus nicdark_width_percentage70">
                  <div className="nicdark_space10"/>
                  <h3 className="subtitle greydark">Confirmar Password</h3>
                  <div className="nicdark_space10"/>
                  <input
                    type="password"
                    required={true}
                    className="nicdark_bg_grey2 nicdark_radius nicdark_shadow grey medium subtitle"
                    pattern=".{6,40}"
                    title="La contraseña debe contener de 6 a 40 caractéres"
                    style={{
                      fontSize: '17px',
                      width: '90%',
                      padding: '10px 5%',
                      border: '0px'
                    }}
                    ref={(passConfirm) => this.confirmPassword = passConfirm}
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

export default SignIn;
