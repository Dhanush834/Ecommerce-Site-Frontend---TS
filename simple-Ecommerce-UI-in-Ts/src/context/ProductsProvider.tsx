import { ReactElement, createContext, useEffect, useState } from "react"

//----------- Types ----------

type ProductsType = {
    sku:string,
    name:string,
    price:number
}

type ProductsContextType = {
    products:ProductsType[]
}

type ChildrenType = {
    children : ReactElement | ReactElement[]
}


//--------------- Default Values ---------

const initProductState : ProductsType[] = []  //Empty array for useState before api call or default value

const initContextState :ProductsContextType = { products:[] } // Zero products in cart before calling to api


// ------- Context ----------------

const ProductsContext = createContext<ProductsContextType>(initContextState) // Create a context of products

export const ProductsProvider = ({children}:ChildrenType) : ReactElement => {

    useEffect(()=>{
        const fetchProduts = async () : Promise<ProductsType[]> => {

            const data = await fetch('http://localhost:4000/products')
            .then(res=>{
                return res.json();
            })
            .catch(err=>{
                if(err instanceof Error){
                    console.log(err);
                }
            })
            console.log(data);
            
            return data;
        }

        fetchProduts()
        .then(res=>setProducts(res))  //Products loaded after calling api
        .catch(err=>console.log(err));

    },[])

    const [products,setProducts] = useState(initProductState)

    return(
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )

}

 
