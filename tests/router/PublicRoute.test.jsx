import { render, screen } from "@testing-library/react";
import { PublicRoute } from "../../src/router/PublicRoute";
import { AuthContext } from "../../src/auth";
import { MemoryRouter, Routes, Route } from "react-router-dom";

describe('Pruebas en el componente <PublicRoute />', () => {
    

    test('Si no esta autenticado, debe de mostrar el children', () => {
        
        const contextValue = {
            logged: false,
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta Publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta Publica')).toBeTruthy();
    });

    test('Si esta autenticado, no debe de mostrar el children', () => {
        
        const contextValue = {
            logged: true,
            user: {
                name: 'Rios',
                id: 'ABC',
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path='/login' element={
                            <PublicRoute>
                                <h1>Ruta Publica</h1>
                            </PublicRoute>
                        } />
                        <Route path='/marvel' element={<h1>Pagina Marvel</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Pagina Marvel')).toBeTruthy();
    });
});