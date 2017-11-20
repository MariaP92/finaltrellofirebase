import React from 'react'
import { addStage } from './actions';
import Stage from './Stage';
import './Board.css';
import Logo from "./img/logo.png"
import { HashRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { connect } from "redux-zero/react";
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import { signOut } from './actions';


const Header = () => {
    return (

        <div className="cabecera">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <div className="mensaje">
                            <img className="logoCabecera" src={Logo} />
                        </div>
                    </div>
                    <div className="col-md-2">

                        <button className="logOut" onClick={signOut}>SignOut</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Board = ({  stages, tasks, successLogin}) => {
    const list = stages.map(stage => {
        return <Stage key={stage} title={stage}
            tasks={tasks.filter(e => e.stage === stage)}
        />
    });
    return (
        <div>
            {
                !successLogin && <Redirect to="/login" />
            }
            <Header />
            <div className="Board-container">
                <Grid>

                    <Row>
                        <Col md={12}>
                            <div className="Board-column">
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    addStage(this.stageInputRef.value);
                                }}>
                                    <input type="text" ref={e => this.stageInputRef = e} />
                                    <button type="submit" className="form__input" id="btnAddList" > save list</button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="Board-column">
                                {list}
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>

        </div>
    );
}

export default Board;