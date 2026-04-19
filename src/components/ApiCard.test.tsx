import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ApiCard from "./ApiCard";

describe("ApiCard Component", () => {
  const mockProps = {
    method: "GET" as const,
    path: "/api/users",
    description: "Get all users",
    responseCode: '{"users": []}',
  };

  it("should render the API method badge", () => {
    render(<ApiCard {...mockProps} />);
    expect(screen.getByText("GET")).toBeInTheDocument();
  });

  it("should render the API path", () => {
    render(<ApiCard {...mockProps} />);
    expect(screen.getByText("/api/users")).toBeInTheDocument();
  });

  it("should render the API description", () => {
    render(<ApiCard {...mockProps} />);
    expect(screen.getByText("Get all users")).toBeInTheDocument();
  });

  it("should expand and show response code when clicked", async () => {
    render(<ApiCard {...mockProps} />);

    const responseCode = '{"users": []}';
    expect(screen.queryByText(responseCode)).not.toBeInTheDocument();

    const card = screen.getByText("/api/users").closest(
      "div"
    ) as HTMLElement;
    fireEvent.click(card);

    await waitFor(() => {
      expect(screen.getByText(responseCode)).toBeInTheDocument();
    });
  });

  it("should support different HTTP methods", () => {
    const methods: Array<"GET" | "POST" | "PUT" | "DELETE"> = [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ];

    methods.forEach((method) => {
      const { unmount } = render(
        <ApiCard
          {...mockProps}
          method={method}
          path={`/api/endpoint-${method}`}
        />
      );
      expect(screen.getByText(method)).toBeInTheDocument();
      unmount();
    });
  });

  it("should collapse when clicked again", async () => {
    render(<ApiCard {...mockProps} />);

    const card = screen.getByText("/api/users").closest(
      "div"
    ) as HTMLElement;

    // Expand
    fireEvent.click(card);
    await waitFor(() => {
      expect(screen.getByText(mockProps.responseCode)).toBeInTheDocument();
    });

    // Collapse
    fireEvent.click(card);
    await waitFor(() => {
      expect(screen.queryByText("json")).not.toBeInTheDocument();
    });
  });
});
