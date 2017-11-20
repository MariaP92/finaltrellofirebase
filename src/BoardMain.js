
import React from 'react'
import Task from './Task'
import {addTask} from './actions'
import { HashRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';


class BoardMain  extends React.Component{
    render () {
       return  (
          <div>
             <h3> {this.props.title}</h3>
               
             <form>
                <NavLink to='/board'>
                    <button> Go to Board </button>
                </NavLink>
             </form>
 
          </div>
       )
    }
 }
 export default BoardMain;