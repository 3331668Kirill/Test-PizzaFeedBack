import React, {useEffect, useState} from 'react'
import './App.css'
import {TypeGuest, TypeGuests, TypeVeganGuests} from "./types/types";
import {ListOfGuests} from "./components/ListOfGuests";



function App() {
    const [guests, setGuests] = useState<TypeGuest>([])
    //const [eatsPizza, setEatsPizza] = useState<Array<string>>([])
    const [eatsVeganPizza, setVeganEatsPizza] = useState<Array<string>>([])
    const [error, setError] = useState<string>('')

    useEffect(() => {
            fetch('https://gp-js-test.herokuapp.com/pizza/guests')
                .then((response) => response.json())
                .then((data: TypeGuests) => {
                    setGuests(data.party)
                    //setEatsPizza(data.party.filter(t => t.eatsPizza).map(t => t.name))
                    return data.party.filter(t => t.eatsPizza).map(t => t.name)
                })
                .then(data => {
                    let str = data.join(',')
                    fetch(`https://gp-js-test.herokuapp.com/pizza/world-diets-book/${str}`)
                        .then(res => res.json())
                        .then((data: TypeVeganGuests) => {
                            setVeganEatsPizza(data.diet.filter(t => t.isVegan).map(t => t.name))
                        })
                })
                .catch(() => setError("Something go wrong, try again later"))

        },
        [])


  return (
    <div className="App">
      <div className="App-header">

          <ListOfGuests guests={guests} eatsVeganPizza={eatsVeganPizza} />

      </div>
    </div>
  );
}

export default App;
