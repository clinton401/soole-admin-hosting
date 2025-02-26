import { toast, Bounce } from "react-toastify";


const useToast = (text: string, type: "info" | "success" | "warn" | "error" | "default" = "default"): void => {
    if (type === "default") {
        toast(text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        return;
    }
    toast[type](text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

}


export default useToast;