import {FC} from "react";


const ErrorComp: FC<{error: Error | null; refetch: () => void}> = ({error, refetch}) => {
    const errorMessage = error?.message || "Unknown error occured";
    return (
        <div  style={{width: "100%", display: "flex", flexDirection: "column", paddingTop: "16px", gap: 4, alignItems: "center"}}>
        <h2
          className={` w-full text-center font-bold`}
          style={{width: "100%",  textAlign: "center", fontWeight: "bold"}}
        >
          {errorMessage}
        </h2>
        <button  onClick={() => refetch()} className="refetch-button">Retry</button>
      </div>
    )
}
export default ErrorComp