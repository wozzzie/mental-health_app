import { useTranslation } from "next-i18next"
import classes from "./style.module.scss"
import Image from "next/image"
import PageContainer from "../page-container/pageContainer";


const Home = () => {

    const { t } = useTranslation();

    return (
        <>
        
            <header className={classes["main-header"]}>
                <PageContainer flex classes={classes["container"]}>
                    <div className={classes["main-header-text"]}>
                        <h1 className={classes["main-header-text__title"]}>{t("home.title")}</h1>
                        <div className={classes["main-header-text__description"]}>{t("home.subtitle")}</div>
                    </div>
                    <Image src="/Rectangle.png" alt="rectangle" className={classes["main-header__img"]} width={370} height={370}/>
                </PageContainer>
            </header>

        </>
    )
}


export default Home;