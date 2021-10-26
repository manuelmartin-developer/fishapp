import React from "react";
import { shallow } from "enzyme";
import HeaderOn from "./HeaderOn";

describe("HeaderOn", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<HeaderOn />);
    expect(wrapper).toMatchSnapshot();
  });
});
