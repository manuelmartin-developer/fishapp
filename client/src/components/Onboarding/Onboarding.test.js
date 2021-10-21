import React from "react";
import { shallow } from "enzyme";
import Onboarding from "./Onboarding";

describe("Onboarding", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Onboarding />);
    expect(wrapper).toMatchSnapshot();
  });
});
