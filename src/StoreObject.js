import React, { Component } from 'react';

class Store extends Component {
    state = { 
        StoreObj: {
            lists: [
                {
                  id: 1,
                  title: "Moja lista zakupów",
                  listElements: [
                    { id: 1, value: 4, name: "Milk" },
                    { id: 2, value: 0, name: "Potato" },
                    { id: 3, value: 1, name: "Juice" },
                    { id: 4, value: 0, name: "Cheese" }
                  ],
                  data: "01/02/2018"
                },
                {
                  id: 2,
                  title: "Moja lista zakupów nr2",
                  listElements: [
                    { id: 1, value: 6, name: "Oat" },
                    { id: 2, value: 1, name: "Bread" },
                    { id: 3, value: 3, name: "Water" }
                  ],
                  data: "01/02/2018"
                }
                // { id: 1, value: 4, name: "Milk" },
                // { id: 2, value: 0, name: "Potato" },
                // { id: 3, value: 0, name: "Juice" },
                // { id: 4, value: 0, name: "Cheese" }
              ],
              products: [
                { id: 1, name: "Milk" },
                { id: 2, name: "Potato" },
                { id: 3, name: "Juice" }
              ]
        }
     }

     componentDidUpdate() {
         alert('zmieniono Store, aktualizacja na serwerze...')
     }

     updateStoreState(newObj) {
         const StoreObj = newObj //w app odpalimy ta funkcje i przekazemy obj z dodanym produktem np
         //this.setState({StoreObj}) // wtedy zaktualizuje sie state, a przez to odpali componentDidUpdate() ??
        console.log(newObj);
        }

    // render() { 
    //     return (  );
    // }
}
 
export default Store;
