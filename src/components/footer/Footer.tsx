import { useTranslation } from "next-i18next"
import classes from "./style.module.scss"
import PageContainer from "../page-container/pageContainer";
import Link from "../link/Link";

const Footer = () => {

    const { t } = useTranslation();

    return (
       <footer className={classes["footer"]}>
            <PageContainer grid classes={classes["container"]}>
                <div className={classes["policy-links"]}>
                    <Link href="#" text={t("footer.about")} classes={classes["footer-link"]}/>
                    <Link href="#" text={t("footer.policy")} classes={classes["footer-link"]}/>
                    <Link href="#" text={t("footer.terms")} classes={classes["footer-link"]}/>
                </div>
                <div className={classes["footer-team-logo"]}>
                    <h2 className={classes["footer-title"]}>{t("footer.title")}</h2>
                    <div className={classes["footer-description"]}>{t("footer.description")}</div>
                </div>
                <div className={classes["contacts"]}>
                    <div className={classes["contacts-title"]}>Contacts</div>
                    <Link href="https://www.upwork.com/freelancers/~012a786fa6b9dc2a12" img={{src:"/upwork.svg", w:30, h: 30, alt:"upwork"}} classes={classes["contacts-link"]}/>
                    <Link href="mailto:hello.webmarvels@gmail.com" img={{src:"/email.svg", w:45, h: 30, alt:"email"}} classes={classes["contacts-link"]}/>
                    <Link href="#" img={{src:"/linkedin.svg", w:45, h: 30, alt:"linkedin"}} classes={classes["contacts-link"]}/>
                </div>
            </PageContainer>
       </footer> 
    )
}


export default Footer;