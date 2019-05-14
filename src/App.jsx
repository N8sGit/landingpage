/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { hot } from 'react-hot-loader/root';
import HelloWorld from './components/hello-world';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOfAge: false,
      startDate: new Date(),
      showWarning: false,
    };
  }

  componentDidMount() {
    this.getCookie('remember');
  }

  handleChange = date => {
    this.setState({
      startDate: date,
    });
  };

  getCookie = cname => {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        this.setState({ isOfAge: true });
      }
    }
    return '';
  };

  setCookie = (name, value, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
  };

  onSubmitDOB = dob => {
    const now = new Date();
    const passingYear = now.getFullYear() - 21;
    const currentDay = now.getDay();
    const yob = dob.getFullYear();
    const day = dob.getDay();
    const remember = document.getElementById('remember').checked;

    if (yob <= passingYear || (yob === passingYear && day <= currentDay)) {
      if (remember) {
        // set cookie for 5 minutes
        this.setCookie('remember', true, 300000);
      }
      this.setState({ isOfAge: true, showWarning: false });
    } else {
      this.setState({ showWarning: true });
    }
  };

  render() {
    const { startDate, isOfAge, showWarning } = this.state;
    return !isOfAge ? (
      <div>
        <HelloWorld title="Bob's Brewery" />
        <div style={{ textAlign: 'center', flex: 1, flexDirection: 'row' }}>
          <DatePicker
            id="picker"
            selected={startDate}
            onChange={this.handleChange}
            placeholderText="Enter DOB"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
          <button
            id="submit-btn"
            onClick={() => {
              this.onSubmitDOB(startDate);
            }}
            type="submit"
            style={{
              marginLeft: 10,
              marginTop: '5rem',
              backgroundColor: '#FFFDD0',
              border: 'none',
              color: 'black',
              padding: '15px 32px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'inline-block',
              fontSize: '16px',
            }}
          >
            {' '}
            Submit{' '}
          </button>
          <div
            id="remember-me"
            style={{ marginTop: '6rem', marginLeft: '25rem' }}
          >
            <p>Remember me</p>
            <input
              style={{ marginLeft: 15, padding: '10px' }}
              id="remember"
              type="checkbox"
            />
          </div>
          {showWarning ? (
            <p style={{ color: 'red' }}>Sorry, you must be 21 or older.</p>
          ) : null}
        </div>
      </div>
    ) : (
      <div>
        <p style={{ textAlign: 'center', fontSize: 30, margin: 150 }}>
          {' '}
          Welcome!!!
        </p>
      </div>
    );
  }
}

export default hot(App);
