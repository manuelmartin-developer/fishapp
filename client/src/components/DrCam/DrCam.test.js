import React from "react";
import { shallow } from "enzyme";
import DrCam from "./DrCam";

describe("DrCam", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DrCam />);
    expect(wrapper).toMatchSnapshot();
  });
});
