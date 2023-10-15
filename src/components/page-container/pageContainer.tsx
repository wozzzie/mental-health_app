import styles from "./style.module.scss";

type PageContainerProps = {
  children: React.ReactNode;
  flex?: boolean;
  classes?:string;
};

const PageContainer: React.FC<PageContainerProps> = ({ children, flex, classes }) => {
  return <div className={styles.container + ' ' + (flex ? styles["container-flex"] : "") + " " + classes}>{children}</div>;
};

export default PageContainer;
