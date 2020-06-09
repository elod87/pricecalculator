import React from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TextField, InputAdornment, Typography, Box, Grid } from "@material-ui/core";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse } from "@material-ui/core";
import { ArrowDownward, Info } from "@material-ui/icons";

import StepContainer from "./StepContainer";
import configs from './configs_hun';

const useStyles = makeStyles(theme => ({
    tableRowBorder: {
        "& > *": {
            borderBottom: "unset"
        }
    },
    margin: {
        margin: theme.spacing(1)
    },
    padding: {
        padding: theme.spacing(2)
    },
    paddingTop: {
        paddingTop: theme.spacing(1)
    },
    border: {
        border: "1px solid #ccc"
    },
    textField: {
        maxWidth: "15rem"
    },
    textAlignCenter: {
        textAlign: "center"
    },
    infoIcon: {
        alignSelf: "flex-end",
        margin: theme.spacing(1),
        color: theme.palette.info.dark
    },
    infoPanel: {
        display: "flex",
        flexDirection: "column",
        fontSize: '1.5rem',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.grey["200"],
        borderRadius: "10px",
        textAlign: "justify"
    },
    alignSelfCenter: {
        alignSelf: "center"
    },
    totalLabel: {
        textAlign: "right",
        padding: theme.spacing(2),
        paddingRight: 0,
        fontWeight: 600,
        fontSize: 20,
        color: '#d62828'
    }
}));

const StyledTableHeaderCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.grey["500"],
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

const StyledTableBodyCell = withStyles({
    body: {
        fontSize: '1.7rem'
    }
})(TableCell);

function PriceCalculator(props) {
    const classes = useStyles();
    const { unit, servicesPrices, additivePrices } = props;
    const labels = configs.labels;
    const { bottles } = configs;
    const { currency, title1, title2, title3, info1 } = labels;
    const tableLabels = labels.expensesTable;

    const [state, setState] = React.useState({
        inputError: false,
        errorText: '',
        inputQuantity: 0,
        outputQuantity: 0,
        inputBottlePetHalf: 0,
        inputBottlePetOne: 0,
        inputBottleHalf: 0,
        adalekTotal: 0,
        bottleTotal: 0,
        bottleDetails: '',
        preselesTotal: 0,
        preselesDetails: '',
        total: 0
    });

    React.useEffect(() => {
        setState(makeCalculations(state));
    }, [props.selectedFruit])

    const makeCalculations = (state, inputName) => {
        //check if minimum qty is met
        let inputQty = state.inputQuantity;
        if (inputQty < servicesPrices[0].min) {
            state.inputError = true;
            state.errorText = `Min ${servicesPrices[0].min}${unit}`;
            inputQty = 0;
        } else {
            state.inputError = false;
            state.errorText = '';
        }

        let oneLiterPet = state.inputBottlePetOne;
        let halfLiterBottle = state.inputBottleHalf;

        const additive1 = inputQty * (additivePrices.additive1.coefficient / 100);
        const additive2 = inputQty * (additivePrices.additive2.coefficient / 100);
        const additive2Cost = additive2 * additivePrices.additive2.price;
        const additive6 = inputQty * (additivePrices.additive6.coefficient / 100);
        const additive6Cost = additive6 * additivePrices.additive6.price;
        const additive5 = (additive1 + additive2) * (additivePrices.additive5.coefficient / 100);
        const additive5Cost = additive5 * additivePrices.additive5.price;

        const outputQty = Math.round((additive5 * (55 / 100)) + additive1 + additive2);

        const additive3 = outputQty * additivePrices.additive3.coefficient;
        const additive3Cost = additive3 * additivePrices.additive3.price;
        const additive4 = outputQty * additivePrices.additive4.coefficient;
        const additive4Cost = additive4 * additivePrices.additive4.price;

        let additiveTotal = additive2Cost + additive3Cost + additive4Cost + additive5Cost + additive6Cost;

        let halfLiterPet = outputQty * 2 - oneLiterPet * 2 - halfLiterBottle;
        if (halfLiterPet < 0) {
            if (inputName) {
                halfLiterPet = 0;
                if (inputName === 'inputBottlePetOne') {
                    if (outputQty - oneLiterPet < 0) {
                        oneLiterPet = outputQty;
                        halfLiterBottle = 0;
                    } else {
                        halfLiterBottle = Math.round((outputQty - oneLiterPet) * 2)
                    }
                } else if (inputName === 'inputBottleHalf') {
                    if (outputQty - halfLiterBottle * 2 < 0) {
                        halfLiterBottle = outputQty * 2;
                        oneLiterPet = 0;
                    } else {
                        oneLiterPet = (outputQty - halfLiterBottle * 2);
                    }
                } else {
                    oneLiterPet = 0;
                    halfLiterBottle = 0;
                    halfLiterPet = outputQty * 2 - oneLiterPet * 2 - halfLiterBottle;
                }
            } else {
                oneLiterPet = 0;
                halfLiterBottle = 0;
                halfLiterPet = outputQty * 2 - oneLiterPet * 2 - halfLiterBottle;
            }
        }

        const pethalfCost = halfLiterPet * bottles[0].price;
        const petoneCost = oneLiterPet * bottles[1].price;
        const bottlehalfCost = halfLiterBottle * bottles[2].price;

        let bottleTotal = pethalfCost + petoneCost + bottlehalfCost;
        halfLiterPet = Math.round(halfLiterPet)

        const halfLiterPetText = bottles[0].text;
        const oneLiterPetText = bottles[1].text;
        const halfLiterBottleText = bottles[2].text;
        const bottleDetails = [
            halfLiterPet > 0 ? `${halfLiterPet} x ${halfLiterPetText}` : '',
            oneLiterPet > 0 ? `${oneLiterPet} x ${oneLiterPetText}` : '',
            halfLiterBottle > 0 ? `${halfLiterBottle} x ${halfLiterBottleText}` : ''
        ].filter(value => value !== '').join(' + ');

        let servicesTotal = 0;
        let servicesDetails = `${inputQty}${unit}`;

        const servicesPricesClone = [];
        for(const servicePrice of servicesPrices) {
            servicesPricesClone.push({...servicePrice});
        }

        //use the cloned servicePrices array for changing the first object's min
        if (servicesPricesClone.length > 0) servicesPricesClone[0].min -= 0.01;
        for (const servicePrice of servicesPricesClone) {
            if (inputQty > servicePrice.min && inputQty <= servicePrice.max) {
                servicesTotal = servicePrice.price * inputQty;
                servicesDetails += ` ... ${servicePrice.price} ${currency}/${unit}`;
                break;
            }
        }

        additiveTotal = Math.round(additiveTotal);
        bottleTotal = Math.round(bottleTotal);
        servicesTotal = Math.round(servicesTotal);

        const total = additiveTotal + bottleTotal + servicesTotal;

        return {
            ...state,
            outputQuantity: outputQty,
            inputBottlePetHalf: halfLiterPet,
            inputBottlePetOne: oneLiterPet,
            inputBottleHalf: halfLiterBottle,
            adalekTotal: additiveTotal,
            bottleTotal: bottleTotal,
            bottleDetails,
            preselesTotal: servicesTotal,
            preselesDetails: servicesDetails,
            total: total
        }
    }


    const handleInputChange = event => {
        const inputValue = event.target.value === '' ? '' : Math.abs(event.target.value);
        let stateCopy = {
            ...state,
            [event.target.name]: inputValue,
        };

        stateCopy = makeCalculations(stateCopy, event.target.name);

        setState(stateCopy);
    };

    const servicesPriceRows = [];
    for (const servicePrice of servicesPrices) {
        servicesPriceRows.push({
            description: servicePrice.text + unit,
            price: `${servicePrice.price} ${currency}/${unit}`
        });
    }

    const bottlePriceRows = [];
    for (const bottlePrice of bottles) {
        bottlePriceRows.push({
            description: bottlePrice.text,
            price: `${bottlePrice.price} ${currency}`
        });
    }

    return (
        <React.Fragment>
            <StepContainer title={`2. ${title1}`}>
                <Box className={classes.margin}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm={6} className={classes.textAlignCenter}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} className={classes.textAlignCenter}>
                                    <TextField
                                        error={state.inputError}
                                        helperText={state.errorText}
                                        label={labels.inputQtyLabel}
                                        id="input-quantity"
                                        className={clsx(classes.margin, classes.textField)}
                                        type="number"
                                        onChange={handleInputChange}
                                        name="inputQuantity"
                                        value={state.inputQuantity}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">{unit}</InputAdornment>
                                            )
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.textAlignCenter}>
                                    <ArrowDownward />
                                </Grid>
                                <Grid item xs={12} className={classes.textAlignCenter}>
                                    <TextField
                                        label={labels.outputQtyLabel}
                                        id="output-quantity"
                                        className={clsx(classes.margin, classes.textField)}
                                        type="number"
                                        name="outputQuantity"
                                        value={state.outputQuantity}
                                        disabled={true}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">liter</InputAdornment>
                                            )
                                        }}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.textAlignCenter}>
                            <Box className={classes.infoPanel} color="text.secondary">
                                <Info className={classes.infoIcon} />
                                <TableContainer className={classes.alignSelfCenter}>
                                    <Table className={classes.table} size="small">
                                        <TableBody>
                                            {servicesPriceRows.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row">
                                                        {row.description}
                                                    </TableCell>
                                                    <TableCell align="right">{row.price}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </StepContainer>
            <StepContainer title={`3. ${title2}`}>
                <Box className={classes.margin}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm={6} className={classes.textAlignCenter}>
                            <Grid container spacing={0}>
                                {bottles.map(bottle => {
                                    return (
                                        <Grid item xs={12} className={classes.textAlignCenter}>
                                            <TextField
                                                label={bottle.type}
                                                className={clsx(classes.margin, classes.textField)}
                                                type="number"
                                                name={bottle.fieldName}
                                                value={state[bottle.fieldName]}
                                                onChange={bottle.disabled ? () => {} : handleInputChange}
                                                disabled={bottle.disabled === true}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">{bottle.capacity}L</InputAdornment>
                                                    )
                                                }}
                                                variant="outlined"
                                            />
                                        </Grid>
                                    )
                                })}                                
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.textAlignCenter}>
                            <Box className={classes.infoPanel} color="text.secondary">
                                <Info className={classes.infoIcon} />
                                <Box style={{ padding: "0 8px" }}>
                                    <Typography display="inline" variant="subtitle1" color="textPrimary">
                                        {info1}
                                    </Typography>
                                    <TableContainer className={classes.paddingTop}>
                                        <Table className={classes.table} size="small">
                                            <TableBody>
                                                {bottlePriceRows.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell component="th" scope="row" className={classes.tableCellSmallFont}>
                                                            {row.description}
                                                        </TableCell>
                                                        <TableCell align="right">{row.price}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </StepContainer>
            <StepContainer title={`4. ${title3}`}>
                <Box className={classes.margin}>
                    <TableContainer className={classes.border}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableHeaderCell>{tableLabels.col1Header}</StyledTableHeaderCell>
                                    <StyledTableHeaderCell align="right">{tableLabels.col2Header}</StyledTableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={1} className={classes.tableRowBorder}>
                                    <StyledTableBodyCell component="th" scope="row">{tableLabels.additiveTitle}</StyledTableBodyCell>
                                    <StyledTableBodyCell align="right">{state.adalekTotal}</StyledTableBodyCell>
                                </TableRow>
                                <TableRow key={2}>
                                    <TableCell
                                        style={{ paddingBottom: 0, paddingTop: 0 }}
                                        colSpan={6}
                                    >
                                        <Collapse in={true} timeout="auto" unmountOnExit>
                                            <Box margin={1} fontSize={14} color="text.disabled">{tableLabels.additiveDetails}</Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                                <TableRow key={3} className={classes.tableRowBorder}>
                                    <StyledTableBodyCell component="th" scope="row">{tableLabels.bottlesTitle}</StyledTableBodyCell>
                                    <StyledTableBodyCell align="right">{state.bottleTotal}</StyledTableBodyCell>
                                </TableRow>
                                <TableRow key={4}>
                                    <TableCell
                                        style={{ paddingBottom: 0, paddingTop: 0 }}
                                        colSpan={6}
                                    >
                                        <Collapse in={true} timeout="auto" unmountOnExit>
                                            <Box margin={1} fontSize={14} color="text.disabled">
                                                {state.bottleDetails}
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                                <TableRow key={5} className={classes.tableRowBorder}>
                                    <StyledTableBodyCell component="th" scope="row">{tableLabels.servicesTitle}</StyledTableBodyCell>
                                    <StyledTableBodyCell align="right">{state.preselesTotal}</StyledTableBodyCell>
                                </TableRow>
                                <TableRow key={6}>
                                    <TableCell
                                        style={{ paddingBottom: 0, paddingTop: 0 }}
                                        colSpan={6}
                                    >
                                        <Collapse in={true} timeout="auto" unmountOnExit>
                                            <Box margin={1} fontSize={14} color="text.disabled">
                                                {state.preselesDetails}
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography className={classes.totalLabel} color="textPrimary">{tableLabels.totalTitle}: {state.total} {currency}</Typography>
                </Box>
            </StepContainer>
        </React.Fragment>
    );
}

export default PriceCalculator;
