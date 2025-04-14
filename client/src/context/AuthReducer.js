


const AuthReducer=(state,action)=>{
    switch(action.type){
        case "LOGIN_START":
            return{
                user:null,
                isFetching:true,
                error:false,
            };
        case "LOGOUT":
            return{
                user:null,
                isFetching:false,
                error:false,
            };
        case "LOGIN_SUCCESS":
            return{
                user:action.payload,
                isFetching:false,
                error:false,
            };
        case "LOGIN_FAILURE":
            return{
                user:null,
                isFetching:false,
                error:action.payload,
            };

       case "FOLLOW":
  return {
    ...state, // This copies the current state object. The spread operator (`...state`) creates a new object with all the properties of the existing state.
    user: {
      ...state.user, // This copies the current user object from the state, ensuring that existing properties of the user are not lost or overwritten.
      following: [
        ...state.user.following, // This copies the current `following` array of the user, preserving any users that are already being followed.
        action.payload, // This adds the `action.payload`, which is the user ID of the person the current user wants to follow, to the end of the `following` array.
      ],
    },
  };

        case "UNFOLLOW":
            return{
                ...state,
                user:{
                    ...state.user,
                    following:state.user.following.filter((following)=> following!==action.payload),
                },
            };

            default:
                return state;
    }
};

export default  AuthReducer;