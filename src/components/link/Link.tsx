import styles from "./style.module.scss"
import Image from "next/image"
import PageContainer from "../page-container/pageContainer";
import ReactDropdown from "react-dropdown";
import React from "react"

type LinkProps = {
    href: string;
    img?: {
        src:string;
        alt:string;
        w:number;
        h:number;
    }
    text?:string
    classes?: string

}

const Link = ({href,img,text, classes} : LinkProps) => {
    

    return (
        <a href={href} className={styles["landing-link"] +" " + classes}>
            {img ? (
                <Image src={img.src} alt={img.alt} width={img.w} height={img.h} className={styles["landing-link__image"]}/>
            ) : <></>}
            <span>{text}</span>
        </a>
    )
}


export default Link;