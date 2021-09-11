import * as types from './../constants/ActionType';
import { findIndex } from 'lodash';
var data =JSON.parse(localStorage.getItem('CART'))
var initialState = data??[]
let index =-1;
let id=0;
const cart = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_PRODUCT_IN_CART:
            id=action.product.id;
            index = findIndex(state, e => e.product.id === id)
            if(index!==-1){
                state[index].quantity=action.quantity
            }
            localStorage.setItem('CART',JSON.stringify(state))
            return [...state]
        case types.DELETE_PRODUCT_IN_CART:
            id=action.product.id;
            index = findIndex(state, e => e.product.id === id)
            if(index!==-1){
                state.splice(index,1)
            }
            localStorage.setItem('CART',JSON.stringify(state))
            return [...state]
        case types.ADD_TO_CART:          
            let { product, quantity } = action;
            index = findIndex(state, e => e.product.id === product.id)
            console.log(index)
            if (index !== -1) {
                state[index].quantity += quantity
            } else {
                state.push({
                    product, quantity
                })
            }
            localStorage.setItem('CART',JSON.stringify(state))
            return [...state]
        default: return [...state];
    }
}
export default cart;