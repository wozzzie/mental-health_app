import styles from "./style.module.scss";

type PageContainerProps = {
  children: React.ReactNode;
};

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default PageContainer;
