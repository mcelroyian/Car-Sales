import { ADD_FEATURE, REMOVE_FEATURE  } from '../actions'

export const initialState = {
    additionalPrice: 0,
    car: {
        price: 26395,
        name: '2020 Ford Mustang',
        image:
        'https://cdn.motor1.com/images/mgl/0AN2V/s1/2019-ford-mustang-bullitt.jpg',
        features: []
    },
    additionalFeatures: [
        { id: 1, name: 'V-6 engine', price: 1500 },
        { id: 2, name: 'Racing detail package', price: 1500 },
        { id: 3, name: 'Premium sound system', price: 500 },
        { id: 4, name: 'Rear spoiler', price: 250 }
    ]
}

const addFeaturePrice = features => {
    return features.reduce((acc, val) => {
        return acc + val.price
    }, 0)
}

export const carReducer = (state = initialState, action) => {
    console.log('entering reducer')
    switch(action.type) {
        
        case ADD_FEATURE:
            console.log('inside add feature', {state})
            if (state.car.features.filter(f => f.id === action.payload).length){
                    const removed = state.additionalFeatures.filter(f => f.id === action.payload)
                    console.log(removed)
                alert(`${removed[0].name} has already been added`)
                return {...state}
            }
            const newFeature = state.additionalFeatures.filter(f => f.id ===action.payload)
            return {...state, additionalPrice: addFeaturePrice([...state.car.features, newFeature[0]]), car: {...state.car, features: [...state.car.features, newFeature[0]]}}
        
        case REMOVE_FEATURE:
            console.log('inside remove feature, FEATURE ID:', action.payload)
            const remainingFeatures = state.car.features.filter(f => f.id !== action.payload)
            return {...state, additionalPrice: addFeaturePrice(remainingFeatures), car: { ...state.car, features: remainingFeatures } }
        default:
            return {...state}
    }
}