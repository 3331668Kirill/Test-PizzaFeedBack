export type TypeGuest = Array<{ name: string, eatsPizza: boolean }>
export type TypeVeganGuest = Array<{ name: string, isVegan: boolean }>


export type TypeGuests = {
    party: TypeGuest
}

export type TypeVeganGuests = {
    diet: TypeVeganGuest
}

export type TypeListOfGuestsProps = {
    guests: TypeGuest
    eatsVeganPizza: Array<string>
}

export type TypeFeedBackInfo = Array<{ name: string, star: number, phone: string, comment: string }>

export type TypeButtonValue = 'cancel' | 'save'