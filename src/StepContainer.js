import React from "react";
import clsx from "clsx";
import { makeStyles, styled } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";

const styles = makeStyles(theme => ({
    marginBottom1: {
        marginBottom: theme.spacing(1)
    },
    wpOverride: {
        textTransform: 'unset',
        fontSize: '2rem'
    }
}));

const StepContainerBox = styled(Box)({
    borderRadius: "20px",
    border: '2px solid #f1f1f1',
    background: "#fff",
    padding: '16px'
});

function StepContainer(props) {
    const classes = styles();
    return (
        <StepContainerBox className={clsx(classes.marginBottom1)}>        
            <Typography
                align="left"
                variant="subtitle1"
                className={clsx(classes.marginBottom1, classes.wpOverride)}
                color="textPrimary"
            >
                {props.title}
            </Typography>
            {props.children}        
        </StepContainerBox>
    );
}

export default StepContainer;
