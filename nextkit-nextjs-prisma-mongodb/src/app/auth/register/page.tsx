import { Register } from "@/app/components/auth/register";
import { Bounce, ToastContainer } from "react-toastify";


const page = () => {
    return <>
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
        <Register />
    </>
}

export default page;