import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Feedback from '../pages/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';


describe('Testando a página de feedbacks(página final)', ()=>{
    test('testando botões', ()=>{
        renderWithRouterAndRedux(<Feedback />)
        const rankingBtn = screen.getByRole('button', { name : /Ranking/i})
        expect(rankingBtn).toBeInTheDocument()

    })
    test('verifica se ao clicar em ranking é redirecionado para página de ranking',()=>{
        const { history } = renderWithRouterAndRedux(<App />);
        act(()=>{history.push('/feedback');})
        const rankingBtn2 = screen.getByRole('button', { name : /Ranking/i});
        userEvent.click(rankingBtn2);
        const { location : { pathname}} = history;
        expect(pathname).toBe('/ranking');

    })
    test('testa e verifica se ao clicar no botão play again é redirecionado para a página inicial', ()=>{
        const { history } = renderWithRouterAndRedux(<App />);
        act(()=> {history.push('/feedback');})
        const playAgainBtn = screen.getByRole('button', {name : /Play Again/i});
        userEvent.click(playAgainBtn);
        const { location : { pathname }} = history;
        expect(pathname).toBe('/');
    })
})
