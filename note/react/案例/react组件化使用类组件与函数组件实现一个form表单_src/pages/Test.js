/*
 * @Author: mrzou
 * @Date: 2021-06-27 00:06:47
 * @LastEditors: mrzou
 * @LastEditTime: 2021-06-27 00:41:15
 * @Description: file content
 */

import React, { useContext, Component } from "react";
export const ThemeContext = React.createContext({themeColor: 'pink'});
export const UserContext = React.createContext();

export function UseContextPage(props) {
  const themeContext = useContext(ThemeContext);
  const {themeColor, mi} = themeContext;
  const userContext = useContext(UserContext);
  console.log(themeColor, 'xxxx')
  return (
    <div className="border">
      <h3 className={themeColor}>UseContextPage {themeColor} {mi}</h3>
      <p>{userContext.name}{userContext.mi}</p>
    </div>
  );
}

export default class ContextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        themeColor: "red33"
      },
      user: {
        name: "xiaoming",
        mi: '小米呀'
      }
    };
  }

  changeColor = () => {
    const {themeColor} = this.state.theme;
    console.log(themeColor, 'ggggg')
    this.setState({
      theme: {
        themeColor: themeColor === "red" ? "green" : "red"
      }
    });
  };

  render() {
    const {theme, user} = this.state;
    return (
      <>
        <UserContext.Provider value={user}>
          <ThemeContext.Provider value={theme}>
                <UseContextPage />
          </ThemeContext.Provider>
        </UserContext.Provider>
        <button onClick={this.changeColor}>change color</button>
      </>
    );
  }
}