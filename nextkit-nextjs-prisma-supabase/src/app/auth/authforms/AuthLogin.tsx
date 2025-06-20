"use client"

import { Icon } from "@iconify/react/dist/iconify.js";
import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/app/context/AuthContext";


const AuthLogin = () => {


  const [email, setEmail] = useState<string>("admin@gmail.com");
  const [password, setPassword] = useState<string>("123456");
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const { signin } = useContext(AuthContext);


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await signin(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      {error ? (
        <div className="mt-4">
          <Alert
            color={"lighterror"}
            icon={() => (
              <Icon
                icon="solar:info-circle-outline"
                className="me-3"
                height={20}
              />
            )}
          >
            {error}
          </Alert>
        </div>
      ) : (
        ""
      )}
      <form className="mt-2" onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="Email">Email</Label>
          </div>
          <TextInput
            id="Email"
            type="text"
            sizing="md"
            value={email}
            className={`form-control ${error !== "" ? 'border border-error rounded-md' : ''}`}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="userpwd">Password</Label>
          </div>
          <TextInput
            id="userpwd"
            type="password"
            sizing="md"
            className={`form-control ${error !== "" ? 'border border-error rounded-md' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between my-5">
          <div className="flex items-center gap-2">
            <Checkbox color="primary" id="accept" className="checkbox" />
            <Label
              htmlFor="accept"
              className=" font-normal cursor-pointer"
            >
              Remeber this Device
            </Label>
          </div>
        </div>
        <Button color={"primary"} type="submit" className="bg-primary hover:bg-primaryemphasis text-white rounded-md w-full">
          Sign in
        </Button>
      </form>

    </>
  );
};

export default AuthLogin;
