import React from "react";
import { shallow } from "enzyme";
import Questions from "./Questions";

describe("Questions", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Questions />);
    expect(wrapper).toMatchSnapshot();
  });
});
