import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="page-footer white">
          <div className="row">
            <div className="col l5 m6 s12">
              <h5 className="black-text page-footer__about">About</h5>
              <p className="black-text page-footer__text">
                Founded in 2018 in Australia, Educhamp derived under the mindset
                of eliminating over-accessorized Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Porro aliquid, aspernatur sapiente
                iure repudsit! primarily on letting the quality of the product
                speak for itself. Read more
              </p>
            </div>
            <div className="col l7 m6 s12">
              <div className="row">
                <div className="col l3 m3 s3">
                  <h5 className="black-text page-footer__about">Address</h5>
                  <ul>
                    <li>
                      <p className="black-text page-footer__text left-align">
                        Singel 459
                      </p>
                    </li>
                    <li>
                      <p className="black-text page-footer__text left-align">
                        Australia
                      </p>
                    </li>
                    <li>
                      <p className="black-text page-footer__text left-align">
                        1058
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="col l3 m3 s3">
                  <h5 className="black-text page-footer__about">Contact</h5>
                  <ul>
                    <li>
                      <p className="black-text page-footer__text left-align">
                        Email us
                      </p>
                    </li>
                    <li>
                      <p className="black-text page-footer__text left-align">
                        +31 (0) 202 615 614
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="col l3 m3 s3">
                  <h5 className="black-text page-footer__about">Info</h5>
                  <ul>
                    <li>
                      <p className="black-text page-footer__text left-align">
                        Shopping Info
                      </p>
                    </li>
                    <li>
                      <p className="black-text page-footer__text left-align">
                        Contact
                      </p>
                    </li>
                    <li>
                      <p className="black-text page-footer__text left-align">
                        Carrers
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="col l3 m3 s3">
                  <h5 className="black-text page-footer__about">Follow</h5>
                  <ul>
                    <li>
                      <p className="black-text page-footer__text left-align">
                        Instagram
                      </p>
                    </li>
                    <li>
                      <p className="black-text page-footer__text left-align">
                        Facebook
                      </p>
                    </li>
                    <li>
                      <p className="black-text page-footer__text left-align">
                        Tumblr
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
