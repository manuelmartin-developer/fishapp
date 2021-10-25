import React from "react";
import { shallow } from "enzyme";
import FamilyBook from "./familyBook";

describe("FamilyBook", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<FamilyBook />);
    expect(wrapper).toMatchSnapshot();
  });
});
