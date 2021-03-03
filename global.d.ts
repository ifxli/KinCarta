declare namespace KCContact {
    type Contact = {
        id: number
        name: string
        companyName: string
        isFavorite: boolean,
        smallImageURL: string
        largeImageURL: string
        emailAddress: string
        birthdate: string
        phone: Phone
        address: Address
    }

    type Phone = {
        work: string
        home: string
        mobile: string
    }

    type Address = {
        street: string
        city: string
        state: string
        country: string
        zipCode: string
    }
}