import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";

describe("Button", () => {
	it("renders with default variant", () => {
		render(<Button>Click me</Button>);
		expect(screen.getByRole("button", { name: "Click me" })).toBeDefined();
	});

	it("renders with custom className", () => {
		render(<Button className="custom-class">Test</Button>);
		const button = screen.getByRole("button");
		expect(button.className).toContain("custom-class");
	});

	it("renders as disabled", () => {
		render(<Button disabled>Disabled</Button>);
		const button = screen.getByRole("button");
		expect(button).toHaveProperty("disabled", true);
	});
});
