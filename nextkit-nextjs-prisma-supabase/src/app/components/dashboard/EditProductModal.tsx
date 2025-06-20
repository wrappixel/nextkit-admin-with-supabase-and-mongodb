"use client";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  Spinner,
  TextInput
} from "flowbite-react";
import { useEffect, useReducer, useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function EditProductModal({ openModal, setOpenModal, activeProduct }: any) {
  const initalOrderInfo = {
    name: activeProduct.name,
    customer: activeProduct.customer,
    quantity: activeProduct.quantity,
    status: activeProduct.status,
    price: activeProduct.price,
    imageUrl: activeProduct.imageUrl,
  };

  function reducer(orderInfo: any, action: { type: string, payload: string }) {
    switch (action.type) {
      case "SET_NAME": return { ...orderInfo, name: action.payload };
      case "SET_CUSTOMER": return { ...orderInfo, customer: action.payload };
      case "SET_QUANTITY": return { ...orderInfo, quantity: action.payload };
      case "SET_STATUS": return { ...orderInfo, status: action.payload };
      case "SET_PRICE": return { ...orderInfo, price: action.payload };
      case "SET_IMAGE": return { ...orderInfo, imageUrl: action.payload };
      default: return orderInfo;
    }
  }

  const [orderInfo, dispatch] = useReducer(reducer, initalOrderInfo);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch({ type: "SET_NAME", payload: activeProduct.name });
    dispatch({ type: "SET_CUSTOMER", payload: activeProduct.customer });
    dispatch({ type: "SET_QUANTITY", payload: activeProduct.quantity });
    dispatch({ type: "SET_STATUS", payload: activeProduct.status });
    dispatch({ type: "SET_PRICE", payload: activeProduct.price });
    dispatch({ type: "SET_IMAGE", payload: activeProduct.imageUrl });
  }, [activeProduct]);

  async function handleEdit() {
    try {
      const response = await fetch("/api/product", {
        method: "PUT",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...orderInfo, id: activeProduct.id }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Product updated successfully!', {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
          className: "!font-semibold !text-[#00C853]",
        });
      } else {
        toast.error('Modification not allowed in Demo Mode!', {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
          className: "!font-semibold !text-[#EF4444]",
        });
      }
      console.log(result, "Edited result");
      setOpenModal(false);
    } catch (error) {
      console.log(error, "Failed to edit!");
    }
  }

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="lg" className="edit-product" >
      <ModalHeader className="p-4 !text-lg font-medium custom-product-modal border-transparent">
        Update Order
      </ModalHeader>
      <ModalBody className="pt-0">
        <form onSubmit={(e) => {
          e.preventDefault();
          handleEdit();
        }}>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="name" className="font-medium">Product Name</Label>
              <TextInput id="name" value={orderInfo.name} onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })} placeholder="Enter product name" required />
            </div>
            <div>
              <Label htmlFor="customer" className="font-medium">Customer</Label>
              <TextInput id="customer" value={orderInfo.customer} onChange={(e) => dispatch({ type: "SET_CUSTOMER", payload: e.target.value })} placeholder="Enter customer name" required />
            </div>
            <div>
              <Label htmlFor="quantity" className="font-medium">Quantity</Label>
              <TextInput id="quantity" value={orderInfo.quantity} onChange={(e) => dispatch({ type: "SET_QUANTITY", payload: e.target.value })} placeholder="Enter quantity" required />
            </div>
            <div>
              <Label htmlFor="status" className="font-medium">Status</Label>
              <Select id="status" value={orderInfo.status} onChange={(e) => dispatch({ type: "SET_STATUS", payload: e.target.value })} required>
                <option value="shipped">Shipped</option>
                <option value="pending">Pending</option>
                <option value="delivered">Delivered</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="price" className="font-medium">Price</Label>
              <TextInput id="price" value={orderInfo.price} onChange={(e) => dispatch({ type: "SET_PRICE", payload: e.target.value })} placeholder="Enter price" required />
            </div>
            <div>
              <Label htmlFor="imageUrl" className="font-medium">Image URL</Label>
              <TextInput id="imageUrl" value={orderInfo.imageUrl} onChange={(e) => dispatch({ type: "SET_IMAGE", payload: e.target.value })} placeholder="Enter image URL" required />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button color="primary" type="submit" disabled={isLoading} className="w-full mt-6 flex items-center gap-2 disabled:hover:bg-none">
              {isLoading && <Spinner size="sm" />} Update Product
            </Button>
            <Button onClick={() => setOpenModal(false)} disabled={isLoading} color="error" className="w-full mt-6 flex items-center gap-2 disabled:hover:bg-none">
              {isLoading && <Spinner size="sm" />} Close
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
