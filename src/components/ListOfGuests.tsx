import React from 'react'
import '../App.css'
import {ListOfGuestsPropsType} from "../types/types";


export const ListOfGuests = ({
                          guests,
                          eatsVeganPizza
                      }: ListOfGuestsPropsType) => {

    return (
        <>
            <table>
                <tbody className="table">
                <tr className="table">
                    <th className="row_name">Name</th>
                </tr>
                {guests && guests.map((t) => {
                    return (
                        <tr key={t.name}>
                            <td style={eatsVeganPizza.find(value => value === t.name) ? {color: 'green'}
                                : t.eatsPizza ? {} : {color: 'gray'}}>{t.name}</td>

                        </tr>
                    )
                })
                }


                </tbody>

            </table>


        </>
    )
}