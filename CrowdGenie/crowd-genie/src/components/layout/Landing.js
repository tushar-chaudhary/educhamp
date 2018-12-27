import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

export default class Landing extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    let options = {
      indicators: false
    };
    M.Slider.init(this.Slider, options);
    let instance = M.Slider.getInstance(this.Slider);
    instance.start();
  }

  render() {
    return (
      <div>
        <Navbar class="main-header" />
        <section className="content">
          <div className="row">
            <div className="col l6 s12 m12">
              <h5 className="content__heading">Education Quotes</h5>
              <h4 className="content__quotes">
                <sup>
                  <i className="fa fa-quote-left" />
                </sup>Nothing in this world can take the place of persistence.
                Talent will not: nothing is more common than unsuccessful men
                with talent. Genius will not; unrewarded genius is almost a
                proverb. Education will not: the world is full of educated
                derelicts. Persistence and determination alone are omnipotent.<sup
                >
                  <i className="fa fa-quote-right" />
                </sup>
              </h4>
            </div>
            <div className="col l6 s12 m12 content__image">
              <img src="./images/learn.jpg" className="responsive-img" />
            </div>
          </div>
        </section>

        <section className="moreinfo">
          <div className="row">
            <div className="col s8 l8 m8">
              <h2 className="moreinfo__heading">
                LIVE INTERACTION CLASSNameES
              </h2>
              <h3 className="moreinfo__heading1">
                <span className="moreinfo__subheading">with the </span>BEST
                TEACHERS
              </h3>
            </div>
            <div className="col s4 l4 m4 right-align">
              <h5 className="moreinfo__explore">
                Explore our test series &rarr;
              </h5>
            </div>
          </div>
        </section>

        <section className="section-boxes center">
          <div className="row">
            <div className="col s12 m6 l3 blue white-text box box-marging">
              <i className="material-icons medium">show_chart</i>
              <h4 className="box__heading">Grow Your Knowledge</h4>
              <p className="box__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate rem quis neque, corrupti excepturi at magnam
                accusantium tempore quia modi.
              </p>
            </div>
            <div className="col s12 m6 l3 purple white-text box box-marging">
              <i className="material-icons medium">people</i>
              <h4 className="box__heading">Proffesional Teachers</h4>
              <p className="box__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate rem quis neque, corrupti excepturi at magnam
                accusantium tempore quia modi.
              </p>
            </div>
            <div className="col s12 m6 l3 teal white-text box box-marging">
              <i className="material-icons medium">verified_user</i>
              <h4 className="box__heading">Secure Your Future</h4>
              <p className="box__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate rem quis neque, corrupti excepturi at magnam
                accusantium tempore quia modi.
              </p>
            </div>
            <div className="col s12 m6 l3 red darken-3 white-text box">
              <i className="material-icons medium">account_balance</i>
              <h4 className="box__heading">Affordable Prices</h4>
              <p className="box__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate rem quis neque, corrupti excepturi at magnam
                accusantium tempore quia modi.
              </p>
            </div>
          </div>
        </section>

        <section className="student-speaks">
          <div
            ref={Slider => {
              this.Slider = Slider;
            }}
            className="slider"
          >
            <ul className="slides student-speaks__slidesbackground transparent">
              <li>
                <div className="caption left-align">
                  <h5 className="student-speaks__heading">
                    OUR STUDENT LOVES US
                  </h5>
                  <h4 className="student-speaks__quotes">
                    <sup>
                      <i className="fa fa-quote-left" />
                    </sup>Nothing in this world can take the place of
                    persistence. Talent will not: nothing is more common than
                    unsuccessful men with talent. Genius will not; unrewarded
                    genius is almost a proverb. Education will not: the world is
                    full of educated derelicts. Persistence and determination
                    alone are omnipotent.<sup>
                      <i className="fa fa-quote-right" />
                    </sup>
                  </h4>
                </div>
              </li>
              <li>
                <div className="caption left-align">
                  <h5 className="student-speaks__heading">
                    OUR STUDENT LOVES US
                  </h5>
                  <h4 className="student-speaks__quotes">
                    <sup>
                      <i className="fa fa-quote-left" />
                    </sup>Nothing in this world can take the place of
                    persistence. Talent will not: nothing is more common than
                    unsuccessful men with talent. Genius will not; unrewarded
                    genius is almost a proverb. Education will not: the world is
                    full of educated derelicts. Persistence and determination
                    alone are omnipotent.<sup>
                      <i className="fa fa-quote-right" />
                    </sup>
                  </h4>
                </div>
              </li>
              <li>
                <div className="caption left-align">
                  <h5 className="student-speaks__heading">
                    OUR STUDENT LOVES US
                  </h5>
                  <h4 className="student-speaks__quotes">
                    <sup>
                      <i className="fa fa-quote-left" />
                    </sup>Nothing in this world can take the place of
                    persistence. Talent will not: nothing is more common than
                    unsuccessful men with talent. Genius will not; unrewarded
                    genius is almost a proverb. Education will not: the world is
                    full of educated derelicts. Persistence and determination
                    alone are omnipotent.<sup>
                      <i className="fa fa-quote-right" />
                    </sup>
                  </h4>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="signup">
          <div className="row">
            <div className="col l7 m8 s12">
              <h2 className="signup__heading">SIGN UP FOR FREE</h2>
              <h5 className="signup__text">
                Learn with the best teachers in India,
              </h5>
              <h5 className="signup__text">
                ask doubts and get instant feedback on your progress.
              </h5>
            </div>
            <div className="col l5 m4 s12 left-align">
              <button
                type="button"
                className="btn btn-large transparent black-text signup__btn waves-effect waves-light"
              >
                <Link to="/register" className="black-text">
                  SIGN UP NOW &rarr;
                </Link>
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
