import type { ExcuseConfig } from "../components/ContextScreen";

interface ExcuseTemplate {
  text: string;
  category: string;
}

export function generateCorporateExcuse(config: ExcuseConfig): string {
  const { context, absurdLevel } = config;
  
  const templates = getTemplatesByContext(context, absurdLevel);
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  return template.text;
}

function getTemplatesByContext(context: string, level: number): ExcuseTemplate[] {
  const allTemplates: Record<string, ExcuseTemplate[]> = {
    absence: [
      // Level 1-2: Quase normal
      {
        text: "Bom dia, equipe. Devido a uma falha inesperada na tubulação de água municipal do meu prédio, estou sem água corrente e preciso coordenar com a administração do edifício hoje. Estarei disponível por e-mail e posso participar de reuniões críticas remotamente, se necessário.",
        category: "infraestrutura"
      },
      {
        text: "Olá equipe, preciso tirar o dia de hoje para resolver um problema no aquecedor que foi sinalizado como potencialmente perigoso pelo técnico de HVAC durante manutenção de rotina. O reparo requer minha presença para fins de documentação do seguro.",
        category: "propriedade"
      },
      // Level 3: Estranho mas aceitável
      {
        text: "Bom dia a todos. Não poderei comparecer hoje devido a um vazamento de gás no meu bairro que resultou em evacuação obrigatória. A companhia de serviços públicos estima 6-8 horas para reparos e liberação de segurança. Tenho meu notebook e trabalharei do centro comunitário designado com acesso WiFi.",
        category: "emergência"
      },
      {
        text: "Equipe, preciso informar que não poderei comparecer hoje. O sistema de freios do meu veículo apresentou falha esta manhã, confirmada pela assistência rodoviária como inseguro para dirigir. O processo de reboque e reparo requer minha coordenação com a oficina e ajustador do seguro durante todo o dia.",
        category: "veículo"
      },
      // Level 4: Altamente improvável
      {
        text: "Bom dia. Lamento informar que não poderei comparecer ao trabalho hoje. Durante a noite, uma rachadura estrutural foi descoberta no teto do meu apartamento por um vizinho que investigava um vazamento. O engenheiro do prédio determinou evacuação imediata da minha unidade até avaliação estrutural. Estou coordenando com a administração do edifício e meu seguro residencial, e espero que isso tome a maior parte do dia.",
        category: "estrutural"
      },
      {
        text: "Bom dia equipe. Preciso me ausentar hoje devido a uma situação municipal incomum. Um rompimento de tubulação principal criou uma cratera na minha rua, bloqueando diretamente minha garagem. O departamento de obras públicas da cidade isolou a área e estima que os reparos levarão de 8 a 12 horas. Documentei tudo para fins de seguro e trabalharei remotamente assim que realocar minha configuração.",
        category: "municipal"
      },
      // Level 5: Completamente absurdo, dito seriamente
      {
        text: "Bom dia. Preciso reportar ausência hoje devido a circunstâncias extraordinárias. Aproximadamente às 6h47, uma família de guaxinins invadiu o isolamento do meu sótão e causou danos à fiação elétrica, acionando um bloqueio de segurança no painel de circuitos da minha casa. Conforme minha apólice de seguro residencial, sou obrigado a permanecer no local durante a intervenção do especialista em remoção de animais silvestres e a subsequente inspeção elétrica. A janela de serviço coordenada abrange das 9h às 16h.",
        category: "vida_selvagem"
      },
      {
        text: "Equipe, preciso informar minha ausência hoje. O sistema de termostato inteligente da minha casa entrou em um loop de erro de diagnóstico que travou o sistema HVAC a 36°C. O suporte técnico do fabricante escalou isso como uma 'falha crítica de firmware' exigindo um técnico no local com equipamento especializado. Devido às condições de temperatura e à integração do sistema com minha configuração de segurança doméstica, devo permanecer presente durante a janela de serviço de 4 horas começando às 10h.",
        category: "tecnologia"
      },
      {
        text: "Bom dia a todos. Lamento reportar que não posso comparecer hoje. Uma colisão entre dois caminhões de entrega ocorreu diretamente em frente à minha garagem às 7h15, e a polícia designou minha propriedade como parte do perímetro de investigação do acidente. O oficial responsável estima que a liberação da cena e remoção dos veículos levará de 6 a 8 horas. Fui solicitado a permanecer disponível como potencial testemunha e fornecer acesso às filmagens da minha câmera de segurança.",
        category: "incidente"
      },
      {
        text: "Bom dia equipe. Devo tirar hoje para resolver uma questão urgente de conformidade municipal. Durante uma inspeção de rotina, o departamento de zoneamento da cidade identificou uma discrepância de licença datada de décadas relacionada à linha de cerca da minha propriedade. Fui emitido um requisito de comparecimento no mesmo dia no escritório municipal para resolver a documentação. Embora isso decorra de propriedade anterior, a lei de ocupação atual exige minha presença com os registros da propriedade.",
        category: "legal"
      },
    ],
    late: [
      // Level 1-2: Quase normal
      {
        text: "Bom dia equipe, vou me atrasar aproximadamente 45 minutos devido ao fechamento inesperado de uma estrada na minha rota habitual. O desvio adiciona tempo significativo e estou atualmente em trânsito lento. Peço desculpas pelo atraso.",
        category: "trânsito"
      },
      {
        text: "Olá pessoal, vou me atrasar cerca de 30 minutos. O elevador do meu prédio está passando por manutenção emergencial e tive que descer as escadas do 8º andar com meu equipamento de trabalho. Chegarei em breve.",
        category: "edificio"
      },
      // Level 3: Estranho mas aceitável
      {
        text: "Bom dia. Vou me atrasar aproximadamente uma hora. Um cano de água estourou no corredor principal do meu prédio de apartamentos, e a administração do edifício exige que todos os moradores documentem suas unidades quanto a possíveis danos causados pela água antes de sair. Estou trabalhando no processo de inspeção o mais rápido possível.",
        category: "propriedade"
      },
      {
        text: "Bom dia equipe, vou chegar aproximadamente 90 minutos atrasado. Meu carro falhou no teste do sensor de emissões esta manhã, e o sistema entrou em um 'modo limitado' que limita a velocidade a 50 km/h. Estou prosseguindo com cautela e já agendei um diagnóstico para esta noite.",
        category: "veículo"
      },
      // Level 4: Altamente improvável
      {
        text: "Equipe, vou me atrasar cerca de 2 horas. Uma equipe de manutenção da cidade cortou acidentalmente uma linha de telecomunicações ao trabalhar perto do meu prédio, desabilitando internet e serviço móvel em um raio de 3 quadras. Preciso alcançar uma zona com conectividade para acessar os tokens de segurança necessários para nossos sistemas. Atualmente estou me dirigindo para a área não afetada mais próxima.",
        category: "infraestrutura"
      },
      {
        text: "Bom dia a todos. Vou me atrasar aproximadamente 90 minutos. O sistema de alarme de incêndio do meu prédio de apartamentos apresentou defeito durante a noite, acionando uma inspeção obrigatória de todo o edifício pelo corpo de bombeiros esta manhã. Todos os moradores são obrigados a permanecer no local até que a liberação seja fornecida. A inspeção está atualmente em andamento no 4º andar de 12.",
        category: "segurança"
      },
      // Level 5: Completamente absurdo, dito seriamente
      {
        text: "Bom dia equipe. Estou enfrentando um atraso significativo e espero chegar aproximadamente 2,5 horas atrasado. Às 7h20, um guindaste de construção operando perto do meu prédio sofreu uma falha hidráulica, deixando sua lança suspensa diretamente sobre a calçada de pedestres e estacionamento na rua. A polícia estabeleceu um perímetro de segurança que inclui meu veículo e a única saída de pedestres do meu prédio. O operador do guindaste e o engenheiro de segurança estimam estabilização e remoção até aproximadamente 11h.",
        category: "construção"
      },
      {
        text: "Bom dia a todos. Vou me atrasar cerca de 2 horas. O sistema de fechadura inteligente da minha casa sofreu um conflito de firmware com a atualização automática da noite passada, resultando em uma situação de bloqueio completo. A linha de suporte emergencial do fabricante despachou um técnico certificado, mas a janela de chegada mais cedo é 9h30-10h30. Atualmente estou esperando do lado de fora da minha unidade com meu laptop, mas sem acesso às chaves do meu veículo, que estão dentro.",
        category: "tecnologia"
      },
      {
        text: "Equipe, preciso informar sobre um atraso substancial. Uma equipe do departamento de água da cidade atingiu uma linha de gás subterrânea ao realizar manutenção na minha rua aproximadamente às 6h45. O corpo de bombeiros estabeleceu uma zona de evacuação obrigatória de 200 pés, que inclui meu prédio e veículo. Eles estimam contenção e liberação em 2-3 horas. Atualmente estou na zona de segurança designada e seguirei para o escritório imediatamente após a liberação.",
        category: "emergência"
      },
    ],
    early: [
      // Level 1-2: Quase normal
      {
        text: "Equipe, preciso sair às 15h hoje para uma consulta pré-agendada com o administrador do meu prédio sobre documentação de renovação de contrato que requer minha assinatura física. Vou garantir que todos os itens urgentes sejam concluídos antes de sair.",
        category: "administrativo"
      },
      {
        text: "Olá pessoal, vou precisar sair às 14h30 para encontrar com um técnico que fará manutenção do sistema HVAC da minha casa. A janela de atendimento é das 15h às 17h e requer minha presença para acesso e verificação do seguro. Vou concluir minhas tarefas prioritárias antes de sair.",
        category: "manutenção"
      },
      // Level 3: Estranho mas aceitável
      {
        text: "Bom dia equipe, aviso que precisarei sair por volta das 14h hoje. Meu prédio de apartamentos recebeu um aviso sobre inspeções obrigatórias individuais das unidades para um possível problema de encanamento afetando vários andares. Meu horário designado é 14h30-15h30 e devo estar presente conforme a política do edifício. Vou garantir que tudo crítico seja tratado de antemão.",
        category: "inspeção"
      },
      {
        text: "Equipe, vou precisar sair cedo hoje às 13h30 aproximadamente. A luz de verificação do motor do meu veículo escalou para um estado piscante esta manhã, o que o manual indica que requer serviço imediato para prevenir danos. Consegui uma consulta de diagnóstico emergencial e precisarei estar lá quando a oficina abrir o horário da tarde às 14h.",
        category: "veículo"
      },
      // Level 4: Altamente improvável
      {
        text: "Olá pessoal, preciso sair às 13h hoje. Minha companhia de seguros residenciais agendou uma inspeção de propriedade emergencial após o relato de um vizinho sobre possíveis danos causados pela água afetando várias unidades. Minha presença é obrigatória para a avaliação do ajustador, e eles alocaram uma janela de 14h-16h. Vou priorizar todas as entregas urgentes esta manhã.",
        category: "seguro"
      },
      {
        text: "Bom dia a todos. Vou precisar sair às 12h30 hoje. O departamento de inspeção de edifícios da cidade sinalizou meu prédio de apartamentos para uma avaliação estrutural no mesmo dia após atividade sísmica menor na noite passada. Conforme o código municipal, pelo menos um ocupante por unidade deve estar presente durante a inspeção. Meu horário designado é 13h-15h. Vou completar todas as tarefas críticas antes de sair.",
        category: "municipal"
      },
      // Level 5: Completamente absurdo, dito seriamente
      {
        text: "Equipe, preciso informar que devo sair às 11h30 hoje. O painel elétrico da minha casa começou a emitir um tom agudo incomum que se intensificou durante a noite. Conforme a avaliação do meu eletricista via videochamada, isso indica uma potencial falha do capacitor no disjuntor principal, que representa risco de incêndio. Um eletricista licenciado de emergência pode chegar às 12h30 para diagnóstico e reparo, com uma janela de serviço estimada de 3 horas. Minha presença é necessária para acesso ao edifício e documentação do seguro.",
        category: "elétrico"
      },
      {
        text: "Bom dia equipe. Devo sair às 13h hoje devido a uma situação de propriedade incomum. Durante inspeção de rotina, o engenheiro estrutural do meu prédio descobriu que um muro de contenção adjacente à área de estacionamento desenvolveu uma fratura de tensão. A empresa de engenharia requer acesso ao meu veículo para reposicionamento enquanto conduzem trabalho de escoramento emergencial. Fui designado para uma janela de 13h30-15h30 para estar presente durante a realocação do veículo e instalação de suporte temporário.",
        category: "estrutural"
      },
      {
        text: "Bom dia a todos. Vou precisar sair às 12h hoje. O sistema automatizado de armários de entrega de pacotes do meu prédio apresentou defeito, prendendo uma entrega de medicamento sensível ao tempo dentro de um compartimento trancado. A empresa de administração do prédio agendou um técnico de emergência para 12h30, e devo estar presente para verificar o recebimento e assinar documentação de substância controlada conforme exigência da farmácia. Vou garantir que todas as prioridades da manhã sejam concluídas.",
        category: "entrega"
      },
      {
        text: "Equipe, preciso sair às 14h hoje. O detector de fumaça montado no teto do meu apartamento começou a exibir um código de erro raro às 6h que, de acordo com o banco de dados técnico do fabricante, indica potencial inchaço interno da bateria—uma situação que eles classificam como 'atenção imediata necessária'. Um técnico certificado pode chegar às 14h30 para remover e substituir a unidade com segurança. A política do edifício exige presença do morador durante qualquer serviço de equipamento de segurança contra incêndio.",
        category: "segurança"
      },
    ],
  };

  const contextTemplates = allTemplates[context] || [];
  
  // Filtrar por nível de absurdo
  if (level <= 2) {
    return contextTemplates.slice(0, 2);
  } else if (level === 3) {
    return contextTemplates.slice(2, 4);
  } else if (level === 4) {
    return contextTemplates.slice(4, 6);
  } else {
    return contextTemplates.slice(6);
  }
}

export function getAbsurdLevelLabel(level: number): string {
  const labels: Record<number, string> = {
    1: "Quase normal",
    2: "Levemente incomum",
    3: "Estranho mas aceitável",
    4: "Altamente improvável",
    5: "Completamente absurdo",
  };
  return labels[level] || "Médio";
}

export function getContextLabel(context: string): string {
  const labels: Record<string, string> = {
    absence: "Ausência",
    late: "Chegada atrasada",
    early: "Saída antecipada",
  };
  return labels[context] || context;
}
