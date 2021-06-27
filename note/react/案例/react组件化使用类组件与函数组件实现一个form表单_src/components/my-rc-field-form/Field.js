import React, {Component} from "react";
import FieldContext from "./FieldContext";

// 3、子组件消费value
export default class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    // 注册field
    this.unregisterField = this.context.registerField(this);
  }

  // 取消注册
  componentWillUnmount() {
    this.unregisterField();
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = () => {
    const {name} = this.props;
    return {
      value: this.context.getFieldValue(name), // getFieldValue(name)
      onChange: (e) => {
        const newValue = e.target.value;
        this.context.setFieldsValue({[name]: newValue});
      },
    };
  };
  render() {
    console.log("render"); //sy-log
    const returnChildNode = React.cloneElement(
      this.props.children,
      this.getControlled()
    );
    return returnChildNode;
  }
}
