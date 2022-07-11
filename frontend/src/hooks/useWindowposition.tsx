import { useLayoutEffect, useState } from "react"

const useWindowPosition = (id:string, coef:number) => {
    const [animation, setAnimation] = useState(false);

    useLayoutEffect(() => {
        const upadtePosition = () => {
            const offsetHeight = window.document.getElementById(id)?.offsetHeight;
            if (offsetHeight && (window.pageYOffset > offsetHeight * coef)) {
                setAnimation(true);
            } else {
                setAnimation(false);
            }
        }
        window.addEventListener("scroll", upadtePosition);
        upadtePosition();
        return () => {window.removeEventListener("scroll", upadtePosition)};
    }, [id])
    return animation;
}

export default useWindowPosition;