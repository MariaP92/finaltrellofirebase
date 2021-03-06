import React from 'react';
import Board from './Board';
import { Component } from 'react';
import LogIn from './LogIn';
import MainBoard from './MainBoard'
import SignUp from './SignUp';
import { connect } from "redux-zero/react";
import { Grid, Row, Col } from 'react-bootstrap';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  NavLink
} from 'react-router-dom'

const App = ({user, boards, stages, tasks,successLogin }) => {
  return (
        <BrowserRouter>
          <div>
    
            <Switch>
              <Route path="/login" render={() => <LogIn />} />
              <Route path="/signup" render={() => <SignUp />} />
              <Route path="/mainBoard" render={() => <MainBoard  boards={boards} successLogin ={successLogin }/>} />
              <Route path="/board" render={() =>  <Board user ={user} stages={stages}  tasks = {tasks} successLogin ={successLogin } />} />
              <Route component={LogIn} />
            </Switch>
          </div>
        </BrowserRouter>)

};
const mapToProps = ({user, boards, stages, tasks, successLogin })  => ({ user,boards, stages, tasks,successLogin }) 

export default connect(mapToProps)(App);
