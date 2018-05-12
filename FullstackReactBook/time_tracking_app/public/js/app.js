class TimersDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      timers: []
    };
    this.handleCreateFormSubmit = this.handleCreateFormSubmit.bind(this);
    this.handleEditFormsubmit = this.handleEditFormsubmit.bind(this);
    this.handleTrashClick = this.handleTrashClick.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.loadTimersFromServer = this.loadTimersFromServer.bind(this);
  }

  // Custom methods
  handleCreateFormSubmit(timer) {
    this.createTimer(timer);
  }

  handleEditFormsubmit(attrs) {
    this.updateTimer(attrs);
  }

  handleTrashClick(timerId) {
    this.deleteTimer(timerId);
  }

  handleStartClick(timerId) {
    this.startTimer(timerId);
  }

  handleStopClick(timerId) {
    this.stopTimer(timerId);
  }

  createTimer(timer) {
    const t = helpers.newTimer(timer);
    this.setState({ timers: this.state.timers.concat(t) });

    // Call API
    client.createTimer(t);
  }

  deleteTimer(timerId) {
    this.setState({ timers: this.state.timers.filter(t => t.id !== timerId) });

    // Call API
    client.deleteTimer({ id: timerId });
  }

  updateTimer(attrs) {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === attrs.id) {
          return Object.assign({}, timer, {
            title: attrs.title,
            project: attrs.project
          });
        } else {
          return timer;
        }
      })
    });

    // Call API
    client.updateTimer(attrs);
  }

  startTimer(timerId) {
    const now = Date.now();

    // Method 1
    // this.setState({
    //   timers: this.state.timers.map((timer) => {
    //     if (timer.id === timerId) {
    //       return Object.assign({}, timer, { runningSince: now });
    //     } else {
    //       return timer;
    //     }
    //   })
    // });

    // Call API
    // client.startTimer({ id: timerId, start: now });

    // Method 2
    // Call API
    client.startTimer({ id: timerId, start: now }).then(this.loadTimersFromServer);
  }

  stopTimer(timerId) {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          const lastElapsed = now - timer.runningSince;
          return Object.assign({}, timer, { elapsed: timer.elapsed + lastElapsed, runningSince: null });
        } else {
          return timer;
        }
      })
    });

    // Capp API
    client.stopTimer({ id: timerId, stop: now });
  }

  loadTimersFromServer() {
    client.getTimers((serverTimers) => {
      this.setState({timers: serverTimers});
    })
  }

  // Lifecycle methods
  componentDidMount() {
    this.loadTimersFromServer();
    setInterval(this.loadTimersFromServer, 5000);
  }

  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList
            timers={this.state.timers}
            onFormSubmit={this.handleEditFormsubmit}
            onTrashClick={this.handleTrashClick} 
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
          />
          <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
        </div>
      </div>
    );
  }
}

class EditableTimerList extends React.Component {
  render() {
    const timers = this.props.timers.map((timer) => {
      return (
        <EditableTimer
          key={timer.id}
          id={timer.id}
          title={timer.title}
          project={timer.project}
          elapsed={timer.elapsed}
          runningSince={timer.runningSince}
          onFormSubmit={this.props.onFormSubmit}
          onTrashClick={this.props.onTrashClick}
          onStartClick={this.props.onStartClick}
          onStopClick={this.props.onStopClick}
        />
      );
    })
    return (
      <div id='timers'>
        {timers}
      </div>
    );
  }
}

class EditableTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editFormOpen: false
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Custom methods
  handleEditClick() {
    this.openForm();
  }

  handleFormClose() {
    this.closeForm();
  }

  handleSubmit(timer) {
    this.props.onFormSubmit(timer);
    this.closeForm();
  }

  closeForm() {
    this.setState({ editFormOpen: false });
  }

  openForm() {
    this.setState({ editFormOpen: true });
  }

  // Lifecycle methods
  render() {
    if (this.state.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <Timer
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
          onEditClick={this.handleEditClick}
          onTrashClick={this.props.onTrashClick}
          onStartClick={this.props.onStartClick}
          onStopClick={this.props.onStopClick}
        />
      );
    }
  }
}

class TimerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title || '',
      project: this.props.project || ''
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  // Custom methods
  handleTitleChange(e) {
    this.setState({title: e.target.value})
  };

  handleProjectChange(e) {
    this.setState({project: e.target.value})
  };

  handleSubmit(e) {
    this.props.onFormSubmit({
      id: this.props.id,
      title: this.state.title,
      project: this.state.project
    });
  };

  // Lifecycle methods
  render() {
    const submitText = this.props.id ? 'Update' : 'Create';
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Title</label>
              <input type='text' value={this.state.title} onChange={this.handleTitleChange} />
            </div>
            <div className='field'>
              <label>Project</label>
              <input type='text' value={this.state.project} onChange={this.handleProjectChange} />
            </div>
            <div className='ui two bottom attached buttons'>
              <button onClick={this.handleSubmit} className='ui basic blue button'>
                {submitText}
              </button>
              <button onClick={this.props.onFormClose} className='ui basic red button'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.handleTrashClick = this.handleTrashClick.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
  }

  // Custom methods
  handleTrashClick() {
    this.props.onTrashClick(this.props.id);
  }

  handleStartClick() {
    this.props.onStartClick(this.props.id);
  }

  handleStopClick() {
    this.props.onStopClick(this.props.id);
  }

  //Lifecycle methods
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  render() {
    const elapsedString = helpers.renderElapsedString(this.props.elapsed, this.props.runningSince);
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='meta'>
            {this.props.project}
          </div>
          <div className='center aligned description'>
            <h2>{elapsedString}</h2>
          </div>
          <div className='extra content'>
            <span onClick={this.props.onEditClick} className='right floated edit icon'>
              <i className='edit icon'></i>
            </span>
            <span onClick={this.handleTrashClick} className='right floated trash icon'>
              <i className='trash icon'></i>
            </span>
          </div>
        </div>
        <TimerActionButton
          timerIsRunning={!!this.props.runningSince}
          onStartClick={this.handleStartClick}
          onStopClick={this.handleStopClick}
        />
      </div>
    );
  }
}

class ToggleableTimerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }

  // Custom methods
  handleFormOpen() {
    this.setState({ isOpen: true });
  }

  handleFormClose() {
    this.setState({ isOpen: false });
  }

  handleFormSubmit(timer) {
    this.props.onFormSubmit(timer);
    this.setState({ isOpen: false });
  }

  // Lifecycle methods
  render() {
    if (this.state.isOpen) {
      return (
        <TimerForm onFormSubmit={this.handleFormSubmit} onFormClose={this.handleFormClose} />
      );
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button className='ui basic buttob icon' onClick={this.handleFormOpen}>
            <i className='plus icon'></i>
          </button>
        </div>
      );
    }
  }
}

class TimerActionButton extends React.Component {
  render() {
    if(this.props.timerIsRunning) {
      return (
        <div onClick={this.props.onStopClick} className='ui bottom attached red basic button'>Stop</div>
      );
    } else {
      return (
        <div onClick={this.props.onStartClick} className='ui bottom attached blue basic button'>Start</div>
      );
    }
  }
}

ReactDOM.render(
  <TimersDashboard />,
  document.getElementById('content')
);