import React from "react";
import { makeStyles, styled, withStyles } from "@material-ui/core/styles";
import { Container, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";

import StepContainer from "./StepContainer";
import PriceCalculator from "./PriceCalculator";
import configs from './configs_hun';

const useStyles = makeStyles(theme => ({
  radioGroup: {
    flexDirection: "row",
    margin: theme.spacing(1),
    marginBottom: 0
  }  
}));

const StyledFormControlLabel = withStyles({
  label: {
      fontSize: '1.6rem',
      color: '#555b6e'
  }
})(FormControlLabel);

const StepContainerBox = styled(Container)(({
  theme
}) => ({
  padding: "30px",
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    padding: "5px"
  }
}));

const { categories } = configs;

function FruitCalculator() {
  const classes = useStyles();

  const [selectedFruit, setSelectedFruit] = React.useState("malna");

  const handleRadioChange = event => {
    setSelectedFruit(event.target.value);
  };

  return (
    <StepContainerBox maxWidth="md">
      <StepContainer title={`1. ${configs.labels.title0}`}>
        <RadioGroup
          name="fruits"
          value={selectedFruit}
          onChange={handleRadioChange}
          className={classes.radioGroup}
        >
          {categories.map((category, index) => {
            return (
              <StyledFormControlLabel
                key={index}
                value={category.value}
                control={<Radio checked={category.value === selectedFruit} color="secondary" />}
                label={category.title}
                color="textPrimary"
              />
            );
          })}
        </RadioGroup>
      </StepContainer>
      <PriceCalculator selectedFruit={selectedFruit} {...categories[categories.findIndex(category => category.value === selectedFruit)].calculator} />
    </StepContainerBox>
  );
}

export default FruitCalculator;
