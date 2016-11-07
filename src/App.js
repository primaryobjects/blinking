import React, { Component } from 'react';
import LEDControl from './LEDControl';
import { LEDManager } from './managers/LEDManager';

class App extends Component {
  statusStyles = [];

  constructor(props) {
    super(props);

    // Set default status styles.
    this.statusStyles['none'] = 'panel-info';
    this.statusStyles['success'] = 'panel-success';
    this.statusStyles['error'] = 'panel-danger';
    this.statusStyles['warning'] = 'panel-warning';

    // Initialize state.
    this.state = {
      program: 'ld a,1 |\nout (0),a |\nld a,2 |\nout (0),a |\nld a,4 |\nout (0),a |\nld a,8 |\nout (0),a |\nld a,16 |\nout (0),a |\nld a,32 |\nout (0),a |\nld a,64 |\nout (0),a |\nld a,128 |\nout (0),a |\nld a,0 |\nout (0),a |\nld a,24 |\nout (0),a |\nld a,36 |\nout (0),a |\nld a,66 |\nout (0),a |\nld a,129 |\nout (0),a |\nld a,255 |\nout (0),a |\nld z,0 |\nout (0),z |',
      status: {
        style: this.statusStyles['none'],
        errors: [],
      },
      diodes: [0,0,0,0,0,0,0,0]
    };

    // Setup events.
    this.onRun = this.onRun.bind(this);
    this.onProgramChange = this.onProgramChange.bind(this);
  };

  onRun(e) {
    var compiler = LEDManager.compile(this.state.program);
    var style = compiler.result ? 'warning' : 'error';

    this.setState({ status: { style: this.statusStyles[style], errors: compiler.errors.length > 0 ? compiler.errors : [ 'Running' ] } });

    if (compiler.result) {
      // Change diode state for each output, with time delay.
      for (var i=0; i < compiler.diodes.length; i++) {
        setTimeout(function(obj) {
          obj.me.setState({ diodes: compiler.diodes[obj.i] });

          // After last output, change status to 'Done'.
          if (obj.i === compiler.diodes.length - 1) {
            setTimeout(function(obj) {
              obj.me.setState({ status: { style: obj.me.statusStyles['success'], errors : [ 'Done' ] } });
            }, 1000, obj);
          }
        }, i * 1000, { me: this, i: i });
      }
    }

    e.preventDefault();
  };

  onProgramChange(e) {
    this.setState({ program: e.target.value });
  };

  render() {
    return (
      <div>
        <form id='program-form'>
          <div className='form-group'>
            <label htmlFor='code'>Program</label>
            <textarea className='form-control' defaultValue={ this.state.program } onChange={ this.onProgramChange } />
          </div>
          <div className='form-group'>
            <button id='btn-run' type='submit' className='btn btn-primary' onClick={ this.onRun }>Run</button>
          </div>
        </form>
        <div className={'panel ' + this.state.status.style}>
          <div className='panel-heading'>Compile Status</div>
          <div className='panel-body'>
            { 
              this.state.status.errors.map(function(error, i) {
                return <p key={i}>{error}</p>
              })
            }
          </div>
        </div>

        <LEDControl value={this.state.diodes}></LEDControl>
      </div>
    );
  }
}

export default App;
