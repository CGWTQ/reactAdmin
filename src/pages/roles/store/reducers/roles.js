import immutable from "immutable"

const initState = immutable.fromJS({
    rolesList:{}
})

const cartReducer = (state = initState, action) => {
    switch(action.type)
    {
        case "GETDATE":
            return state.set('rolesList',action.playload.data)
            console.log(state)
        // case "ADDROLE":
        //     return state.updateIn([action.playload.index,'num'],val=>val+1)
            
        // case "CART_CUT":
        //     return state.updateIn([action.playload.index,'num'],val=>val-1)
            
        // case "CART_UPDATA":
        //     return state.updateIn([action.playload.index,'num'],()=>parseFloat(action.playload.num))
            
        default:
            break;
    }
    return state
}

export default cartReducer