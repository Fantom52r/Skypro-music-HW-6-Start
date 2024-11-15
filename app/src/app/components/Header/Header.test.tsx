import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import { toast } from "react-toastify";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("Header component", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    localStorage.clear();
  });

  it("should render the header correctly", () => {
    render(<Header />);

    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();

    expect(screen.getByText("Главное")).toBeInTheDocument();
    expect(screen.getByText("Мой плейлист")).toBeInTheDocument();
    expect(screen.getByText("Войти")).toBeInTheDocument();
  });

  it('should navigate to /home?view=all when "Главное" is clicked', () => {
    render(<Header />);

    const mainButton = screen.getByText("Главное");
    fireEvent.click(mainButton);

    expect(mockPush).toHaveBeenCalledWith("/home?view=all");
  });

  it('should show error when trying to access "Мой плейлист" without being authenticated', () => {
    render(<Header />);

    const favoritesButton = screen.getByText("Мой плейлист");
    fireEvent.click(favoritesButton);

    expect(toast.error).toHaveBeenCalledWith(
      "Избранные треки доступны только авторизированным пользователям"
    );
  });

  it('should navigate to /home?view=favorites when "Мой плейлист" is clicked and user is authenticated', () => {
    localStorage.setItem("userName", "testUser");

    render(<Header />);

    const favoritesButton = screen.getByText("Мой плейлист");
    fireEvent.click(favoritesButton);

    expect(mockPush).toHaveBeenCalledWith("/home?view=favorites");
  });

  it('should log out when authenticated user clicks "Выйти"', () => {
    localStorage.setItem("userName", "testUser");

    render(<Header />);

    const logoutButton = screen.getByText("Выйти");
    fireEvent.click(logoutButton);

    expect(localStorage.getItem("userName")).toBe("");
  });

  it('should navigate to /login when "Войти" is clicked and user is not authenticated', () => {
    render(<Header />);

    const loginButton = screen.getByText("Войти");
    fireEvent.click(loginButton);

    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
