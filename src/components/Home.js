import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard, deleteBoard } from "../actions";
import BoardThumbnail from "./BoardThumbnail";
import Icon from "@material-ui/core/Icon";

const DeleteButtonOne = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  opacity: 0.4;
  &:hover {
    opacity: 0.8;
  }
`;

const Thumbnails = styled.div`
  flex: 1;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const CreateTitle = styled.h3`
  font-size: 2em;
  color: black;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;

const CreateInput = styled.input`
  width: 20em;
  height: 2em;
  font-size: 1em;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 3px;
  border: none;
  outline-color: blue;
  box-shadow: 0 2px 4px grey;
  align-self: center;
`;

const Home = ({ boards, boardOrder, dispatch }) => {

  const [newBoardTitle, setNewBoardTitle] = useState("");

  const handleChange = e => {
    setNewBoardTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addBoard(newBoardTitle));
  };

  const handleDelete = () => {
    dispatch(deleteBoard());
  };

  const renderBoards = () => {
    return boardOrder.map(boardID => {
      const board = boards[boardID];

      return (
        <Link
          key={boardID}
          to={`/${board.id}`}
          style={{ textDecoration: "none" }}
        >
          <BoardThumbnail {...board} />
          <DeleteButtonOne onClick={handleDelete}>
            delete
          </DeleteButtonOne>
        </Link>
      );
    });
  };

  const renderCreateBoard = () => {
    return (
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <CreateTitle>Create a new project</CreateTitle>
        <CreateInput
          onChange={handleChange}
          value={newBoardTitle}
          placeholder="Your project name"
          type="text"
        />
      </form>
    );
  };

  return (
    <HomeContainer>
      <Thumbnails>{renderBoards()}</Thumbnails>
      {renderCreateBoard()}
    </HomeContainer>
  );
};

const mapStateToProps = state => ({
  boards: state.boards,
  boardOrder: state.boardOrder
});

export default connect(mapStateToProps)(Home);
