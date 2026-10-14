export default function ReducerFn(state, action) {
    // console.log(state, action)

    switch (action.type) {
        case 'ADD_TO_CART':


            const sameItems = state.cart.find((ele, idx) => {
                return ele.id == action.payload.id
            })

            if (!sameItems) {


                let updatedCart = [...state.cart, { ...action.payload, qty: 1 }]
                const totalPrice = updatedCart.reduce((acc, ele, idx) => {
                    const totalPrice = (ele.price - (ele.price * ele.discountPercentage) / 100)
                        
                    return acc + (totalPrice * ele.qty)
                }, 0)
                console.log(totalPrice);

                return {

                    ...state,
                    cart: updatedCart,
                    totalPrice: totalPrice

                }
            }

            console.log(sameItems);
            console.log(action.payload);



        case 'REMOVE_ELEMENT':
            const Removeable = state.cart.filter((ele, idx) => {

                return ele.id !== action.payload

            })


            const RemainingTotalPrice = Removeable.reduce((acc, ele, idx) => {
                return acc + (ele.price - (ele.price * ele.discountPercentage) / 100)
            }, 0)
            return {
                ...state,
                cart: Removeable,
                totalPrice: RemainingTotalPrice
            }


        case 'DECREMENT':
            console.log(state, action);
            
            let data = state.cart.map((ele , idx)=>{
                if (ele.id == action.payload){

                    if(ele.qty > 1 ){
                        return {
                        ...ele ,  qty: ele.qty-1
                    }
                    }
                    else{
                        return ele
                    }
                    
                    
                }

                return ele
            })

            
            console.log(data);
            
                const totalPrice = data.reduce((acc, ele, idx) => {
                    const totalPrice = (ele.price - (ele.price * ele.discountPercentage) / 100)
                        
                    return acc + (totalPrice * ele.qty)
                }, 0)
            return {
                ...state,
                cart: data,
                totalPrice: totalPrice
                 
            }
          
            case 'INCREMENT': 
            
             console.log(state, action);

            let data2 = state.cart.map((ele , idx)=>{
                if (ele.id == action.payload){

                    if(ele.qty < ele.stock ){
                        return {
                        ...ele ,  qty: ele.qty+1
                    }
                    }
                    else{
                        return ele
                    }   
                }

                return ele
            })
            const totalPrice2 = data2.reduce((acc, ele, idx) => {
                    const totalPrice2 = (ele.price - (ele.price * ele.discountPercentage) / 100)
                        
                    return acc + (totalPrice2 * ele.qty)
                }, 0)
            return {
                ...state,
                cart: data2,
                totalPrice: totalPrice2
                 
            }

            console.log(data2);
            

            return {
                ...state,
                cart: data2
            }


        default:
            return state
    }
}
