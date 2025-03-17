import {FC, Dispatch, SetStateAction} from "react";
import {getPaginationText} from "../../../lib/utils"
import {ChevronRight, ChevronLeft} from "lucide-react"





const TableFooter: FC<{pageSize: number; currentPage: number; total: number; hasNextPage: boolean, hasPreviousPage: boolean; fetchNextPage: () => void; fetchPreviousPage: () => void; isPending: boolean; setSearchValue: Dispatch<SetStateAction<string>>}> = ({pageSize, currentPage, total, hasNextPage, fetchNextPage, fetchPreviousPage, isPending, setSearchValue}) => {
    return (
        <section className="table-footer"><p>{getPaginationText(pageSize, currentPage, total)}</p>
        <div className="buttons">
            <button disabled={true} onClick={() => {
                setSearchValue("");
                fetchPreviousPage()
            }}><ChevronLeft /></button>
            <button disabled={!hasNextPage || isPending} onClick={() => {
                fetchNextPage()
                setSearchValue("")
            }
                }><ChevronRight /></button>
        </div>
        </section>
    )
}

export default TableFooter