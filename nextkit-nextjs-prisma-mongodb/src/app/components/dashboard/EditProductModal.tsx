"use client"
import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Select, Spinner, Table, TextInput } from "flowbite-react"
import { useEffect, useReducer, useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function EditProductModal({ openModal, setOpenModal , activeProduct }: any) {
    const initalOrderInfo = { 
    name: activeProduct.name,
    customer: activeProduct.customer,
    quantity: activeProduct.quantity,
    status: activeProduct.status,
    price: activeProduct.price,
    imageUrl: activeProduct.imageUrl,
}
    function reducer(orderInfo: any, action: { type: string, payload: string }) {
        switch (action.type) {
            case "SET_NAME":
                return { ...orderInfo, name: action.payload };
                break;
            case "SET_CUSTOMER":
                return { ...orderInfo, customer: action.payload };
                break;
            case "SET_QUANTITY":
                return { ...orderInfo, quantity: action.payload };
                break;
            case "SET_STATUS":
                return { ...orderInfo, status: action.payload };
                break;
            case "SET_PRICE":
                return { ...orderInfo, price: action.payload };
                break;
            case "SET_IMAGE":
                return { ...orderInfo, imageUrl: action.payload };
                break;
            default:
                return orderInfo
        }
    }
    const [orderInfo, dispatch] = useReducer(reducer, initalOrderInfo);
    const [isLoading , setIsLoading] = useState(false);
    useEffect(() => {
      dispatch({ type: "SET_NAME", payload: activeProduct.name });
      dispatch({ type: "SET_CUSTOMER", payload: activeProduct.customer });
      dispatch({ type: "SET_QUANTITY", payload: activeProduct.quantity });
      dispatch({ type: "SET_STATUS", payload: activeProduct.status });
      dispatch({ type: "SET_PRICE", payload: activeProduct.price });
      dispatch({ type: "SET_IMAGE", payload: activeProduct.imageUrl });
    },[activeProduct]);

      async function handleEdit() {
    try {
      const response = await fetch("/api/product", {
        method: "PUT",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({...orderInfo , id:activeProduct.id})
      });
      if (response.ok) {
        toast.success('Product updated successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          className: "!font-semibold !font-inherit !text-[#00C853]",
        });
      } else {
        toast.error('Modification not allowed in Demo Mode!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          className: "!font-semibold !font-inherit !text-[#EF4444]",
        });
      }
      const result = await response.json();
      console.log(result, "Edited result");
      setOpenModal(false);
    } catch (error) {
      console.log(error, "Failed to edit!");
    }
  }
    
    return (
        <>
            <Modal show={openModal} onClose={() => setOpenModal(false)} size="lg" >
                <ModalHeader className="p-4 !text-lg font-medium custom-product-modal" >Update Order</ModalHeader>
                <ModalBody className="pt-0" >
                    <form action="" onSubmit={(e) => {
                        e.preventDefault();
                        handleEdit()
                    }}>
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Product Name" className="font-medium" />
                                </div>
                                <TextInput id="name" value={orderInfo.name} onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })} type="text" className="form-control" placeholder="Enter product name" required />
                            </div>
                            <div className="mt-0">
                                <div className="mb-2 block">
                                    <Label htmlFor="customer" value="Customer" className="font-medium" />
                                </div>
                                <TextInput value={orderInfo.customer} onChange={(e) => dispatch({ type: "SET_CUSTOMER", payload: e.target.value })} id="customer" type="text" className="form-control" placeholder="Enter customer name" required />
                            </div>
                            <div className="mt-0">
                                <div className="mb-2 block">
                                    <Label htmlFor="quantity" value="Quantity" className="font-medium" />
                                </div>
                                <TextInput value={orderInfo.quantity} onChange={(e) => dispatch({ type: "SET_QUANTITY", payload: e.target.value })} id="quantity" type="text" className="form-control" placeholder="Enter quantity" required />
                            </div>
                            <div className="mt-0">
                                <div className="mb-2 block">
                                    <Label htmlFor="status" value="Status" className="font-medium" />
                                </div>
                            <Select id="countries" onChange={(e) => dispatch({ type: "SET_STATUS", payload: e.target.value })} required className="select-md" value={orderInfo.status} > 
                                <option value="shipped" >Shipped</option>
                                <option value="pending" >Pending</option>
                                <option value="delivered" >Delivered</option>
                                </Select>
                            </div>
                            <div className="mt-0">
                                <div className="mb-2 block">
                                    <Label htmlFor="price" value="Price" className="font-medium" />
                                </div>
                                <TextInput value={orderInfo.price} onChange={(e) => dispatch({ type: "SET_PRICE", payload: e.target.value })} id="price" type="text" className="form-control" placeholder="Enter price" required />
                            </div>
                            <div className="mt-0">
                                <div className="mb-2 block">
                                    <Label htmlFor="imageUrl" value="imageUrl" className="font-medium" />
                                </div>
                                <TextInput value={orderInfo.imageUrl} onChange={(e) => dispatch({ type: "SET_IMAGE", payload: e.target.value })} id="imageUrl" type="text" className="form-control" placeholder="Enter imageUrl" required />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type="submit" disabled={isLoading} color={"primary"} className="w-full mt-6 flex items-center gap-2 disabled:hover:bg-none" >
                          {isLoading ? <Spinner aria-label="Info spinner example" size="sm" /> : null}
                           Update Product
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