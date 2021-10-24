import React from "react";
import { shallow } from "enzyme";
import DrCard from "./DrCard";

describe("DrCard", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DrCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
