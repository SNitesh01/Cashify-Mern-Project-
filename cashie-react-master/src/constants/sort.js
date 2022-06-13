export const DefaultSort = {
    NEWEST: 'Newest',
    OLDEST: 'Oldest'
}

export const UserSort = {
    ...DefaultSort,
    NAME: 'Name',
    LAST_ACTIVE: 'Last Active'
}

export const CategorySort = {
    ...DefaultSort,
    NAME: 'Name'
}

export const ProductSort = {
    ...DefaultSort,
    NAME: 'Name',
    LOW_TO_HIGH: 'Lowest to Highest',
    HIGH_TO_LOW: 'Highest to Lowest'
}