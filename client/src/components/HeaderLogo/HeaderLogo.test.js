import React from "react";
import { shallow } from "enzyme";
import HeaderLogo from "./HeaderLogo";

describe("HeaderLogo", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<HeaderLogo />);
    expect(wrapper).toMatchSnapshot();
  });
});
