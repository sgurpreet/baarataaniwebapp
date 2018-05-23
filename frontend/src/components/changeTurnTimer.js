import React from 'react';


class ChangeTurnTimer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        secondsRemaining: this.props.autoChangeInSeconds
      };

    this.tick = this.tick.bind(this);

  }

  resetTimer()
  {
    this.setState({secondsRemaining: this.props.autoChangeInSeconds});
  }

  tick(){
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      this.props.changeTurnAction();
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <span>{this.state.secondsRemaining}</span>
    );
  }

}


export {ChangeTurnTimer};
