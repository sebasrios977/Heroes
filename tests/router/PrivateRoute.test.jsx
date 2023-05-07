import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { render, screen } from "@testing-library/react";

describe('Pruebas en <PrivateRoute />', () => {
    
    test('Debe de mostrar el children si esta autenticado', () => {
        
        Storage.prototype.setItem = jest.fn(); // Es la prueba del localstorage

        const contextValue = {
            logged: true,
            user: {
                name: 'Rios',
                id: 'ABC',
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Pagina Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Pagina Privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/search?q=batman");
    });
});