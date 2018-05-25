import * as React from "react";
import { Theme, withStyles } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

export type CssType = { [key: string]: CSSProperties };
export type ThemedCssType = (theme: Theme) => CssType;

const specialReactProps = ["children", "state", "handlers", "$load"];
export const isPromise = obj => {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
};

export const initComponent = (self, initialState, handlers) => {
  const handlersOut = { $load: null };
  const callback = data => {
    data && self.setState(data);
  };
  //$load in çalışmaması istendiğinde $load={null} verilebilir
  if (self.props.$load !== undefined) handlers.$load = self.props.$load;
  for (var key in handlers) {
    (function(key, handler) {
      if (handler)
        handlersOut[key] = (...args) => {
          const ret = handler(self.state, ...args);
          if (isPromise(ret)) {
            ret.then(data => callback(data));
          } else callback(ret);
        };
    })(key, handlers[key]);
  }

  self.handlers = handlersOut;
  if (self.props.handlers) {
    // props.handlers.xxxMethod çağrılacaksa handlers={{} as any} şeklinde atama gerekir
    Object.assign(self.props.handlers, handlersOut);
  }
  self.state = {
    ...self.state,
    ...(initialState ? initialState(self.props) : null),
    ...self.props
  };
  if (handlersOut.$load) handlersOut.$load(self.state);
};

export const withPureComponent = <
  S,
  H extends {
    [key: string]: (state: S, ...args) => Partial<S> | Promise<Partial<S>>;
  },
  C extends ThemedCssType
>(
  state: S,
  handlers: H,
  classes: C,
  view: (
    props: {
      state: S;
      handlers: { [key in keyof H]: (e) => any };
      classes: { [key in keyof ReturnType<C>]: string };
    }
  ) => any,
  options?: { receiveProps?: any; initialState?: any }
): React.ComponentType<S> => {
  const View = classes
    ? withStyles(classes, {
        withTheme: true,
        name: ""
      })(view)
    : view;

  return class extends React.PureComponent<S, S> {
    classes: any;
    handlers: any;
    state = state;
    constructor(props) {
      super(props);
      initComponent(
        this,
        options && options.initialState,
        Object.assign({}, handlers) //Object. assign ile vermek mutlak gerekli
      );
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
      debugger;
      if (options && options.receiveProps) {
        options.receiveProps(this.state, nextProps);
      } else {
        if (this.props !== nextProps) {
          for (var key in nextProps) {
            if (
              this.props[key] !== nextProps[key] &&
              !specialReactProps.includes(key)
            ) {
              //güncelleme olmuyorsa nextProps[key] object dir ve instance değişmiyordur
              this.state[key] = nextProps[key];
            }
          }
        }
      }
    }
    // static getDerivedStateFromProps(nextProps, prevState) {
    //   // debugger;
    //   // No state update necessary
    //   return null;
    // }
    render() {
      return (
        <View {...this.props} state={this.state} handlers={this.handlers} />
      );
    }
  };
};
