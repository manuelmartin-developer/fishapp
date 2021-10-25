import React from "react";
import { shallow } from "enzyme";
import Options from "./Options";

describe("Options", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Options />);
    expect(wrapper).toMatchSnapshot();
  });
});
