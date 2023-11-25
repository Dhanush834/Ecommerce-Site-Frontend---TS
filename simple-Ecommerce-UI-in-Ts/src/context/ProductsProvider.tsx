import { ReactElement, createContext, useEffect, useState } from "react"

//----------- Types ----------

export type ProductsType = {
    sku:string,
    name:string,
    price:number
}

export type ProductsContextType = {
    products:ProductsType[]
}

type ChildrenType = {
    children : ReactElement | ReactElement[]
}


//--------------- Default Values ---------

// const initProductState : ProductsType[] = []  //Empty array for useState before api call or default value

const initProductState : ProductsType[] = [
    {
        "sku": "item01",
        "name": "Widget",
        "price": 9.99
    },
    {
        "sku": "item02",
        "name": "Premium Widget",
        "price": 19.99
    },
    {
        "sku": "item03",
        "name": "Deluxe Widget",
        "price": 29.99
    }
]

const initContextState :ProductsContextType = { products:[] } // Zero products in cart before calling to api


// ------- Context ----------------

export const ProductsContext = createContext<ProductsContextType>(initContextState) // Create a context of products

export const ProductsProvider = ({children}:ChildrenType) : ReactElement => {


    // use this when u start a server for json app

    // useEffect(()=>{
    //     const fetchProduts = async () : Promise<ProductsType[]> => {

    //         const data = await fetch('http://localhost:4000/products')
    //         .then(res=>{
    //             return res.json();
    //         })
    //         .catch(err=>{
    //             if(err instanceof Error){
    //                 console.log(err);
    //             }
    //         })
    //         console.log(data);
            
    //         return data;
    //     }

    //     fetchProduts()
    //     .then(res=>setProducts(res))  //Products loaded after calling api
    //     .catch(err=>console.log(err));

    // },[])

    const [products,setProducts] = useState(initProductState)

    return(
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )

}

 
