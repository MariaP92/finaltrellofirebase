import React from 'react'
import { addStage, addBoard } from './actions';
import Stage from './Stage';
import './Board.css';
import BoardMain from './BoardMain';
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

const MainBoard = ({ boards , successLogin}) => {


    const ListBoard = boards.map(board => {
        return (
            <div className="boardDIv">
                <h3> {board}</h3>

                <form>
                    <NavLink to='/board'>
                        <button> Go to Board </button>
                    </NavLink>
                </form>

            </div>
        );
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
                                    addBoard(this.boardInputRef.value);
                                }}>
                                    <input type="text" ref={e => this.boardInputRef = e} />
                                    <button type="submit" className="form__input"  > save Board</button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="Board-column">
                                {ListBoard}
                            </div>
                        </Col>
                    </Row>

                </Grid>
            </div>

        </div>
    );
}

export default MainBoard;