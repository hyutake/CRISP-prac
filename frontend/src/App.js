import React, { Fragment } from 'react';
import TaskList from './components/Tasks/TaskList';
import MainHeader from './components/Layout/MainHeader';

function App() {
  return(
    <Fragment>
      <MainHeader />
      <TaskList />
    </Fragment>
  )
}

export default App;