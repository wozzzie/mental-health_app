import React from "react";
import styles from "./style.module.scss";

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => (
  <div className={`${styles.skeleton} ${className}`}></div>
);

export default Skeleton;
