import React, { useState, useRef, useEffect } from "react";
import PageLayout from "../../../../Components/PageLayout";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import ImagePost from './ImagePost'

const AddPost = ({ ...rest }) => {
    
    const imagePostRef = useRef(null);
    const [ testImage, setTestImage ] = useState(null);
    const { checkResult } = useShallowEqualSelector((state) => state.validData);
    const { stadiumId_Admin } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
  
    useEffect(() => {
      const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
      if (adminToken && adminToken.token) {
        dispatch(fetchAuthAdmin(adminToken.token));
        dispatch(userNow("admin"));
      }
    }, [dispatch]);
  
    useEffect(() => {
      dispatch(fetchCheckStadium(stadiumId_Admin));
    }, [dispatch, stadiumId_Admin]);
  
    useEffect(() => {
      if (checkResult === 404) {
        history.replace("/404");
      }
    }, [history, checkResult]);
    const onSelectedImage = () => {
        const getImagePost = imagePostRef.current.files[0];
        setTestImage(URL.createObjectURL(getImagePost))
    }
  return (
    <PageLayout title="Stadium | Add Post" {...rest}>
        <ImagePost ref={imagePostRef} selected={onSelectedImage}/>
      <img src={testImage} alt="gg"/>
    </PageLayout>
  );
};

export default AddPost;
