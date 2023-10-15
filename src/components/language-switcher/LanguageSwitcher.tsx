import { useTranslation } from "next-i18next"
import classes from "./style.module.scss"
import Image from "next/image"
import PageContainer from "../page-container/pageContainer";
import ReactDropdown from "react-dropdown";
import { useEffect, useState } from "react";

const LanguageSwitcher = () => {

    const languages = ["EN", "RU"];

    const [curLanguage, setCurLanguage] = useState("EN");

    const {i18n} = useTranslation();

    const handleChangeLanguage = (e) => {
        i18n.changeLanguage(e.label.toLowerCase());
    }

    return (
        <ReactDropdown 
        className={classes["dropdown-root"]}
        menuClassName={classes["dropdown-menu"]}
        options={languages} 
        onChange={handleChangeLanguage} 
        value={curLanguage}
        arrowOpen={<Image src="/up-chevron.png" alt="arrow up" width={20} height={20}/>}
        arrowClosed={<Image src="/down-chevron.png" alt="arrow down" width={20} height={20}/>}
        arrowClassName={classes["dropdown-arrow"]}
        controlClassName={classes["dropdown-control"]}/>
    )
}


export default LanguageSwitcher;