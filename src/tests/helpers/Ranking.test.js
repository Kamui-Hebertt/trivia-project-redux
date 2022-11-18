import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';


describe('testando tela de ranking', ()=> {
    test('testando título e botões na tela', ()=>{
       const {history} =  renderWithRouterAndRedux(<App/ >);
        act(()=>{history.push('/ranking');})
       const title = screen.getByText(/Página de Ranking/i);
       const btn = screen.getByTestId('btn-go-home');
       expect(title).toBeInTheDocument();
        expect(btn).toBeInTheDocument();
        userEvent.click(btn);
        const{ location : { pathname}} = history;
        expect(pathname).toBe('/');
    })
    test('testando Ranking',()=>{
       const {history}  = renderWithRouterAndRedux(<App />);
        const inputEmail = screen.getByTestId('input-gravatar-email');
        const inputName = screen.getByTestId('input-player-name');
        const buttonPlay3 = screen.getByRole('button',{name : /Play/i} );
        userEvent.type(inputEmail, 'example@gmail.com');
        userEvent.type(inputName, 'Ueda');
        userEvent.click(buttonPlay3);
        act(()=>{history.push('/ranking');})
        const email = screen.getByText(/example@gmail.com/i)
        expect(email).toBeInTheDocument();
        

    } )
   
})