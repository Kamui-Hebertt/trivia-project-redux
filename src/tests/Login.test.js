import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Login from '../pages/Login';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';


describe('Testa e verifica botões e camposno Login', () => {
  test('verfca botões', () => {
    renderWithRouterAndRedux(<App />);
    const buttonConfig = screen.getByRole('button', {name : /Configurações/i});
    expect(buttonConfig).toBeInTheDocument();
   const buttonPlay = screen.getByRole('button',{name : /Play/i} );
   expect(buttonPlay).toBeInTheDocument();
  });
  test('verifica se existe inputs no login', ()=>{
    renderWithRouterAndRedux(<Login />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();
    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();

  })
  test('verifica se ao clicar no botão configurações é refirecionado para a tela de config', ()=>{
  const { history } = renderWithRouterAndRedux(<App />);
  const configBtn = screen.getByRole('button', {name : /Configurações/i});
  userEvent.click(configBtn);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/settings');
  })
  test('Testa se habilita botão ou desabilita após preencher informações nos campos', ()=>{
    // beforeEach(cleanup);
    renderWithRouterAndRedux(<App /> );
    const inputEmail2 = screen.getByTestId('input-gravatar-email');
    const inputName2 = screen.getByTestId('input-player-name');
    const buttonPlay2 = screen.getByRole('button',{name : /Play/i} );
    expect(buttonPlay2).toBeDisabled();  // Verifica se o botão play começa desabilitado.
    userEvent.type(inputEmail2, 'example@gmail.com');
    userEvent.type(inputName2, 'Ueda');
    expect(buttonPlay2).not.toBeDisabled();

  })
  test('Testa se redirenciona para o jogo apos campos e preenchido e botão clicado', async ()=>{
    // beforeEach(cleanup);
   const { history } =  renderWithRouterAndRedux(<App /> );
    const inputEmail3 = screen.getByTestId('input-gravatar-email');
    const inputName3 = screen.getByTestId('input-player-name');
    const buttonPlay3 = screen.getByRole('button',{name : /Play/i} );
  
    userEvent.type(inputEmail3, 'example@gmail.com');
    userEvent.type(inputName3, 'Ueda');
    userEvent.click(buttonPlay3);
   
    await waitFor(()=>{
        expect(history.location.pathname).toBe('/playgame');

    },{timeout : 3000})
   
  
    
})
    

})