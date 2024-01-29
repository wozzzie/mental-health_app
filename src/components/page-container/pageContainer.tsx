import styles from "./style.module.scss";

type PageContainerProps = {
  children: React.ReactNode;
  flex?: boolean;
  classes?: string;
  grid?: boolean;
};

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  flex,
  classes,
  grid,
}) => {
  if (flex && grid) {
    throw new Error("either choose flex or grid");
  }
  return (
    <div
      className={
        styles.container +
        " " +
        (flex ? styles["container-flex"] : "") +
        " " +
        (classes ? classes : "") +
        " " +
        (grid ? styles["container-grid"] : "")
      }
    >
      {children}
    </div>
  );
};

export default PageContainer;
