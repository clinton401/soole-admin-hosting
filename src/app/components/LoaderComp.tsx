import {FC} from "react";
import {Loader} from "lucide-react";

const LoaderComp:FC =() => {
    return (
         <div className="loader-container"
              >
                <Loader className="custom-loader large-loader" />
              </div>
    )
}

export default LoaderComp;