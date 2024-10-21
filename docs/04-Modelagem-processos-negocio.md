# Modelagem dos processos de negócio

## Modelagem da situação atual (Modelagem AS IS)

Atualmente, os processos de coleta de doações são realizados de maneira manual, o que gera diversas ineficiências e retrabalho. Esses processos envolvem muitas idas e vindas, principalmente em situações onde o contato com doadores é feito de forma direta e sem o auxílio de sistemas automatizados. Isso resulta em uma grande dependência de interações pessoais e deslocamentos repetitivos, o que pode gerar perda de tempo e esforço para todos os envolvidos.

No cenário atual, para exemplificar essas ineficiências, foram selecionados dois processos principais no contexto de negócios da **Delvis Modas**:

### Processo de Coleta de Doações de Roupas
Atualmente, o processo de coleta de roupas funciona da seguinte maneira:

1. A empresa ou indivíduo responsável pelas doações é contatado por amigos ou conhecidos que desejam contribuir.
2. Em seguida, um encontro é agendado para que seja possível ir até a residência do doador, onde as doações são coletadas manualmente.
3. Após a coleta, os itens são levados até a loja, onde são verificados para avaliar se estão em boas condições. Caso estejam, são armazenados. Caso contrário, precisam ser consertados e limpos, o que exige tempo e esforço.
4. Se o conserto for possível, os itens são armazenados. Caso contrário, são descartados.

Este processo atual depende totalmente de contatos manuais e repetitivos, além de exigir esforço físico para transporte e reparo dos itens, o que poderia ser otimizado com uma solução automatizada.

**Modelo AS IS - Coleta de doações**
![ModeloColeta](images/AS%20IS%20-%20Coleta.png)

### Processo de Coleta de Doações de Metas
Da mesma forma, o processo de doações de metas segue uma rotina manual. Esse processo começa com a definição de uma meta de doação e segue os seguintes passos:

1. Primeiramente, o responsável liga para amigos e conhecidos, perguntando se possuem doações que possam atender à meta.
2. Caso positivo, uma visita é agendada para buscar as doações na casa da pessoa. Caso contrário, o processo volta à estaca zero, com novas ligações sendo feitas.
3. Após coletar as doações, o responsável retorna à loja, onde os itens são avaliados para verificar se atendem às necessidades e se estão em boas condições.
4. Caso estejam, são armazenados. Caso contrário, são reparados ou descartados, se o conserto não for possível.

Esse processo também envolve muitas etapas manuais, ligações e verificações físicas que poderiam ser otimizadas por meio de automação.

**Modelo AS IS - Meta de material**
![ModeloColeta](images/AS%20IS%20-%20Meta.png)

## Descrição geral da proposta (Modelagem TO BE)

Após identificar gargalos e complicações nos modelos AS-IS, a equipe implementou melhorias significativas nos processos de definição de metas e coleta de doações. O processo manual e demorado de contato com potenciais doadores foi substituído pelas ferramentas oferecidas pela plataforma DoaSô.

Modelo TO BE - Coleta de doações
![ModeloColeta](images/TO%20BE%20-%20Coleta.png)

Modelo TO BE - Meta de material

![ModeloColeta](images/TO%20BE%20-%20Metas.png)

A equipe propõe substituir os processos manuais pela plataforma DoaSô, economizando esforço e tempo para a **Delvis Modas**. Com a DoaSô, a instituição pode visualizar os itens a serem doados sem a necessidade de encontros presenciais entre doadores e a instituição. Além disso, os doadores podem enviar suas propostas previamente pela plataforma, eliminando a necessidade de ligações telefônicas e permitindo que aguardem o feedback diretamente na plataforma.

Nosso objetivo é simplificar processos demorados e eliminar tarefas manuais desnecessárias, utilizando a tecnologia para tornar o processo de doação mais eficiente e conveniente para todos os envolvidos.

## Modelagem dos processos

[PROCESSO 1 - Coletar Doações](./processes/processo-1-nome-do-processo.md "Detalhamento do processo 1.")

[PROCESSO 2 - Determinar Metas de Doações](./processes/processo-2-nome-do-processo.md "Detalhamento do processo 2.")

## Indicadores de desempenho

Desenvolvemos aqui os 5 principais indicadores de desempenho e metas para os processos. Estes são:

| **Indicador**                   | **Objetivos**                 | **Descrição**                                                    | **Fonte de dados**               | **Fórmula de cálculo**                                                                 |
|----------------------------------|-------------------------------|------------------------------------------------------------------|----------------------------------|----------------------------------------------------------------------------------------|
| Percentual de doações aceitas    | Avaliar a eficiência           | Percentual de doações em bom estado para serem repassadas         | Tabela de doações                | número total de doações propostas / número total de doações aceitas                    |
| Taxa de crescimento de doações   | Monitorar o crescimento        | Percentual de aumento ou diminuição das doações ao longo do tempo | Relatórios mensais de doações    | (doações no período atual - doações no período anterior) / doações no período anterior |
| Tempo médio de processamento     | Melhorar a eficiência operacional | Tempo médio entre a recepção da doação e sua distribuição          | Sistema de gestão de doações     | soma do tempo de processamento de todas as doações / número total de doações            |
| Satisfação dos doadores          | Avaliar a satisfação           | Percentual de doadores satisfeitos com o processo de doação       | Pesquisas de satisfação          | número de doadores satisfeitos / número total de doadores pesquisados                  |
| Custo por doação processada      | Controlar custos               | Custo médio para processar cada doação                            | Relatórios financeiros           | custo total de processamento / número total de doações processadas                    |
| Taxa de retenção de doadores     | Avaliar a fidelização          | Percentual de doadores que fazem mais de uma doação               | Banco de dados de doadores       | número de doadores recorrentes / número total de doadores                              |

Obs.: todas as informações serão utilizadas no diagrama de classe a ser apresentado posteriormente.
