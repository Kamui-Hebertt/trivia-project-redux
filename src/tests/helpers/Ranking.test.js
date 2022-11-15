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
   
})