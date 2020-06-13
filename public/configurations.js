/**
 * ADDITIVES
 * additive1 - naturle
 * additive2 - viz
 * additive3 - szalicil
 * additive4 - citromso
 * additive5 - cukor
 * additive6 - pektin
 */


var Configs = {
  labels: {
    currency: "RON",
    title0: "Válasszon gyümölcsöt",
    title1: "Adja meg hány kg gyümölcsöt szeretne hozni",
    title2: "Palackozás",
    title3: "Költségek",
    info1: "Az alapértelmezett palackozás 0.5L-es palackokba történik. Amennyiben szeretne 1L-es palackba vagy 0.5L-es üvegbe levet tölteni, adja meg az igényelt mennyiségeket",
    inputQtyLabel: "Behozott mennyiség",
    outputQtyLabel: "Kinyert mennyiség",
    expensesTable: {
      col1Header: "Leírás",
      col2Header: "Ár",
      additiveTitle: "Adalékok",
      additiveDetails: "cukor, tartósítószer, pektinbontó",
      bottlesTitle: "Palackozás",
      servicesTitle: "Préselés",
      totalTitle: "Összesen"
    }
  }, 
  bottles: [
    {
      fieldName: "inputBottlePetHalf",
      disabled: true,
      text: "0.5L PET",
      type: "PET",
      capacity: 0.5,
      price: 1.6
    },
    {
      fieldName: "inputBottlePetOne",
      text: "1L PET",
      type: "PET",
      capacity: 1,
      price: 2
    },
    {
      fieldName: "inputBottleHalf",
      text: "0.5L Üveg",
      type: "Üveg",
      capacity: 0.5,
      price: 3.2
    }
  ],
  categories: [
    {
      value: "malna",
      title: "Málna",
      calculator: {
        unit: "kg",        
        servicesPrices: [
          {
            text: "20-50",
            min: 20,
            max: 50,
            price: 2.5
          },
          {
            text: "51-75",
            min: 50,
            max: 75,
            price: 2
          },
          {
            text: "76-100",
            min: 75,
            max: 100,
            price: 1.7
          },
          {
            text: ">101",
            min: 100,
            max: Infinity,
            price: 1.5
          }
        ],        
        additivePrices: {
          additive1: {
            coefficient: 60,
            price: 0
          },
          additive2: {
            coefficient: 70,
            price: 0.05
          },
          additive3: {
            coefficient: 1,
            price: 0.22
          },
          additive4: {
            coefficient: 1.8,
            price: 0.12
          },
          additive5: {
            coefficient: 85,
            price: 3
          },
          additive6: {
            coefficient: 10,
            price: 2
          }
        }
      }
    },
    {
      value: "meggy",
      title: "Meggy",
      calculator: {
        unit: "kg",       
        servicesPrices: [
          {
            text: "20-50",
            min: 20,
            max: 50,
            price: 3
          },
          {
            text: "51-75",
            min: 50,
            max: 75,
            price: 2
          },
          {
            text: "76-100",
            min: 75,
            max: 100,
            price: 1.7
          },
          {
            text: ">101",
            min: 100,
            max: Infinity,
            price: 1.5
          }
        ],       
        additivePrices: {
          additive1: {
            coefficient: 50,
            price: 0
          },
          additive2: {
            coefficient: 65,
            price: 0.05
          },
          additive3: {
            coefficient: 1.2,
            price: 0.22
          },
          additive4: {
            coefficient: 2.4,
            price: 0.12
          },
          additive5: {
            coefficient: 50,
            price: 3
          },
          additive6: {
            coefficient: 10,
            price: 2
          }
        }
      }
    },
    {
      value: "feketeribizli",
      title: "Fekete ribizli",
      calculator: {
        unit: "kg",        
        servicesPrices: [
          {
            text: "20-50",
            min: 20,
            max: 50,
            price: 3.2
          },
          {
            text: "51-75",
            min: 50,
            max: 75,
            price: 2.8
          },
          {
            text: "76-100",
            min: 75,
            max: 100,
            price: 2.2
          },
          {
            text: ">101",
            min: 100,
            max: Infinity,
            price: 1.8
          }
        ],       
        additivePrices: {
          additive1: {
            coefficient: 55,
            price: 0
          },
          additive2: {
            coefficient: 80,
            price: 0.05
          },
          additive3: {
            coefficient: 1,
            price: 0.22
          },
          additive4: {
            coefficient: 1.8,
            price: 0.12
          },
          additive5: {
            coefficient: 80,
            price: 3
          },
          additive6: {
            coefficient: 10,
            price: 2
          }
        }
      }
    },    
    {
      value: "fenyorugy",
      title: "Fenyőrügy",
      calculator: {
        unit: "kg",        
        servicesPrices: [
          {
            text: "5-15",
            min: 5,
            max: 15,
            price: 4
          },
          {
            text: "16-30",
            min: 15,
            max: 30,
            price: 3
          },
          {
            text: "31-50",
            min: 30,
            max: 50,
            price: 2
          },
          {
            text: ">51",
            min: 50,
            max: Infinity,
            price: 1.6
          }
        ],       
        additivePrices: {
          additive1: {
            coefficient: 0,
            price: 0
          },
          additive2: {
            coefficient: 300,
            price: 0.05
          },
          additive3: {
            coefficient: 1,
            price: 0.22
          },
          additive4: {
            coefficient: 2,
            price: 0.12
          },
          additive5: {
            coefficient: 80,
            price: 3
          },
          additive6: {
            coefficient: 0,
            price: 0
          }
        }
      }
    }
  ]
};