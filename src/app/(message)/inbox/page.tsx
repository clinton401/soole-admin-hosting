"use client"
import {FC, useEffect} from "react";
import {useRouter} from "next/navigation"
import LoaderComp from "../../components/LoaderComp";


const InboxPage: FC = () => {
    const {push} = useRouter();
    useEffect(() => {
        push("/inbox/all")
    }, [])
    return <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <LoaderComp />
    </div>
}

export default InboxPage