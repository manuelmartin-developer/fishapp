import React from "react";
import { shallow } from "enzyme";
import Diagnosis from "./Diagnosis";

describe("Diagnosis", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Diagnosis />);
    expect(wrapper).toMatchSnapshot();
  });
});
