import React from "react";
import { shallow } from "enzyme";
import Aquarium from "./Aquarium";

describe("Aquarium", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Aquarium />);
    expect(wrapper).toMatchSnapshot();
  });
});
