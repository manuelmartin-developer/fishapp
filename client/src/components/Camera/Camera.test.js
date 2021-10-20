import React from "react";
import { shallow } from "enzyme";
import Camera from "./Camera";

describe("Camera", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Camera />);
    expect(wrapper).toMatchSnapshot();
  });
});
