import { authReducer } from "../../../src/auth/context/AuthReducer";
import { types } from "../../../src/auth/types/types";

describe('Pruebas en el AuthReducer', () => {
    
    const initialState = {
        logged: false,
    }

    test('Debe de retornar el estado inicial', () => {
        
        const newState = authReducer(initialState, {});
        expect(newState).toBe(initialState);
    });

    test('Debe de login llamar el login autenticar y establecer el user', () => {

        const user = {
            id: 'ABC',
            name: 'Sebastian',
        }

        const action = {
            type: types.login,
            payload: user,
        }

        const newState = authReducer({logged: false}, action);
        expect(newState).toEqual({
            logged: true,
            user: action.payload,
        });
    });

    test('Debe de login llamar el login autenticar y establecer el user', () => {

        const action = {
            type: types.logout,
        }

        const newState = authReducer({logged: true}, action);
        expect(newState.logged).toBeFalsy();
    });
});