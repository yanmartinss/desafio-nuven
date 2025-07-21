export const mockIAResponse = (question: string): string => {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes("contrato")) {
    return "Este documento trata de cláusulas contratuais.";
  }
  if (
    lowerQuestion.includes("financeiro") ||
    lowerQuestion.includes("dinheiro")
  ) {
    return "O conteúdo aborda aspectos financeiros com valores aproximados.";
  }
  if (
    lowerQuestion.includes("cliente") ||
    lowerQuestion.includes("consumidor")
  ) {
    return "Foram identificadas cláusulas relacionadas a direitos do consumidor.";
  }

  const randomResponses = [
    "A análise identificou 3 pontos relevantes neste contexto.",
    "O documento contém informações importantes sobre o tópico solicitado.",
    "Foram encontradas referências correlatas à sua pesquisa.",
    "Sugiro verificar as páginas 12-15 para mais detalhes.",
  ];

  return randomResponses[Math.floor(Math.random() * randomResponses.length)];
};
