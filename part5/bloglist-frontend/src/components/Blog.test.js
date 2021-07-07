import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog/>", () => {
  let component;
  let mockHandler;
  beforeEach(() => {
    const blog = {
      title: "Hello world",
      author: "author",
      url: "https://github.com",
      user: "12345678",
      likes: 1,
    };
    mockHandler = jest.fn();
    component = render(<Blog blog={blog} onClick={mockHandler} />);
  });
  test("Does its title by default", () => {
    const div = component.container.querySelector(".blog");
    expect(div).toHaveTextContent("Hello world");
    const toggleContent =
      component.container.querySelector(".togglableContent");

    expect(toggleContent).toHaveStyle("display: none");
  });
  test("Blog's url and number of likes ", () => {
    const button = component.getByText("view");
    fireEvent.click(button);
    const toggleContent =
      component.container.querySelector(".togglableContent");
    expect(toggleContent).toHaveStyle("display:block");
    const likes = component.container.querySelector(".likes");
    expect(likes).toHaveTextContent("1");
    const url = component.container.querySelector(".url");
    expect(url).toHaveTextContent("https://github.com");
  });
});
