import React, { useState, useRef, useEffect, useCallback } from "react";
import PageLayout from "../../../../Components/PageLayout";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Box,
  Divider,
  Grid,
  Button,
  Card,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import ImageUpdateEmployee from "./ImageUpdateEmployee";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "3rem",
    [theme.breakpoints.down("xs")]: {
      padding: "2rem .5rem",
    },
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
    borderRadius: '5px'
  },
}));

const EditEmployee = ({ ...rest }) => {
  const classes = useStyles();
  const imageEmployeeRef = useRef(null);
  const [employeeState, setEmployeeState] = useState({
    post_title: "",
    post_details: "",
    stadium_postImage: null,
  });
  const [testImage, setTestImage] = useState(
    "/assets/images/adminPics/postPics/addImage.jpg"
  );
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

  const onPostDescriptionChange = useCallback((event) => {
    const { name, value } = event.target;
    setEmployeeState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onPostTitleChange = useCallback((event) => {
    const { name, value } = event.target;
    setEmployeeState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSelectedImage = () => {
    const getImageEmployee = imageEmployeeRef.current.files[0];
    if (getImageEmployee) {
      setEmployeeState((prev) => ({ ...prev, stadium_postImage: getImageEmployee }));
      setTestImage(window.URL.createObjectURL(getImageEmployee));
    } else {
      return;
    }
  };
  return (
    <PageLayout title="Stadium | Add Post" {...rest}>
      <div className={classes.pageContainer}>
        <Container maxwidth="md">
          <form onSubmit={(event) => {
            event.preventDefault();
          }}>
            <Box mb={3}>
              <Typography color="textPrimary" variant="h2">
                ແກ້ໄຂຂໍ້ມູນພະນັກງານເດີ່ນ
              </Typography>
            </Box>
            <Divider />
            <div className={classes.picture}>
              <ImageUpdateEmployee
                ref={imageEmployeeRef}
                selected={onSelectedImage}
                className={classes.inputProperties}
              />
            </div>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
                <Box border="1px solid #b5aba4" mb={2} mt={2} borderRadius="5px">
                  <img
                    className={classes.previewPicture}
                    src={testImage}
                    alt="gg"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={8}>
                <Box>
                  <Card elevation={10}>
                    <Box>
                      <TextField
                        fullWidth
                        type="text"
                        margin="normal"
                        label="ຫົວຂໍ້ຂອງ Post"
                        name="post_title"
                        value={employeeState.post_title}
                        onChange={onPostTitleChange}
                        variant="outlined"
                        required
                      />
                    </Box>
                    <textarea
                      className={classes.textarea}
                      name="post_details"
                      value={employeeState.stadium_post}
                      type="text"
                      placeholder="ລາຍລະອຽດ Post"
                      rows={20}
                      onChange={onPostDescriptionChange}
                      required
                    />
                  </Card>
                </Box>
              </Grid>
            </Grid>
            <Box mt={3}>
              <Button
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
              >
                ແກ້ໄຂ
              </Button>
            </Box>
          </form>
        </Container>
      </div>
    </PageLayout>
  );
};

export default EditEmployee;