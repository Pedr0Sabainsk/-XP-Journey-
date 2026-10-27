import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type Recommendation = {
  resumo: string;
  missoes: { titulo: string; descricao: string; xp: number; etapas: number }[];
  trilhas: { titulo: string; nivel: string; motivo: string; aulas: string[] }[];
};

const Input = z.object({
  objetivos: z.string().trim().min(5).max(1000),
  perfil: z.enum(["Conservador", "Moderado", "Arrojado"]),
  prazo: z.enum(["Curto (até 1 ano)", "Médio (1 a 5 anos)", "Longo (5+ anos)"]),
});

const SYSTEM = `Você é o motor de personalização do XP Journey (jornada gamificada da XP Inc).
Com base nos objetivos financeiros do usuário, recomende missões do XP Journey e trilhas da XP Academy.
Responda APENAS com JSON válido, sem markdown, no formato:
{"resumo": string (1-2 frases), "missoes": [{"titulo": string, "descricao": string, "xp": number (50-300), "etapas": number (1-5)}] (exatamente 4), "trilhas": [{"titulo": string, "nivel": "Iniciante"|"Intermediário"|"Avançado", "motivo": string, "aulas": string[] (3-4 títulos)}] (exatamente 3)}
Português do Brasil. Missões concretas e acionáveis. Não prometa rentabilidade.
O plano é estritamente educacional: não recomende ativos específicos, não sugira alocação de carteira e não substitua a avaliação de perfil (suitability) exigida pela CVM. Recompensas seguem critérios objetivos, nunca sorteio.`;

export const recommendJourney = createServerFn({ method: "POST" })
  .inputValidator((d) => Input.parse(d))
  .handler(async ({ data }): Promise<Recommendation> => {
    const { generateTextViaGateway } = await import("./ai-gateway.server");
    const text = await generateTextViaGateway(
      SYSTEM,
      `Objetivos: ${data.objetivos}\nPerfil de risco: ${data.perfil}\nPrazo: ${data.prazo}`,
    );
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Resposta inválida da AI.");
    const parsed = JSON.parse(match[0]) as Recommendation;
    return {
      resumo: String(parsed.resumo ?? ""),
      missoes: (parsed.missoes ?? []).slice(0, 4).map((m) => ({
        titulo: String(m.titulo),
        descricao: String(m.descricao ?? ""),
        xp: Math.min(300, Math.max(50, Number(m.xp) || 100)),
        etapas: Math.min(5, Math.max(1, Number(m.etapas) || 1)),
      })),
      trilhas: (parsed.trilhas ?? []).slice(0, 3).map((t) => ({
        titulo: String(t.titulo),
        nivel: String(t.nivel ?? "Iniciante"),
        motivo: String(t.motivo ?? ""),
        aulas: (t.aulas ?? []).slice(0, 4).map(String),
      })),
    };
  });
