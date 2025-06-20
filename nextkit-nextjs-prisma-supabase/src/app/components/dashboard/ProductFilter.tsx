"use client"
import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Select, Spinner, Table, TextInput } from "flowbite-react"
import { useEffect, useReducer, useState } from "react";

export default function ProductFilter({ openModal, setOpenModal , setAllproducts , allproducts , fixedProducts}: any) {

   const [isLoading , setIsLoading] = useState(false);
   const [status , setStatus] = useState("All");
   function handleFilterProduct(){
        if(status == "All"){
            setAllproducts(fixedProducts.slice(0,4))
        }else{
            const modifiedProducts = fixedProducts.filter((item:any) => item.status === status);
            setAllproducts(modifiedProducts);
        }
   }
    useEffect(() => {
        handleFilterProduct()
    },[status])
    return (
        <>
            <Modal show={openModal} onClose={() => setOpenModal(false)} size="lg" >
                <ModalHeader className="p-4 !text-lg font-medium custom-product-modal border-transparent" >Filter Order</ModalHeader>
                <ModalBody className="pt-0" >
                    <form action="" onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                        <div className="flex flex-col gap-4">
                            <div className="mt-0">
                                <div className="mb-2 block">
                                    <Label htmlFor="status" className="font-medium">Filter By Status</Label>
                                </div>
                            <Select id="countries"  required className="select-md" value={status} onChange={(e) => setStatus(e.target.value)}  > 
                                <option value="All" >All</option>
                                <option value="shipped" >Shipped</option>
                                <option value="pending" >Pending</option>
                                <option value="delivered" >Delivered</option>
                                </Select>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type="submit" disabled={isLoading} color={"primary"} className="w-full mt-6 flex items-center gap-2 disabled:hover:bg-none" >
                          {isLoading ? <Spinner aria-label="Info spinner example" size="sm" /> : null}
                           Filter Product
                        </Button>
                            <Button onClick={() => setOpenModal(false)} disabled={isLoading} color={"error"} className="w-full mt-6 flex items-center gap-2 disabled:hover:bg-none" >
                          {isLoading ? <Spinner aria-label="Info spinner example" size="sm" /> : null}
                           Close
                        </Button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    )
}