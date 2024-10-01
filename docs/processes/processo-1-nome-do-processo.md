### 3.3.1 Processo 1 – NOME DO PROCESSO

No novo processo proposto (to be), a Parceira Delvis otimiza a coleta de doações ao eliminar a necessidade de recolher itens em más condições para posterior descarte, graças à implementação de um mecanismo de triagem prévia. Além disso, amplia-se o escopo de doadores, não se limitando mais aos contatos pessoais diretos, mas abrangendo um público mais vasto. O fluxo também se torna mais eficiente ao permitir que os doadores realizem a entrega diretamente na loja, reduzindo a dependência de logística própria.
 
![Exemplo de um Modelo BPMN do PROCESSO 1](../images/TO%20BE%20-%20Coleta.png "Modelo BPMN do novo Processo de coletas.")

#### Detalhamento das atividades

_Os tipos de dados a serem utilizados são:_

_* **Área de texto** - Chat entre o doador e o parceiro_

_* **Caixa de texto** - Feedbacks de rejeição_

_* **Data e Hora** - Combinar encontro com o doador_

_* **Imagem** - Enviar imagens no chat para aprovação da doação_


## **Chat entre o doador e o parceiro**

| **Campo**                         | **Tipo** | **Restrições**                     | **Valor default** |
| --------------------------------- | -------- | ---------------------------------- | ----------------- |
| Chat entre o doador e o parceiro   | Texto    | Deve oferecer proposta de doação   | null              |

| **Comandos**     | **Destino**                | **Tipo**     |
| ---------------- | -------------------------- | ------------ |
| Enviar mensagem  | Verificar imagem das doações | (Mensagem)   |

---

## **Feedbacks de rejeição**

| **Campo**         | **Tipo** | **Restrições**               | **Valor default** |
| ----------------- | -------- | ---------------------------- | ----------------- |
| Motivo da rejeição | Texto    | A proposta deve ser negada    | null              |

| **Comandos**     | **Destino**         | **Tipo**     |
| ---------------- | ------------------- | ------------ |
| Enviar feedback  | Receber feedback     | (Mensagem)   |

---

## **Combinar encontro com o doador**

| **Campo**                       | **Tipo**     | **Restrições**            | **Valor default** |
| ------------------------------- | ------------ | ------------------------- | ----------------- |
| Combinar encontro com o doador   | Data e hora  | A proposta deve ser aceita | null              |

| **Comandos**     | **Destino**               | **Tipo**     |
| ---------------- | ------------------------- | ------------ |
| Agendar hora     | Levar ou receber doações   | (Date)       |

---

## **Enviar imagens no chat para aprovação da doação**

| **Campo**                                 | **Tipo** | **Restrições**         | **Valor default** |
| ----------------------------------------- | -------- | ---------------------- | ----------------- |
| Enviar proposta de doação com imagens     | Imagem   | Deve haver proposta    | null              |

| **Comandos**     | **Destino**                 | **Tipo**     |
| ---------------- | --------------------------- | ------------ |
| Entrar em contato com o parceiro | Verificar imagens das doações | (Imagem)     |
