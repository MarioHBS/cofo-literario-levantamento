// Mapa de decisões. Cada ramo liga perguntas (qs) a opções de produto.
// `when`: { PERGUNTA: [valores] } — a opção fica "escolhida" se qualquer par bater com as respostas.
// effort: P/M/G (pequeno/médio/grande) · phase: "MVP" | "Fase 2" | "Fora"
// lgpd: true quando a opção implica tratar dados pessoais (ou de menores) · rec: custo/tarefa recorrente
window.DECISIONS = [
  {
    id: "venda", title: "Venda dos produtos", qs: ["A1", "D10", "F5", "A7"],
    ask: "Como a compra acontece no site?",
    options: [
      { id: "vitrine", label: "Vitrine + botão de WhatsApp", when: { A1: ["contatos", "imagem"], D10: ["whatsapp"], F5: ["sem_online"], A7: ["so_pedido"] },
        gain: "Fica pronto rápido e barato; nenhum risco financeiro ou fiscal no site.", cost: "Cada venda depende de conversa manual.", phase: "MVP", effort: "P", tech: "Páginas estáticas + link wa.me." },
      { id: "pedido", label: "Formulário de pedido / orçamento", when: { A1: ["duas"], D10: ["misto"], D2: ["orcamento", "formal"], A9: ["form", "form_orc"] },
        gain: "Organiza pedidos e convites; serve para escola e palestra; já coleta dados para nota.", cost: "A Martha precisa responder e cobrar por fora.", phase: "MVP", effort: "M", rec: "Responder pedidos", lgpd: true, tech: "Formulário com envio para e-mail/planilha; anti-spam." },
      { id: "carrinho", label: "Carrinho com pagamento online", when: { A1: ["vender"], D10: ["mostrar"], F5: ["plataforma", "checkout"] },
        gain: "Venda 24h, entrega digital automática possível.", cost: "Exige CNPJ/conta, gateway, nota fiscal, termos e suporte.", phase: "Fase 2", effort: "G", rec: "Taxa por venda + suporte", lgpd: true, tech: "Gateway (Pix/cartão) ou plataforma de infoproduto." }
    ]
  },
  {
    id: "entrega", title: "Entrega das sequências didáticas (PDF)", qs: ["E2", "B9", "B14", "H5"],
    ask: "Como o comprador recebe o material?",
    options: [
      { id: "manual", label: "Envio manual (WhatsApp/e-mail)", when: { E2: ["manual"], H5: ["sem_login"] },
        gain: "Zero automação; funciona para poucas vendas; sem contas.", cost: "A Martha envia cada pedido; não escala.", phase: "MVP", effort: "P" },
      { id: "link", label: "Link temporário com marca d'água", when: { E2: ["link_auto"], B9: ["proteger_forte", "proteger_leve"] },
        gain: "Protege contra cópia e compartilhamento; automático após pagamento.", cost: "Exige pagamento integrado e armazenamento privado.", phase: "Fase 2", effort: "M", rec: "Armazenamento de arquivos", lgpd: true, tech: "Objeto privado com URL assinada; PDF com carimbo do comprador." },
      { id: "area", label: "Área do comprador (login)", when: { E2: ["area"], H5: ["login"] },
        gain: "Comprador reencontra e rebaixa; histórico de pedidos.", cost: "Contas de usuário, recuperação de senha, suporte.", phase: "Fase 2", effort: "G", rec: "Suporte a usuários", lgpd: true }
    ]
  },
  {
    id: "cursos", title: "Cursos em vídeo (3–4 h)", qs: ["B11", "I2"],
    ask: "Onde os vídeos moram?",
    options: [
      { id: "nenhum", label: "Sem cursos agora", when: { B11: ["nao_agora"], I2: ["nao_ha"] },
        gain: "Escopo menor.", cost: "Produto ainda não existe.", phase: "Fora", effort: "P" },
      { id: "yt", label: "Vídeo oculto no YouTube", when: { B11: ["gravado_youtube"], I2: ["ocultos", "publicos"] },
        gain: "Quase sem custo; incorporado no site.", cost: "Quem tem o link repassa; pouco controle.", phase: "MVP", effort: "P" },
      { id: "plataforma", label: "Plataforma de cursos externa", when: { B11: ["gravado_plataforma"], I2: ["pagos"] },
        gain: "Controle de acesso e pagamento prontos.", cost: "Taxa mensal; marca fica fora do seu site.", phase: "Fase 2", effort: "M", rec: "Taxa mensal/por venda" },
      { id: "proprio", label: "Hospedar no próprio site", when: { B11: ["proprio"] },
        gain: "Controle total e experiência única.", cost: "Hospedagem de vídeo cara, login e suporte.", phase: "Fase 2", effort: "G", rec: "Custo de vídeo + manutenção", lgpd: true }
    ]
  },
  {
    id: "institucional", title: "Palestras e vendas para escolas", qs: ["A9", "D2", "D8", "D4"],
    ask: "Como a escola ou secretaria entra em contato?",
    options: [
      { id: "zap", label: "Só WhatsApp", when: { A9: ["divulga"] },
        gain: "Mais simples.", cost: "Pedidos ficam perdidos nas conversas.", phase: "MVP", effort: "P" },
      { id: "form", label: "Formulário de solicitação", when: { A9: ["form", "form_orc"], D8: ["convite", "orcamento"] },
        gain: "Chega organizado por e-mail; dá imagem profissional.", cost: "A Martha responde e fecha por fora.", phase: "MVP", effort: "P", lgpd: true },
      { id: "proposta", label: "Orçamento com quantidade e tabela por volume", when: { D4: ["volume", "escola"], D2: ["orcamento", "formal"] },
        gain: "Atende escola/secretaria com preço por quantidade.", cost: "Tabela de preços e documentos para manter.", phase: "Fase 2", effort: "M" }
    ]
  },
  {
    id: "parcerias", title: "Livros de outros autores", qs: ["C1", "C2", "B15", "B3"],
    ask: "O que acontece com livros de parceiros?",
    options: [
      { id: "nenhum", label: "Nenhum por enquanto", when: { C1: ["nao_agora"] },
        gain: "Escopo menor.", cost: "—", phase: "Fora", effort: "P" },
      { id: "divulga", label: "Só divulgação (capa, sinopse, link)", when: { C1: ["divulgacao"], B15: ["nao_tenho"], B3: ["nao", "sem_contrato"] },
        gain: "Sem repasse, sem fiscal; só autorização de imagem.", cost: "Sem receita direta.", phase: "MVP", effort: "P" },
      { id: "venda", label: "Venda com repasse", when: { C1: ["venda"], C2: ["comissao", "consignacao", "revenda"] },
        gain: "Receita de comissão; catálogo maior.", cost: "Contrato, repasse, fiscal e estoque de terceiros.", phase: "Fase 2", effort: "G", rec: "Repasse mensal", lgpd: true }
    ]
  },
  {
    id: "blog", title: "Textos próprios abertos (blog)", qs: ["H10", "O1", "O2", "O5", "O6", "O3"],
    ask: "Como os textos da Martha ficam publicados?",
    options: [
      { id: "sem", label: "Sem área de textos", when: { H10: ["nao"] },
        gain: "Escopo menor.", cost: "Perde ponte entre conteúdo livre e vendas.", phase: "Fora", effort: "P" },
      { id: "leitura", label: "Textos para ler (página) com aviso de direitos", when: { H10: ["sim"], O5: ["pagina"], O2: ["reservados", "cc_by_nc", "cc_by"] },
        gain: "Conteúdo bom para busca no Google; atrai professores.", cost: "Cadastro e organização dos textos; sem interação.", phase: "MVP", effort: "M", tech: "Coleção de textos em arquivos ou painel; páginas geradas." },
      { id: "leitura_pdf", label: "Textos para ler e baixar em PDF + chamada ao catálogo", when: { O5: ["ambos", "midia", "pdf"], O6: ["sim"], O21: ["catalogo"] },
        gain: "Vira vitrine: cada texto leva a livros e sequências.", cost: "Mais arquivos para gerar e atualizar.", phase: "MVP", effort: "M", tech: "PDF gerado por texto; seção 'relacionados'." },
      { id: "painel", label: "Painel para publicar com rascunho e agendamento", when: { O3: ["eu_agenda", "assistente", "agencia"], H2: ["blog"] },
        gain: "A Martha publica sozinha, sem depender de ninguém.", cost: "Painel e treinamento; mais manutenção.", phase: "MVP", effort: "M", rec: "Manutenção do painel" }
    ]
  },
  {
    id: "alunos", title: "Alunos leem e fazem resumos", qs: ["O7", "O8", "O9", "O10", "O11", "O23"],
    ask: "Como o resumo chega à professora?",
    options: [
      { id: "fora", label: "Aluno lê no site e entrega o resumo fora (papel/WhatsApp)", when: { O8: ["fora"] },
        gain: "Sem dados de alunos no site; zero risco LGPD; começa já.", cost: "Controle de pontos continua manual.", phase: "MVP", effort: "P" },
      { id: "privado", label: "Resumo enviado pelo site, visível só para a professora", when: { O8: ["privado"], O11: ["so_eu"], O9: ["auto"] },
        gain: "Organiza entregas por turma; a professora vê tudo num lugar.", cost: "Guarda dados de alunos (inclusive menores): política de privacidade e consentimento.", phase: "Fase 2", effort: "G", rec: "Moderação diária", lgpd: true, tech: "Formulário com código da turma; fila privada; exportação." },
      { id: "publico", label: "Resumos públicos (turma ou todos)", when: { O8: ["publico"], O11: ["turma", "publico", "selecionados"] },
        gain: "Vitrine do trabalho dos alunos e engajamento.", cost: "Exposição de menores, moderação pesada e risco jurídico.", phase: "Fase 2", effort: "G", rec: "Moderação diária", lgpd: true }
    ]
  },
  {
    id: "interacao", title: "Curtir e comentar (autenticação)", qs: ["O12", "O13", "O14", "O15", "O16", "O20"],
    ask: "Quem pode curtir e comentar, e com qual identificação?",
    options: [
      { id: "nenhum", label: "Sem curtir nem comentar", when: { O12: ["sem"], O13: ["sem"] },
        gain: "Zero backend, zero moderação, zero LGPD extra: entra no MVP sem custo.", cost: "Sem interação social.", phase: "MVP", effort: "P" },
      { id: "curtir", label: "Só curtir, sem cadastro", when: { O12: ["curtir", "curtir_oculto"] },
        gain: "Prova social simples e barata.", cost: "Número pode ser inflado.", phase: "Fase 2", effort: "M",
        tech: "1 curtida por navegador (localStorage) + limite por IP + honeypot; contador no banco." },
      { id: "apelido", label: "Comentar sem cadastro (apelido) com aprovação", when: { O13: ["aprovacao"], O15: ["apelido"] },
        gain: "Baixa fricção; alunos participam rápido.", cost: "Carga de moderação, spam, dado pessoal mínimo.", phase: "Fase 2", effort: "G", rec: "Moderação diária", lgpd: true,
        tech: "Fila de aprovação, honeypot, Cloudflare Turnstile, limite de taxa, bloqueio de links." },
      { id: "codigo", label: "Código da turma (sem conta individual)", when: { O13: ["turma"], O15: ["codigo"] },
        gain: "Só participa quem a professora autoriza; casa com a atividade; sem e-mail de criança.", cost: "A Martha gera e distribui códigos por turma.", phase: "Fase 2", effort: "M", rec: "Gestão de turmas", lgpd: true,
        tech: "Código por turma revogável; nome ou apelido sem dado sensível." },
      { id: "login", label: "Login com e-mail ou Google", when: { O15: ["login"] },
        gain: "Identidade forte e histórico por aluno.", cost: "Atrito, contas de menores (exige consentimento), reset de senha, suporte.", phase: "Fase 2", effort: "G", rec: "Suporte e moderação", lgpd: true,
        tech: "Provedor de autenticação; Google exige idade mínima; banimento por conta." },
      { id: "aberto", label: "Comentário aberto, publicado na hora", when: { O13: ["aberto"] },
        gain: "Mais simples para quem comenta.", cost: "Risco alto de spam e conteúdo impróprio; não recomendado com crianças.", phase: "Fase 2", effort: "G", rec: "Moderação constante", lgpd: true }
    ]
  },
  {
    id: "painel", title: "Painel para a Martha editar", qs: ["H2", "H15", "E8", "H3"],
    ask: "Quanto do site ela edita sozinha?",
    options: [
      { id: "arquivos", label: "Sem painel: conteúdo alterado pelo desenvolvedor", when: { H3: ["agencia"] },
        gain: "Menor custo inicial.", cost: "Qualquer mudança depende de outra pessoa.", phase: "MVP", effort: "P", rec: "Chamados de alteração" },
      { id: "minimo", label: "Painel mínimo (produtos, textos, banners)", when: { H2: ["produtos", "textos", "banners", "videos", "depoimentos", "blog"], H3: ["eu"] },
        gain: "Autonomia para o dia a dia.", cost: "Treinamento e manutenção.", phase: "MVP", effort: "M", rec: "Manutenção mensal" },
      { id: "completo", label: "Painel com pedidos e vários usuários", when: { E8: ["lista"], H15: ["varios", "assistente", "agencia"], H3: ["varios"] },
        gain: "Operação organizada e equipe.", cost: "Mais telas, permissões e suporte.", phase: "Fase 2", effort: "G", lgpd: true }
    ]
  },
  {
    id: "marca", title: "Marca e requisitos legais", qs: ["G10", "G11", "G12", "G1", "G2", "F1", "L2", "M2"],
    ask: "O que precisa estar certo antes de publicar?",
    options: [
      { id: "logo_nova", label: "Logo/identidade nova", when: { G1: ["nova"] },
        gain: "Identidade própria e registrável.", cost: "Tempo de design e aprovação; retrabalho no site.", phase: "MVP", effort: "M" },
      { id: "logo_atual", label: "Partir do cofo atual", when: { G1: ["atual", "refinar"] },
        gain: "Continuidade visual; mais rápido.", cost: "Se for arte de IA, pode não ter proteção autoral.", phase: "MVP", effort: "P" },
      { id: "mascote_manter", label: "Manter o mascote (como está ou simplificado)", when: { G11: ["manter", "simplificar"], G12: ["mascote"] },
        gain: "Personagem forte para crianças, redes e produtos (quebra-cabeças).", cost: "Arte original sem registro: conferir autoria e registrar como marca mista; mais peças de arte.", phase: "MVP", effort: "M", rec: "Registro da marca mista (INPI)" },
      { id: "mascote_sem", label: "Sem mascote: cofo e/ou nome", when: { G11: ["sem"], G12: ["cofo", "nome"] },
        gain: "Visual mais simples e sóbrio; menos arte e menos risco de direitos.", cost: "Perde o apelo infantil e o personagem para as redes.", phase: "MVP", effort: "P" },
      { id: "dir_institucional", label: "Direção editorial/institucional", when: { G10: ["editorial", "organico"] },
        gain: "Credibilidade com escolas, secretarias e pais.", cost: "Menos lúdico para as crianças.", phase: "MVP", effort: "P" },
      { id: "dir_infantil", label: "Direção lúdica/artesanal", when: { G10: ["ludica", "artesanal"] },
        gain: "Fala direto com crianças e professores; combina com a cultura do cofo.", cost: "Exige cuidado para manter a seriedade em documentos e propostas.", phase: "MVP", effort: "P" },
      { id: "cnpj", label: "CNPJ ativo para vender", when: { F1: ["mei", "me"] },
        gain: "Gateway e nota fiscal viáveis.", cost: "Marca em nome da pessoa física: formalizar uso.", phase: "MVP", effort: "P" },
      { id: "sem_cnpj", label: "Sem CNPJ", when: { F1: ["nao"] },
        gain: "Vitrine e contatos continuam possíveis.", cost: "Loja online e nota ficam bloqueadas até abrir CNPJ.", phase: "Fase 2", effort: "M" },
      { id: "criancas", label: "Crianças usam o site", when: { L2: ["criancas", "ambos"] },
        gain: "Conteúdo infantil direto.", cost: "Regras rígidas de privacidade e consentimento; sem coleta ou comentários abertos.", phase: "MVP", effort: "M", lgpd: true }
    ]
  }
];
