import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import React from "react";

const page = () => {
  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray md:p-6 p-0 relative w-full break-words">
        <h5 className="card-title">Form</h5>
        <div className="mt-6">
          <div className="grid grid-cols-12 md:gap-6 gap-0">
            <div className="lg:col-span-6 col-span-12">
              <div className="flex  flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Your Name" />
                  </div>
                  <TextInput
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    className="form-control form-rounded-xl"
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email1" value="Your email" />
                  </div>
                  <TextInput
                    id="email1"
                    type="email"
                    placeholder="name@matdash.com"
                    required
                    className="form-control form-rounded-xl"
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password1" value="Your password" />
                  </div>
                  <TextInput
                    id="password1"
                    type="password"
                    required
                    className="form-control form-rounded-xl"
                  />
                </div>
              
              </div>
            </div>
            <div className="lg:col-span-6 col-span-12 md:my-0 my-6">
              <div className="flex  flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Country" />
                  </div>
                  <Select id="countries" required className="select-md">
                    <option>India</option>
                    <option>Canada</option>
                    <option>France</option>
                    <option>Germany</option>
                  </Select>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="State" />
                  </div>
                  <Select id="countries" required className="select-md">
                    <option>Delhi</option>
                    <option>Gujarat</option>
                    <option>Mumbai</option>
                    <option>Chennai</option>
                  </Select>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="City" />
                  </div>
                  <Select id="countries" required className="select-md">
                    <option>Rajkot</option>
                    <option>Ahemedabad</option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="col-span-12 flex gap-3">
              <Button color={'primary'} className="bg-primary hover:bg-primaryemphasis text-white" >Submit</Button>
              <Button color={'error'} className="bg-error hover:bg-erroremphasis text-white" >Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;