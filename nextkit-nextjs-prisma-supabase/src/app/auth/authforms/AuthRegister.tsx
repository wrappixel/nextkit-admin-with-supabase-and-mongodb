
"use client"
import { Alert, Button, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import AuthContext from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";


const AuthRegister = () => {

  const [email, setEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();
  const { signup }: any = useContext(AuthContext);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signup(email, password, userName);
      router.push("/auth/login");
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
      <form className="mt-6" onSubmit={handleRegister}>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="email" className="font-semibold">Name</Label>
          </div>
          <TextInput
            id="name"
            type="text"
            sizing="md"
            className="form-control"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}

          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="emadd" className="font-semibold" >Email Address</Label>
          </div>
          <TextInput
            id="emadd"
            type="text"
            sizing="md"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
        </div>
        <div className="mb-6">
          <div className="mb-2 block">
            <Label htmlFor="userpwd" className="font-semibold">Password</Label>
          </div>
          <TextInput
            id="userpwd"
            type="password"
            sizing="md"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
        </div>
        <Button color={'primary'} type="submit" className="w-full rounded-md">Sign Up</Button>
      </form>
    </>
  )
}

export default AuthRegister
