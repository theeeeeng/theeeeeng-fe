import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const usePagination = (total: number) => {
    const maxPage = Math.ceil(total / 10);
    const [current, setCurrent] = useState(1);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(1);

    useEffect(() => {
        setEnd(maxPage > 5 ? 5 : maxPage);
    }, [maxPage]);

    useEffect(() => {
        const nextEnd = (start + 4) < maxPage ? start + 4 : maxPage;
        setEnd(nextEnd);
    }, [start]);

    useEffect(() => {
        setStart((Math.floor(current / 5) * 5) + (current % 5 === 0 ? -4 : 1));
    }, [current]);

    return {current, setCurrent, start, setStart, end, setEnd, maxPage};
}