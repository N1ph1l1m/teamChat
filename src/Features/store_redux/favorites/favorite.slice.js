import { createSlice } from "@reduxjs/toolkit"

const initialState = []

export const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers:{
            addToFavorites:(state,{payload:{recipe}})=>{
                const isExists = state.some(r=> r.id === recipe.id);
                if(isExists)
                    state = state.filter(r => r.id !== recipe.id)
                else
                state.push(recipe)
            }
    }
})
export  const {action, reducer} = favoriteSlice
