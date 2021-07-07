import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("Test for blog creation", () => {
  const handleAddToBlog = jest.fn();

  const component = render(<BlogForm handleAddToBlog={handleAddToBlog} />);

  const input = component.container.querySelector("input");
  const form = component.container.querySelector("form");

  fireEvent.change(input, {
    target: { value: "testing of forms could be easier" },
  });
  fireEvent.submit(form);

  expect(handleAddToBlog.mock.calls).toHaveLength(1);
  expect(handleAddToBlog.mock.calls[0][0].title).toBe(
    "testing of forms could be easier"
  );
});
