export type TypeGuest = Array<{ name: string, eatsPizza: boolean }>
export type TypeVeganGuest = Array<{ name: string, isVegan: boolean }>


export type TypeGuests = {
    party: TypeGuest
}

export type TypeVeganGuests = {
    diet: TypeVeganGuest
}

export type ListOfGuestsPropsType = {
    guests: TypeGuest
    eatsVeganPizza: Array<string>
}
