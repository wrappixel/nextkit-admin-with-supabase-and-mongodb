"use client"
import { Badge, Dropdown, DropdownItem,  Select, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from "flowbite-react"
import CardBox from "../shared/CardBox";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Bounce, toast } from "react-toastify";
import EditProductModal from "./EditProductModal";
import ProductFilter from "./ProductFilter";
import Image from "next/image";

export const ProductPerformance = () => {
  const PerformersData = [
    {
      key: "performerData1",
      name: "UltraSoft Premium Cooling Memory Foam Pillow Set",
      customer: "Mark Johnson",
      quantity: "2",
      status: "pending",
      price: "$120.00"
    },
    {
      key: "performerData2",
      name: "Solar powered desk lamp with sleek metallic finish",
      customer: "Jane Smith",
      quantity: "3",
      status: "shipped",
      price: "$1120.00"
    },
    {
      key: "performerData3",
      name: "Coffee maker with glass and wood finishes",
      customer: "Chris Miller",
      quantity: "1",
      status: "delivered",
      price: "$45.00"
    },
    {
      key: "performerData4",
      name: "Solar powered desk lamp with sleek metallic finish",
      customer: "Jane Smith",
      quantity: "4",
      status: "shipped",
      price: "$75.00"
    },
    {
      key: "performerData5",
      name: "Coffee maker with glass and wood finishes",
      customer: "Chris Miller",
      quantity: "6",
      status: "delivered",
      price: "$35.00",
    },
  ]
  const [allproducts, setAllproducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [fixedProducts, setFixedProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openFilterModal , setFilterModal] = useState(false);
  const [activeProduct , setActiveProduct] = useState();
  const [itemsCount , setItemsCount] = useState(4);
  const [currentpagination , setCurrentPagination] = useState(1);
  async function handleProducts() {
    try {
      const response = await fetch("/api/product");
      const result = await response.json();
      setFixedProducts(result.data);
      setAllproducts(result.data.slice(0,itemsCount));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handleProducts();
  }, [openModal]);

  function handleInput() {
    if (inputValue) {
      const modifiedProducts = allproducts.filter((item: any) => item.name.includes(inputValue));
      setAllproducts(modifiedProducts);
    } else{
      setAllproducts(fixedProducts)
    }
  }

  useEffect(() => {
    handleInput()
  }, [inputValue]);

  function handleRenderedProduct(){
      const products = fixedProducts.slice((currentpagination - 1)*4,4*currentpagination);
      setAllproducts(products)
  }

  useEffect(() => {
    handleRenderedProduct();
  },[currentpagination])


  async function handleDelete() {
    try {
      const response = await fetch("/api/product", {
        method: "DELETE",
        headers: { 'content-type': 'application/json' }
      });
      if (response.ok) {
        toast.success('Product deleted successfully!', {
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
    } catch (error) {
      console.log(error, "Failed to edit!");
    }
  }
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
      <CardBox>
        <div className="mb-6">
          <div className="flex items-center justify-between flex-wrap gap-2" >
            <h5 className="card-title">Total Orders</h5>
           <div className="flex gap-4 flex-wrap">

   <Dropdown label="" dismissOnClick={false} renderTrigger={() => (
                <button  className="px-4 py-1.5 rounded-md bg-lightprimary text-primary font-medium flex items-center gap-2 hover:bg-primary hover:text-white cursor-pointer transition-all" >
             <Icon icon="akar-icons:sort" width={18} height={18} />
             Filter
            </button>
   )}>
      <DropdownItem onClick={() => setStatus("All")} className={`${status=="All" ? 'bg-lightprimary text-primary' :''}`} >All</DropdownItem>
      <DropdownItem onClick={() => setStatus("shipped")} className={`${status=="shipped" ? 'bg-lightprimary text-primary' :''}`} >shipped</DropdownItem>
      <DropdownItem onClick={() => setStatus("pending")} className={`${status=="pending" ? 'bg-lightprimary text-primary' :''}`} >pending</DropdownItem>
      <DropdownItem onClick={() => setStatus("delivered")} className={`${status=="delivered" ? 'bg-lightprimary text-primary' :''}`} >delivered</DropdownItem>
    </Dropdown>
              <div className="relative">
              <TextInput id="email1" onChange={(e) => setInputValue(e.target.value)} value={inputValue} type="text" className="form-control search min-w-60" placeholder="Search order here..." required />
              <span className="absolute top-1/2 start-3 -translate-y-1/2"><Icon icon="lucide:search" width={20} height={20} className="text-muted" /></span>
            </div>
           </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-x-auto border border-border rounded-md">
                <Table>
                  <TableHead className="bg-gray-50" >
                    <TableRow>
                    <TableHeadCell className="text-sm font-semibold">
                      Id
                    </TableHeadCell>
                    <TableHeadCell className="text-sm font-semibold max-w-40">
                      Product
                    </TableHeadCell>
                    <TableHeadCell className="text-sm font-semibold">
                      Customer
                    </TableHeadCell>
                    <TableHeadCell className="text-sm font-semibold">
                      Quantity
                    </TableHeadCell>
                    <TableHeadCell className="text-sm font-semibold">
                      Status
                    </TableHeadCell>
                    <TableHeadCell className="text-sm font-semibold">
                      Price
                    </TableHeadCell>
                    <TableHeadCell className="text-sm font-semibold">
                      Action
                    </TableHeadCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="divide-y divide-border dark:divide-darkborder ">
                    {allproducts && allproducts.map((item: any, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <p className="text-link dark:text-darklink font-medium text-sm w-fit">
                            {index + 1}
                          </p>
                        </TableCell>
                        <TableCell className="md:min-w-auto max-w-[200px]">
                          <div className="flex items-center gap-2" >
                            <Image alt="image" src={item.imageUrl} width={40} height={40} className="rounded-md w-10 h-10 object-cover shrink-0" />
                            <h6 className="text-sm font-semibold mb-1">{item.name}</h6>
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <p className="text-bodytext font-medium dark:text-darklink text-sm w-fit">
                            {item.customer}
                          </p>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <p className="text-bodytext font-medium dark:text-darklink text-sm w-fit">
                            {item.quantity}
                          </p>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {
                            item.status === "delivered" ? <Badge color={`success`} size={'xs'} className={`text-[13px] px-3 rounded-full justify-center py-0.5`} >{item.status}</Badge> : item.status === "shipped" ? <Badge color={`warning`} size={'xs'} className={`text-[13px] px-3 rounded-full justify-center py-0.5`} >{item.status}</Badge> : item.status === "pending" ? <Badge color={`error`} size={'xs'} className={`text-[13px] px-3 rounded-full justify-center py-0.5`} >{item.status}</Badge> : null
                          }
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <p className="dark:text-darklink text-link text-sm font-semibold">
                            {item.price}
                          </p>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Dropdown placement="left-start" label="" dismissOnClick={false} renderTrigger={() => <Icon icon="tabler:dots-vertical" className='text-muted dark:text-darklink hover:text-primary dark:hover:text-primary text-lg shrink-0 cursor-pointer' />}>
                            <DropdownItem onClick={() => {
                              console.log(item,"product");
                              setActiveProduct(item);
                              setOpenModal(true);
                              }}>
                              <div className=" flex gap-2 items-center text-muted dark:text-darklink">
                                <Icon icon="fluent:edit-16-regular" className="text-base" />
                                Edit
                              </div>
                            </DropdownItem>
                            <DropdownItem onClick={handleDelete} >
                              <div className=" flex gap-2 items-center text-muted dark:text-darklink">
                                <Icon icon="fluent:delete-28-regular" className="text-base" />
                                Delete
                              </div>
                            </DropdownItem>
                          </Dropdown>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex items-center justify-end py-4 pt-2 px-6">

                  <div className="flex items-center divide-x border border-border rounded-md">
                    <button onClick={() => {
                      setCurrentPagination((prev) => {
                        if(prev === 1){
                          return prev
                        } else{
                          return prev - 1
                        }
                      })
                    }} disabled={(currentpagination === 1)} className={`py-1.5 px-4 border-border text-sm font-medium hover:bg-lightprimary hover:text-primary ${currentpagination === 1 ? 'bg-gray-100 cursor-not-allowed text-gray-300 hover:!bg-gray-100 hover:!text-gray-300':'cursor-pointer hover:bg-none hover:text-primary'}`}>Previous</button>
                    {Array.from({ length: Math.ceil(fixedProducts?.length/itemsCount) }).map((_,index) => (
                  <button onClick={() => {
                      setCurrentPagination((prev) => {
                        if(prev < Math.ceil(fixedProducts.length/itemsCount)){
                          return prev + 1
                        }else if(prev === 1){
                          return prev
                        }else{
                          return prev - 1
                        }
                      })
                    }} key={index} className={`py-1.5 px-4 text-sm font-medium border-border hover:bg-lightprimary hover:text-primary cursor-pointer ${currentpagination === (index+1) ? 'bg-lightprimary text-primary':null}`}>{index+1}</button>
                    ))}
                    <button onClick={() => {
                      setCurrentPagination((prev) => {
                        if(prev < Math.ceil(fixedProducts.length/itemsCount)){
                          return prev + 1
                        }else{
                          return prev
                        }
                      })
                    }} disabled={currentpagination === Math.ceil(fixedProducts.length/itemsCount)} className={`py-1.5 border-border px-4 text-sm font-medium hover:bg-lightprimary hover:text-primary ${currentpagination === Math.ceil(fixedProducts.length/itemsCount) ? 'bg-gray-100 cursor-not-allowed text-gray-300 hover:!bg-gray-100 hover:!text-gray-300':'cursor-pointer hover:bg-none hover:text-primary'}`}>Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBox>
      {
        activeProduct ? <EditProductModal openModal={openModal} setOpenModal={setOpenModal} activeProduct={activeProduct} />:null
      }
      <ProductFilter openModal={openFilterModal} setOpenModal={setFilterModal} allproducts={allproducts} setAllproducts={setAllproducts} fixedProducts={fixedProducts} />
    </>

  )
}