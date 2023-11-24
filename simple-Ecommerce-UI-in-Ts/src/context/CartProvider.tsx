import {ReactElement, createContext, useMemo, useReducer} from 'react';

// --------- Types -------------

export type CartItemType = {
    sku:string,
    name:string,
    price:number,
    quantity:number
}

type CartStateType = { cart : CartItemType[] }

const REDUCER_ACTION_TASKS = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT",
}

export type ReducerActionType = typeof REDUCER_ACTION_TASKS

type ReducerAction = {
    type:string,
    payload?:CartItemType
}

type ChildrenType = { children?: ReactElement | ReactElement[] }


// ----- Default Values ------------

const initCartState : CartStateType  = { cart : [] }  //Empty Cart at start




// --------- Reducer Fucntion for handling activities of Cart Logic ------------- 

const reducer = (state:CartStateType,action:ReducerAction) : CartStateType => {

    switch (action.type) {

        case REDUCER_ACTION_TASKS.ADD:{
            if(!action.payload){
                throw new Error("action.payload is missing in ADD");
            }

            const { sku , name , price } = action.payload;

            const filteredCart : CartItemType[] = state.cart.filter(item => item.sku !== sku )
            
            const itemExsist : CartItemType | undefined = state.cart.find(item => item.sku === sku)

            const quantity : number = itemExsist ? itemExsist.quantity+1 : 1

            return {
                ...state,
                cart:[...filteredCart,{
                    sku,
                    price,
                    name,
                    quantity
                }]
            }
        }
        case REDUCER_ACTION_TASKS.QUANTITY:{
            if(!action.payload){
                throw new Error("action.payload is missing in Quantity");
            }

            const { sku , quantity } = action.payload;

            const itemExsist : CartItemType | undefined = state.cart.find(item => item.sku === sku)

            if(!itemExsist){
                throw new Error("Item is Not in Cart");
            }

            const updatedItem:CartItemType = {...itemExsist,quantity}

            const filteredCart : CartItemType[] = state.cart.filter(item => item.sku !== sku )

            return {...state,cart:[...filteredCart,updatedItem]}

            
        }
        case REDUCER_ACTION_TASKS.REMOVE:{
            if(!action.payload){
                throw new Error("action.payload is missing in Remove");
            }

            const { sku } = action.payload;

            const filteredCart : CartItemType[] = state.cart.filter(item => item.sku !== sku )

            return {...state,cart:[...filteredCart]}
        }
        case REDUCER_ACTION_TASKS.SUBMIT:{
            return { ...state , cart :[] }
        }
        default:
            throw new Error("Suitable Action is Not identified");
    }

}


// ----------------- Creating a Context for Cart operation -------------------



//--------- Functions for providing values for provider --------------
const useCartContext = (initCartState:CartStateType) =>{

    const [state,dispatch] = useReducer(reducer,initCartState)

    const REDUCER_ACTION = useMemo(()=>{
        return REDUCER_ACTION_TASKS
    },[])

    const totalItems = state.cart.reduce((previousValue, cartItem) => {
        return previousValue + cartItem.quantity
    }, 0)

    const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        state.cart.reduce((previousValue, cartItem) => {
            return previousValue + (cartItem.quantity * cartItem.price)
        }, 0)
    )

    const cart = state.cart.sort((a, b) => {
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))
        return itemA - itemB
    })

    return { dispatch, REDUCER_ACTION , totalItems, totalPrice, cart }

}


export type UseCartContextType = ReturnType<typeof useCartContext>

const initCartContextState: UseCartContextType = {
    dispatch: () => { },
    REDUCER_ACTION: REDUCER_ACTION_TASKS,
    totalItems: 0,
    totalPrice: '',
    cart: [],
}

const CartContext = createContext<UseCartContextType>(initCartContextState)

