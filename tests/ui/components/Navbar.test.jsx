import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "../../../src/ui/components/Navbar";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({

    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));


describe('Pruebas en <Navbar />', () => {

    const contextValue = {
        logged: true,
        user: {
            name: 'Sebastian',
        },
        onLogoutUser: jest.fn(),
    }

    beforeEach(() => jest.clearAllMocks());


    test('Debe de mostrar el nombre del usuario', () => {
        
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Sebastian')).toBeTruthy();
    });

    test('Debe de llamar a la funcion OnLogout cuando se toca el boton', () => {
        
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter> 
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click( logoutBtn );

        expect( contextValue.onLogoutUser ).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {replace: true})
    });
});