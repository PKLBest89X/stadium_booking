import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  ItemsContainer: {},
}));

const ItemsContainer = styled.div`
  box-shadow: 5px 10px 18px 4px #8888;
  border-radius: none;
  transition: 200ms ease-in-out;
  & > div {
    & > img {
      display: block;
      width: 100%;
    }
  }
  & > [id="title-container"] {
    display: flex;
    justify-content: space-between;
  }
  :hover {
    transform: scale(1.02);
  }
`;

const EditProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  & > button {
    border: none;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
    padding: 0.5em 1em;
  }
`;

const ProfileContainer = styled.div`
  padding: 1em;
  display: flex;
  justify-content: space-around;
  & > img {
    border-radius: 50%;
    width: 80px;
  }
`;

const HomeContents = ({ getitems }) => {
  const classes = useStyles();
  return (
    <>
      <ItemsContainer>
        <div id="title-container">
          <ProfileContainer>
            <img src={getitems.avatar} alt={getitems.first_name} />
            <Link to={`/stadium/${getitems.email}`}>{getitems.email}</Link>
          </ProfileContainer>
          <EditProfileContainer></EditProfileContainer>
        </div>
        <div className="picture-container">
          <img src={getitems.pic} alt={getitems.first_name} />
        </div>
        <div className="footer-container">
          <div>
            <h4>{getitems.first_name}</h4>
            <p>{getitems.last_name}</p>
          </div>
        </div>
      </ItemsContainer>
    </>
  );
};

export default HomeContents;
