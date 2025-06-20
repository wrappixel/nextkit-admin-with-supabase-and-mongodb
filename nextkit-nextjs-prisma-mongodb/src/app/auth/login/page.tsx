import { Login } from "@/app/components/auth/login"
import { Bounce, ToastContainer } from "react-toastify";

const page = () => {
    return <>
        <Login />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
    </>
}

export default page;