import * as React from "react";
import { Theme } from "@material-ui/core";
import { withPureComponent, CssType } from "./with-pure-component";

export const CounterDemo = withPureComponent(
  {
    count: 0
  },
  {
    increase: state => ({
      count: state.count + 1
    }),
    decrease: state => ({
      count: state.count + 1
    })
  },
  (theme: Theme) => {
    const css: CssType = {
      root: {
        display: "block",
        color: "white"
      }
    };

    return {
      root: css.root
    };
  },
  props => {
    return (
      <div className={props.classes.root}>
        <button onClick={props.handlers.increase}>+</button>
        {props.state.count}
        <button onClick={props.handlers.decrease}>-</button>
      </div>
    );
  }
);
