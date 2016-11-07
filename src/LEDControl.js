import React, { Component } from 'react';

export default class LEDControl extends Component {
  render() {
    var rows = [];

    return (
      <div className="container countdown">
        <div className="row">
        {
          (() => {
            for (var i=0; i < this.props.value.length; i++) {
              var diode = this.props.value[i];

              rows.push(
                <div className="countdown-item col-sm-1 col-xs-1" key={i}>
                  <div className="countdown-number" id="diode-{i}">
                    <i className={'fa fa-lightbulb-o diode ' + (diode ? 'on' : 'off')} aria-hidden="true"></i>
                  </div>
                  <div className="countdown-label">{ diode ? 'on' : 'off'}</div>
                </div>
              );
            }
          })()
        }
        {rows}
        </div>
      </div>
    );
  }
}