import React from "react";
import { shallow } from "enzyme";
import SplashScreen from "./SplashScreen";

describe("SplashScreen", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SplashScreen />);
    expect(wrapper).toMatchSnapshot();
  });
});
