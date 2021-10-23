import React from "react";
import { shallow } from "enzyme";
import Doctor from "./Doctor";

describe("Doctor", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Doctor />);
    expect(wrapper).toMatchSnapshot();
  });
});
