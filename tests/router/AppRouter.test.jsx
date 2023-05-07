import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router/AppRouter";

describe('Pruebas en el componente <AppRouter />', () => {
    
    test('Debe de mostrar el login si no esta autenticado', () => {
        
        const contextValue = {
            logged: false,
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        // screen.debug();

        expect(screen.getAllByText('Login').length).toBe(2);
    });

    test('Debe de mostrar que el componente de Marvel si esta autenticado', () => {
        
        const contextValue = {
            logged: true,
            user: {
                name: 'Rios',
                id: 'ABC',
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(10);
    });
});