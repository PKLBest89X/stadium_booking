import React, { useState } from "react";
import PageLayout from "../../Components/PageLayout";
import { Box, Container, makeStyles } from "@material-ui/core";
import Results from "./Results";
import Toolbar from "./Toolbar";
import { userData } from "./data";

const useStyles = makeStyles(() => ({
  root: {
    padding: "1em",
  },
}));

const StadiumOwner = ({ ...rest }) => {
  const [customers] = useState(userData);
  const classes = useStyles();
  return (
    <PageLayout {...rest} title="ເຈົ້າຂອງເດີ່ນທັງໝົດ">
      <Container className={classes.root} maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results customers={customers} />
        </Box>
      </Container>
    </PageLayout>
  );
};

export default StadiumOwner;
