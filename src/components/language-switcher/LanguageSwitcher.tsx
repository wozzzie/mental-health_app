import { useTranslation } from "next-i18next"
import classes from "./style.module.scss"
import Image from "next/image"
import PageContainer from "../page-container/pageContainer";
import ReactDropdown, { Option } from "react-dropdown";
import { useEffect, useState } from "react";

const LanguageSwitcher = () => {

    const [curLanguage, setCurLanguage] = useState("EN");

    const {i18n, t} = useTranslation();

    useEffect(() => {

    }, []);

    const handleChangeLanguage = (e : Option) => {
        const lang = e.value.toLowerCase();
        if (i18n.languages.includes(lang)) {
            i18n.changeLanguage(lang);
        }
        else {
            throw new Error("missing locale");
        }
    }

    return (
        <ReactDropdown 
        className={classes["dropdown-root"]}
        menuClassName={classes["dropdown-menu"]}
        options={i18n.languages.map(i=>i.toUpperCase())} 
        onChange={handleChangeLanguage} 
        value={curLanguage}
        arrowOpen={<Image src="/up-chevron.png" alt="arrow up" width={20} height={20}/>}
        arrowClosed={<Image src="/down-chevron.png" alt="arrow down" width={20} height={20}/>}
        arrowClassName={classes["dropdown-arrow"]}
        controlClassName={classes["dropdown-control"]}/>
    )
}


export default LanguageSwitcher;