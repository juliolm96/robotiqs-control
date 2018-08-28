import * as React from 'react';

class Banner extends React.Component {

  render() {
    return(
      <section className="nicdark_section">
        <div className="tp-banner-container">
          <div className="nicdark_slide1" >
            <ul>
              {/*<!--start second-->*/}
              <li
                data-transition="fade"
                data-slotamount="7"
                data-masterspeed="1000"
                data-saveperformance="on"
                data-title="LOGO"
              >
                <img
                  src="/resources/img/robotiqs/logo.png"
                  alt=""
                  data-lazyload="/resources/img/robotiqs/logo.png"
                  data-bgposition="center"
                  data-bgfit="contain"
                  data-bgrepeat="no-repeat"
                />
              </li>
              {/*<!--end second-->*/}

              {/*<!--start first-->*/}
              <li
                data-transition="fade"
                data-slotamount="7"
                data-masterspeed="1000"
                data-saveperformance="on"
                data-title="IMAGEN GRIS"
              >
                <img
                  src="/resources/img/slide/img1.jpg"
                  alt=""
                  data-lazyload="/resources/img/slide/img1.jpg"
                  data-bgposition="center"
                  data-bgfit="cover"
                  data-bgrepeat="no-repeat"
                />
              </li>
              {/*<!--end first-->*/}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default Banner;
