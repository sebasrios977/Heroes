import { fireEvent, render, screen } from "@testing-library/react";
import { SearchPage } from "../../../src/heroes";
import { MemoryRouter } from "react-router-dom";


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({

    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));


describe('Pruebas en el componente <SearchPage />', () => {
    
    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrarse correctamente con valores por defecto', () => {
        
        const {container} = render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        );
        
        expect(container).toMatchSnapshot();
        
    });
    
    test('Debe de mostrar a Batman y el input con el valor del queryString', () => {
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage/>
            </MemoryRouter>
        );
        
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');
        
        const img = screen.getByRole('img');
        expect(img.src).toContain("/heroes/dc-batman.jpg");

        const divAlert = screen.getByLabelText('alert');
        expect(divAlert.style.display).toBe('none');
    });

    test('Debe de mostrar un error si no se encuentra el heroe', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman2']}>
                <SearchPage/>
            </MemoryRouter>
        );

        expect(screen.getByText('Heroe no encontrado')).toBeTruthy();
    });

    test('Debe de llamar el navigate a la pantalla nueva', () => {
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman2']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {name: 'searchText', value: 'superman'}});
        
        const form = screen.getByLabelText('form');
        fireEvent.submit(form);

        expect(mockedUseNavigate).toHaveBeenCalledWith("?q=superman");
    });
});