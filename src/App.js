import React from 'react';
import { StylesProvider, createGenerateClassName, withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FruitCalculator from './FruitCalculator';
import './App.css';

const generateClassName = createGenerateClassName({
  productionPrefix: 'ap',
});

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#d62828'
    },
    text: {
      primary: '#555b6e'
    }
  },
  typography: {
    useNextVariants: true,
    fontSize: 22
  }
});

const GlobalCss = withStyles({
  '@global': {
    '.MuiTable-root': {
      margin: 0,
      border: 0
    },
    '.MuiTableCell-root': {
      padding: '1rem',
      borderTop: 0,
      borderLeft: 0,
      borderRight: 0
    },
    'input.MuiInputBase-input': {
      border: 'none'
    },
    'h6.MuiTypography-root': {
      margin: '0 0 1rem 0',
      textTransform: 'none'
    }
  },
})(() => null);


function App() {
  const [configs, setConfigs] = React.useState();
  const [dataLoaded, setDataLoaded] = React.useState(false);

  React.useEffect(() => {
    fetch('https://api.npoint.io/d2c587adc85d94d83e6b')
      .then(response => response.json())
      .then((configs) => {
        setConfigs(configs);
        setDataLoaded(true);        
      })
      .catch((error) => {
        console.error(error)
      })
  }, []);

  return (
    <div className="App">
      <main>
        <MuiThemeProvider theme={theme}>
          <StylesProvider generateClassName={generateClassName}>
            <GlobalCss />
            {dataLoaded && <FruitCalculator configs={configs} />}
          </StylesProvider>
        </MuiThemeProvider>
      </main>
    </div>
  );
}

export default App;
