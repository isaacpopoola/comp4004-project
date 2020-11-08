import React, { Component } from 'react'
import './LandingPage.scss'
import LandingNavBar from './Navbar/Navbar.component'

class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
    }
  }

  handleSignup = () => this.setState({ redirect: true })

  render() {
    return <LandingNavBar onClick={this.handleSignup} />
  }
}

export default LandingPage
