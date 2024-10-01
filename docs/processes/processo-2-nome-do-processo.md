### 3.3.2 Processo 2 – PROCESSO DE META DE DOAÇÕES 
 
_Apresente aqui o nome e as oportunidades de melhoria para o processo 2. 
Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN._

![Exemplo de um Modelo BPMN do PROCESSO 2](../images/TO%20BE%20-%20Metas.png "Modelo BPMN do Processo 2.")


#### Detalhamento das atividades

_Os tipos de dados a serem utilizados são:_

_* **Área de texto** - criar pedido e meta de doação_

_* **Caixa de texto** -feedback da doação(Aprovado/Reprovado)_

_* **Número** - Valor da meta, proposta de doação_

_* **Imagem** - Imagens para analisar as doações a fim de julgar aprovação_


**Criar meta de doação**

| **Campo**               | **Tipo** | **Restrições**              | **Valor default** |
|-------------------------|----------|-----------------------------|-------------------|
| Meta e pedido de doação | Texto    | Deve oferecer meta da doação | null              |
|Valor da meta, proposta de doação| Número| Deve ser númerico e maior que 0| 0 |

| **Comandos** | **Destino**                | **Tipo**    |
|--------------|----------------------------|-------------|
| Criar meta   | Analisar imagem das doações | (Mensagem)  |

**Feedbacks de doação**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Resultado da aprovação | Texto  | A proposta deve ter feedback | null |
|                 |                  |                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Enviar feedback | Receber feedback  | (Mensagem) |
|                      |                                |                   |

**Enviar imagens no chat para aprovação da doação**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Enviar porposta de doação com imagens| Imagem  | Deve haver proposta | null |
|                 |                  |                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Entrar em contato com o parceiro | Verificar imagens das doações  | (Imagem) |
|                      |                                |                   |
