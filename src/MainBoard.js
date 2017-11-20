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

const MainBoard = ({boards}) => {
    const listBoard = boards.map(board => {
        return <BoardMain key={board} title={board}/>
    });
    return (
        <div>
          
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
                                    <button type="submit" className="form__input" id="btnAddList" > save Board</button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="Board-column">
                                {listBoard}
                            </div>
                        </Col>
                    </Row>

                </Grid>
            </div>

        </div>
    );
}

export default MainBoard;