import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Home from "./Home";
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from "react-router-dom";


describe('Home page', () => {
    it('text control of buttons', () => {
        render(<BrowserRouter><Home /></BrowserRouter>);
        const buttons = screen.getAllByRole('button');
        const buttonTexts = buttons.map(button => button.textContent);
        expect(buttonTexts).toEqual(expect.arrayContaining(['PLAY', 'GUID', 'SOURCE CODE']));
    });

    it('pressing the play button should go to the register route', () => {
        test('register button navigates to register page when clicked', () => {
            render(
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            );

            const registerButton = screen.getByRole('button', { name: 'PLAY' });
            userEvent.click(registerButton);

            expect(window.location.pathname).toBe('/register');
        })
    })
});
