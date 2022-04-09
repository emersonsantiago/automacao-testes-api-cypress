/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {
    let token
   before(() => {
       cy.token('fulano@qa.com', 'teste').then(tkn => { token = tkn })
   });

   it('Deve validar contrato de usuários', () => {
        cy.request('usuarios').then(response => {
            return contrato.validateAsync(response.body)

        })
   });

   it('Deve listar usuários cadastrados', () => {
    cy.request({
         method: 'GET',
         url: 'usuarios'
     }).then((response) => {  

         expect(response.status).to.equal(200) 
         cy.log(response.body.quantidade)

     })
   });

   it('Deve cadastrar um usuário com sucesso', () => {
    cy.request({
         method: 'POST',
         url: 'usuarios',
         body: {
              "nome": "Emerson R C Santiago",
              "email": "emersontesteqa@qa.com.br",
              "password": "teste",
              "administrador": "true"
            },
            headers: {authorization: token}
     }).then((response) => {  

         expect(response.status).to.equal(201) 
         expect(response.body.message) .to.equal('Cadastro realizado com sucesso')


     })
   });

   it('Deve validar um usuário com email inválido', () => {
       cy.request({
           method: 'POST',
           url: 'usuarios',
           body: {
                "nome": "Emerson R C Santiago",
                "email": "emersontesteqa@qa.com.br",
                "password": "teste",
                "administrador": "true"
              },
              headers: {authorization: token}
       }).then((response) => {  
 
           expect(response.status).to.equal(400) 
           expect(response.body.message) .to.equal('Este email já está sendo usado')
 
 
       })  

})

   it('Deve editar um usuário previamente cadastrado', () => {
   cy.request('usuarios').then(response => {

    let id = response.body.usuarios[1]._id

    cy.request({
         method: 'PUT',
         url: 'usuarios/${id}',
         body: {
              "nome": "Emerson Rogério Costa Santiago",
              "email": "emersonrogerioqateste@qa.com.br",
              "password": "teste",
              "administrador": "true"
            },
            headers: {authorization: token}

     }).then((response) => {  

         expect(response.status).to.equal(201) 
         expect(response.body.message) .to.equal('Registro alterado com sucesso')
     })

   })

   });

   it('Deve deletar um usuário previamente cadastrado', () => {
    cy.request('usuarios').then(response => {

    let id = response.body.usuarios[1]._id     
    cy.request({
         method: 'DELETE',
         url: 'usuarios/${"id"}',
            headers: {authorization: token}
     }).then((response) => {  

         expect(response.status).to.equal(200) 
         expect(response.body.message) .to.equal('Registro excluído com sucesso')


     })
   });


});
})