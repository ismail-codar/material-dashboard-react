import { Theme } from "@material-ui/core";
import { EventHandler, SyntheticEvent, ClassType } from "react";

import { EventEmitter } from "./ee";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

export type ComponentStateType<S> = Partial<S> | Promise<Partial<S>>;

export type ViewStylesType<C> = (
  theme: Theme
) => { [key in keyof C]: CSSProperties };

export type ComponentType<S, H, C> = S & {
  eventEmitter?: EventEmitter<any>;
} & IBaseProps<S, H, C>;

export interface IBaseProps<S, H, C> {
  ref?: (dom) => void;
  signals?: EventEmitter<any>;
  classes?: C;
  theme?: Theme;
  children?;
  state?: S;
  $load?: (state: S) => Promise<Partial<S>>;
  handlers?: H;
}

export type HandlerType<S, H> = {
  [key in keyof H]: (state: S, ...args) => Partial<S> | Promise<Partial<S>>
};

export const createStyles = <C>(
  arg: (theme: Theme) => { [key in keyof C]: CSSProperties }
) => {
  return (arg as any) as { [key in keyof ReturnType<typeof arg>]: string };
};
