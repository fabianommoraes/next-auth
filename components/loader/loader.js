import classes from "./loader.module.css";

function Loader() {
  return (
    <div className={classes.backdrop}>
      <span className={classes.loader} />
    </div>
  );
}

export default Loader;
