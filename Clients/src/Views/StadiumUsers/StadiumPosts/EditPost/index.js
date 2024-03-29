import React, { useEffect, useState, useRef, useCallback } from "react";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { fetchUpdatePost } from "../../../../middlewares/stadiumUser/fetchPost/fetchPost";
import {
  onPopupClose,
  onPopupOpen,
} from "../../../../Slices/Features/Popup/popupSlice";
import { onNotiOpen } from "../../../../Slices/Features/Notification/NotificationSlice";
import {
  Container,
  Typography,
  Box,
  Divider,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import ImageUpdatePost from "./ImageUpdatePost";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  textarea: {
    display: "block",
    width: "100%",
    fontSize: "1em",
    padding: "1em",
    resize: "vertical",
  },
  picture: {
    display: "flex",
    justifyContent: "flex=start",
    margin: ".5em auto",
  },
  inputProperties: {
    display: "none",
  },
  previewPicture: {
    display: "block",
    width: "100%",
    margin: "1em auto",
    borderRadius: "5px",
  },
}));

const EditPost = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { postsDataById } = useShallowEqualSelector((state) => state.posts);
  const { stadiumId_Admin } = useParams();
  const [postState, setPostState] = useState({
    post_id: "",
    stadium_id: "",
    post_title: "",
    post_details: "",
    stadium_postImage: null,
    stadium_postImageName: "",
  });
  const imagePostRef = useRef("");
  const [testImage, setTestImage] = useState(
    "/assets/images/postPics/addImage.jpg"
  );

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    postsDataById.forEach((items) => {
      setPostState((prev) => ({
        ...prev,
        post_id: items.pt_id,
        stadium_id: stadiumId_Admin,
        post_title: items.post_title,
        post_details: items.pt_description,
        stadium_postImageName: items.post_img,
      }));
      setTestImage(`/assets/images/adminPics/postPics/${items.post_img}`);
    });
    return () => setTestImage("/assets/images/postPics/addImage.jpg");
  }, [postsDataById, stadiumId_Admin]);

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

  const onPostDescriptionChange = useCallback((event) => {
    const { name, value } = event.target;
    setPostState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onPostTitleChange = useCallback((event) => {
    const { name, value } = event.target;
    setPostState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSelectedImage = () => {
    const getImagePost = imagePostRef.current.files[0];
    if (getImagePost) {
      setPostState((prev) => ({ ...prev, stadium_postImage: getImagePost }));
      setTestImage(window.URL.createObjectURL(getImagePost));
    } else {
      return;
    }
  };

  const onUpdatePost = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("postId", postState.post_id);
    formData.append("stadiumId", postState.stadium_id);
    formData.append("post_title", postState.post_title);
    formData.append("post_description", postState.post_details);
    formData.append("sampleFile", postState.stadium_postImage);
    formData.append("statdium_postImageName", postState.stadium_postImageName);
    dispatch(fetchUpdatePost(formData)).then(() => {
      dispatch(onPopupClose());
      dispatch(onNotiOpen("successUpdated"));
    });
  };

  return (
    <div className={classes.pageContainer}>
      <Container maxwidth="md">
        <form onSubmit={onUpdatePost}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              ແກ້ໄຂ Post ຂອງເດີ່ນ
            </Typography>
          </Box>
          <Divider />
          <div className={classes.picture}>
            <ImageUpdatePost
              ref={imagePostRef}
              selected={onSelectedImage}
              className={classes.inputProperties}
            />
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box>
                <img
                  className={classes.previewPicture}
                  src={testImage}
                  alt="gg"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box>
                <div>
                  <Box>
                    <TextField
                      fullWidth
                      type="text"
                      margin="normal"
                      label="ຫົວຂໍ້ຂອງ Post"
                      name="post_title"
                      value={postState.post_title}
                      onChange={onPostTitleChange}
                      variant="outlined"
                      required
                    />
                  </Box>
                  <textarea
                    className={classes.textarea}
                    name="post_details"
                    value={postState.post_details}
                    type="text"
                    placeholder="ລາຍລະອຽດ Post"
                    rows={20}
                    onChange={onPostDescriptionChange}
                    required
                  />
                </div>
              </Box>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button type="submit" fullWidth color="primary" variant="contained">
              ແກ້ໄຂ Post
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
});

export default EditPost;
