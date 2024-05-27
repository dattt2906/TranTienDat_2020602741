export const generatePlaceholderCard=(column)=>{

    return{
    
        id:`${column.id}-Placehoder-card`,
        columnId:column.id,
        FE_PlaceholderCard:true
    }
    
    }