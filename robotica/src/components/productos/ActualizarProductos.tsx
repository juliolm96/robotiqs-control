import * as React from 'react';
import ProductosActions from './flux/ProductosActions';
import ProductosStore from './flux/ProductosStore';
import FormInput from '../general/FormInput';
import ListElement from './childs/actualizar/ListElement';

import '../../App.css';

interface MyState {

  imagen: string;
  concepto: string;
  precio: number;
  existencias: number;
  productoSelected: boolean;
  productList: JSX.Element[];
  itemsLoaded: boolean;
}

class ActualizarProductos extends React.Component<{}, MyState> {

  private img: any;
  private existencias: any;
  private concepto: any;
  private precio: any;

  constructor(props: any) {
    super(props);

    this.state = {
      concepto: '',
      existencias: 0,
      imagen: '',
      precio: 0,
      productoSelected: false,
      productList: [],
      itemsLoaded: false
    };

    this.loadProductList = this.loadProductList.bind(this);
    this.renderProducto = this.renderProducto.bind(this);
    this.volver = this.volver.bind(this);
  }

  componentWillMount() {
    ProductosStore.wakeUp();
    ProductosStore.addChangeListener('STORE_LOAD_PRODUCTOS', this.loadProductList);
    ProductosStore.addChangeListener('STORE_LOAD_PRODUCTO_BY_ID', this.renderProducto);
    ProductosActions.loadProductos();
  }

  loadProductList() {

    let productList: any[] = [];

    ProductosStore.getProductList().forEach(
      (producto, index) => {
        productList.push(
          <ListElement
            id={producto.articuloId}
            key={index}
            concepto={producto.concepto}
            clave={producto.codigo}
            handleClick={this.listElementClick}
          />
        );
      }
    );

    this.setState({
      productList: productList,
      itemsLoaded: true
    });

    this.forceUpdate();

  }

  listElementClick(id: number) {
    ProductosActions.loadProductoById(id);
  }

  renderProducto() {
    this.setState({
      imagen: ProductosStore.getProductoSeleccionado().imagen,
      concepto: ProductosStore.getProductoSeleccionado().concepto,
      precio: ProductosStore.getProductoSeleccionado().precio,
      existencias: ProductosStore.getProductoSeleccionado().existencias
    });

    this.setState({
      productoSelected: true
    });

    this.forceUpdate();
  }

  fileOnchange(element: any) {
    if (element.target.files && element.target.files[0]) {
      var FileR = new FileReader();
      let self = this;
      FileR.addEventListener('load', function(e: any) {
        self.img.src = e.target.result;
      });
      FileR.readAsDataURL( element.target.files[0] );
    }
  }

  volver() {
    this.setState({
      productoSelected: false
    });
  }

  onSubmit(event: any) {

    ProductosActions.setImagen(this.img.src);
    ProductosActions.setPrecio(this.precio.getValue());
    ProductosActions.setConcepto(this.concepto.getValue());
    ProductosActions.setExistencias(this.existencias.getValue());

    ProductosActions.update();

    event.preventDefault();
    event.stopPropagation();

  }

  componentWillUnmount() {
    ProductosStore.removeChangeListener('STORE_LOAD_PRODUCTOS', this.loadProductList);
    ProductosStore.removeChangeListener('STORE_LOAD_PRODUCTO_BY_ID', this.renderProducto);
  }

  render() {
    return(
      <section className="nicdark_section">
        <div className="nicdark_container nicdark_clearfix">
          { this.state.itemsLoaded ?
            <div/>
            :
            <div
              style={
                {
                  display: 'flex',
                  justifyContent: 'center'
                }
              }
            >
              <br/>
              <h3
                className="subtitle greydark"
                style={{paddingTop: '40px'}}
              >
                Loading . . .
              </h3>
            </div>
          }
          {this.state.productoSelected ?
            <div>
              <a
                onClick={this.volver}
                className="nicdark_btn nicdark_bg_red small nicdark_shadow nicdark_radius white"
              >
                <i className="icon-reply-outline">&nbsp;Seleccionar producto</i>
              </a>
              <br/> <br/>
              {/*INCIO DE ENCABEZADO*/}
              <table className="nicdark_container nicdark_clearfix">
                <tbody>
                  <tr>
                    <td>
                      <a
                        href="#"
                        className={
                          'nicdark_displaynone_iphoneland nicdark_displaynone_iphonepotr ' +
                          'nicdark_btn_icon nicdark_bg_bluedark ' +
                          'extrabig nicdark_radius_left white nicdark_relative'
                        }
                      >
                        <i className="icon-doc-text-1"/>
                      </a>
                    </td>
                    <td>
                      <div className="grid grid_12">
                        <div className="nicdark_space40"/>
                        <h3 className="subtitle greydark">ACTUALIZACIÓN DE PRODUCTOS</h3>
                        <div className="nicdark_space20"/>
                        <div className="nicdark_divider left small">
                          <span className="nicdark_bg_bluedark nicdark_radius"/>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/*FIN DE ENCABEZADO*/}
              <form onSubmit={(submit) => this.onSubmit(submit)}>
                <div className="nicdark_textevidence">
                  <div
                    className={
                      'nicdark_margin1820 nicdark_marginleft100 nicdark_width_percentage100 ' +
                      'nicdark_marginleft20_iphoneland nicdark_marginleft20_iphonepotr'
                    }
                  >
                    <div
                      className="nicdark_focus nicdark_width_percentage70"
                      style={{display: 'table'}}
                    >
                      <h3 className="subtitle greydark">Imágen:</h3>
                      <div className="nicdark_space20"/>
                      <div
                        className="nicdark_focus nicdark_width_percentage40"
                        style={{display: 'table-cell', verticalAlign: 'middle'}}
                      >
                        <label htmlFor="fileInput">Subir imágen</label><br/><br/>
                        <div className="upload-btn-wrapper">
                          <button className="btn-bluedark">
                            <i className="icon-upload">Seleccionar</i>
                          </button>
                          <input
                            id="fileInput"
                            type="file"
                            name="fileInput"
                            className="cursor-pointer"
                            onChange={(file) => this.fileOnchange(file)}
                          />
                        </div>
                      </div>
                      <div
                        className="nicdark_focus nicdark_width_percentage50"
                        style={{display: 'table-cell', verticalAlign: 'middle'}}
                      >
                        <img
                          className="modelo-img-preview nicdark_width_percentage80"
                          src={'data:image/jpg;base64,' + this.state.imagen}
                          height="auto"
                          ref={(img) => this.img = img}
                        />
                      </div>
                    </div>
                    <div  className="nicdark_focus nicdark_width_percentage70">
                      <hr className="stylished nicdark_bg_bluedark"/>
                    </div>
                    <FormInput
                      inputType="text"
                      isRequired={true}
                      textoLabel="Concepto: "
                      length={100}
                      value={this.state.concepto}
                      ref={(concepto) => this.concepto = concepto}
                    />
                    <FormInput
                      inputType="number"
                      isRequired={true}
                      textoLabel="Precio: "
                      value={'' + this.state.precio}
                      ref={(precio) => this.precio = precio}
                    />
                    <FormInput
                      inputType="number"
                      isRequired={true}
                      textoLabel="Existencias: "
                      value={'' + this.state.existencias}
                      ref={(existencias) => this.existencias = existencias}
                    />
                    <div className="nicdark_focus nicdark_width_percentage40">
                      <div className="nicdark_space20"/>
                      <div className="nicdark_focus nicdark_width_percentage40">
                        <input
                          type="Submit"
                          defaultValue="ACTUALIZAR&nbsp;&#x2714;"
                          className={
                            'nicdark_btn fullwidth nicdark_bg_bluedark medium ' +
                            'nicdark_shadow nicdark_radius white nicdark_press'
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            :
            <div>
              <div className="nicdark_space20"/>
              <div
                style={
                  {
                    textAlign: 'center'
                  }
                }
              >
              <h2 className="subtitle greydark">ACTUALIZACIÓN DE PRODUCTOS</h2>
              </div>
              <div className="nicdark_space40"/>
              <ul className="undecored-list">
                {this.state.productList}
              </ul>
            </div>
          }
        </div>
      </section>
    );
  }

}

export default ActualizarProductos;
