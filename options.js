// Tipos e opções de resposta por pergunta (mesclado a window.GUIA por ID no app.js).
// Formato: ID: { t: 'choice'|'multi', o: [[valor, rótulo, "o que isso muda no site" (opcional)], ...] }
// Pergunta sem entrada aqui é de texto livre. Toda pergunta de marcar ganha "Outra / quero explicar" + observação.
(function () {
  const YN = [["sim", "Sim"], ["nao", "Não"], ["nao_sei", "Ainda não sei"]];
  const YNS = (simImp, naoImp) => [["sim", "Sim", simImp], ["nao", "Não", naoImp], ["nao_sei", "Ainda não sei"]];

  window.OPTS = {
    // ---------- A. Modelo de negócio ----------
    A1: { t: "choice", o: [
      ["vender", "Vender (livros e materiais direto pelo site)", "O site precisa de pedido e pagamento."],
      ["contatos", "Gerar contatos pelo WhatsApp (pedidos e convites)", "Site mais simples: vitrine com botões de WhatsApp e formulários."],
      ["imagem", "Fortalecer minha imagem como autora", "Foco em conteúdo, textos e história; sem loja."],
      ["duas", "Vender e gerar contatos ao mesmo tempo", "Vitrine com pedido por formulário/WhatsApp; loja completa pode vir depois."]]},
    A2: { t: "multi", o: [["instagram", "Instagram"], ["whatsapp", "WhatsApp"], ["feiras", "Feiras e eventos"], ["escolas", "Direto nas escolas"], ["editora", "Editora"], ["amazon", "Amazon / marketplace"], ["correio", "Envio pelo correio"]] },
    A3: { t: "choice", o: [["livros", "Livros"], ["sequencias", "Sequências didáticas"], ["fisicos", "Quebra-cabeças e produtos físicos"], ["palestras", "Palestras e formação"], ["cursos", "Cursos"]] },
    A4: { t: "choice", o: [["ate10", "Até 10 pedidos por mês"], ["10a30", "De 10 a 30 pedidos por mês"], ["30a100", "De 30 a 100 pedidos por mês"], ["100mais", "Mais de 100 pedidos por mês"], ["nao_sei", "Não sei dizer"]] },
    A5: { t: "multi", o: [["instagram", "Divulgação no Instagram"], ["indicacao", "Indicação de outros professores"], ["visita", "Visita ou palestra na escola"], ["feira", "Feira ou evento"], ["whatsapp", "Grupos de WhatsApp"]] },
    A6: { t: "multi", o: [["vendas", "Mais vendas de livros e materiais"], ["palestras", "Convites para palestras e formação"], ["autoridade", "Ser reconhecida como autora/referência"], ["alunos", "Alunos lendo e participando"], ["contatos", "Lista de contatos de professores"]] },
    A7: { t: "choice", o: [
      ["so_site", "Só pelo site (e redes sociais)"],
      ["outros_igual", "Site e outros canais, com o mesmo preço"],
      ["outros_dif", "Site e outros canais, com preços diferentes"],
      ["so_pedido", "Pelo site só se faz o pedido; o pagamento combino por fora", "Sem pagamento online: pedido vira mensagem/formulário."]]},
    A8: { t: "choice", o: [
      ["nao", "Não, é só ideia distante", "Fora do escopo."],
      ["depois", "Quero, mas só depois de 1 ano", "Deixamos o catálogo preparado, sem assinatura agora."],
      ["logo", "Quero logo nos primeiros meses", "Exige cobrança recorrente e gestão de assinantes: muda bastante o projeto."]]},
    A9: { t: "choice", o: [
      ["divulga", "O site só divulga; o contato é pelo WhatsApp"],
      ["form", "Quero um formulário para solicitar palestra/formação", "Formulário simples que chega por e-mail/WhatsApp."],
      ["form_orc", "Formulário com pedido de orçamento (escola, data, público, valor)", "Formulário mais completo e painel para acompanhar pedidos."]]},

    // ---------- D. Público e vendas institucionais ----------
    D1: { t: "multi", o: [["professor", "Professores"], ["escola", "Escolas"], ["secretaria", "Secretarias de educação"], ["pais", "Pais e responsáveis"]] },
    D2: { t: "choice", o: [
      ["nunca", "Nunca vendi para escola ou secretaria"],
      ["pedido", "A escola faz o pedido e eu envio direto"],
      ["orcamento", "Preciso enviar orçamento/proposta antes", "Botão 'Solicitar orçamento' em vez de carrinho para escolas."],
      ["formal", "Exige documentos e processo formal (nota, empenho, licitação)", "Venda institucional separada da venda ao professor."]]},
    D3: { t: "choice", o: YN.slice() },
    D4: { t: "choice", o: [["nao", "Não, o preço é um só"], ["volume", "Sim, desconto por quantidade", "Tabela de preços por quantidade."], ["escola", "Sim, preço específico para escola/rede"]] },
    D5: { t: "choice", o: [["ate5", "Até 5 unidades"], ["5a30", "De 5 a 30 unidades"], ["30a100", "De 30 a 100 unidades"], ["100mais", "Mais de 100 unidades"], ["nao_sei", "Não sei"]] },
    D6: { t: "choice", o: [["sozinho", "O professor decide sozinho"], ["coord", "Precisa da coordenação/direção"], ["depende", "Depende da escola"]] },
    D7: { t: "choice", o: [["ma", "Só o Maranhão"], ["nordeste", "Maranhão e região"], ["brasil", "Brasil inteiro"]] },
    D8: { t: "choice", o: [["convite", "Convite direto (WhatsApp/Instagram)"], ["orcamento", "Orçamento enviado por mim"], ["evento", "Por eventos e programas de formação"], ["nao_fiz", "Ainda não fiz palestras pagas"]] },
    D9: { t: "choice", o: [["fisico", "Preferem livro físico"], ["digital", "Aceitam digital"], ["ambos", "Os dois"], ["nao_sei", "Não sei"]] },
    D10: { t: "choice", o: [
      ["mostrar", "Mostrar o preço no site para todos", "Catálogo com preço; abre caminho para carrinho."],
      ["whatsapp", "'Consulte pelo WhatsApp' para todos", "Sem preço e sem carrinho: catálogo vira vitrine de contato."],
      ["misto", "Preço para pais/professores e consulta para escolas", "Dois fluxos: compra simples e orçamento institucional."]]},

    // ---------- B. Produtos ----------
    B3: { t: "choice", o: [["sim", "Sim, posso vender direto"], ["nao", "Não, só a editora vende"], ["sem_contrato", "Não tenho contrato com editora"], ["nao_sei", "Não sei"]] },
    B4: { t: "choice", o: [
      ["editora", "Mandar o cliente para a editora/loja da editora", "Páginas de livro com link externo; sem estoque nem envio no site."],
      ["estoque", "Vender com o meu estoque", "Exige controle de estoque e envio."],
      ["pedido", "Receber o pedido e eu resolvo (editora ou estoque)"],
      ["nao_se_aplica", "Não se aplica"]]},
    B6: { t: "choice", o: [["junto", "Só junto com o livro"], ["separado", "Só separada"], ["ambos", "Das duas formas: separada ou com o livro", "Cadastro de pacote (livro + sequência) e preços separados."]] },
    B7: { t: "choice", o: [["tudo_autoral", "Tudo autoral meu"], ["terceiros", "Há imagens/textos de terceiros", "Precisa de autorização antes de vender como digital."], ["nao_sei", "Preciso conferir"]] },
    B8: { t: "multi", o: [["infantil", "Educação infantil"], ["fund1", "Fundamental I (1º ao 5º ano)"], ["fund2", "Fundamental II (6º ao 9º ano)"], ["medio", "Ensino médio"], ["bncc", "Alinhado à BNCC"]] },
    B9: { t: "choice", o: [
      ["proteger_forte", "Proteger o máximo possível contra cópia", "Entrega por link temporário e marca d'água com nome do comprador."],
      ["proteger_leve", "Proteção simples (aviso e link que expira)", "Link com prazo; sem marca d'água."],
      ["aceita", "Aceito o risco; confio nos professores", "Entrega simples por e-mail/WhatsApp."]]},
    B10: { t: "choice", o: [["demanda", "Produzo sob demanda, sem estoque"], ["pouco", "Tenho pouco estoque"], ["estoque", "Tenho estoque de cada item"], ["nao_vende", "Não vendo produtos físicos"]] },
    B11: { t: "choice", o: [
      ["nao_agora", "Não vou ter cursos agora"],
      ["gravado_youtube", "Vídeo gravado, escondido no YouTube", "Barato e simples; quem tem o link pode repassar."],
      ["gravado_plataforma", "Vídeo gravado em plataforma de cursos", "Acesso controlado por plataforma externa (mensalidade/taxa)."],
      ["proprio", "Vídeo hospedado no meu próprio site", "Exige login e hospedagem de vídeo: o item mais caro."]]},
    B13: { t: "multi", o: [["texto_pdf", "Textos em PDF para baixar"], ["atividade", "Atividades de amostra"], ["capitulo", "Primeiros capítulos de livros"], ["nada", "Não quero"]] },
    B14: { t: "choice", o: [
      ["individual", "Licença para um único professor", "Um preço; termos de uso simples."],
      ["escola", "Licença para a escola inteira", "Dois preços: individual e escola."],
      ["depende", "Posso oferecer as duas licenças", "Dois produtos por sequência."],
      ["nao_sei", "Ainda não defini"]]},
    B15: { t: "choice", o: [["tenho", "Tenho o direito de venda"], ["nao_tenho", "Não tenho o direito de venda", "Só divulgar; sem venda no site."], ["nao_sei", "Preciso verificar"]] },

    // ---------- F. Pagamento e fiscal ----------
    F1: { t: "choice", o: [["mei", "Sim, sou MEI"], ["me", "Sim, ME ou outro tipo"], ["nao", "Não tenho CNPJ"], ["nao_sei", "Não sei"]] },
    F2: { t: "choice", o: [["sim", "Sim, inclui livros, cursos e palestras"], ["parcial", "Inclui parte"], ["nao_sei", "Não sei"]] },
    F3: { t: "choice", o: [["pix_pf", "Pix pessoal (CPF)"], ["pix_cnpj", "Pix do CNPJ"], ["maquininha", "Maquininha / link de pagamento"], ["nao_recebo", "Ainda não recebo online"]] },
    F4: { t: "multi", o: [["pix", "Pix"], ["cartao", "Cartão à vista"], ["parcelado", "Cartão parcelado"], ["boleto", "Boleto"]] },
    F5: { t: "choice", o: [
      ["plataforma", "Plataforma pronta (cobra taxa por venda)", "Entrega e pagamento resolvidos; menos controle de marca e dados."],
      ["checkout", "Pagamento no meu próprio site", "Mais controle e mais manutenção."],
      ["sem_online", "Sem pagamento online por enquanto (Pix manual)", "Pedido vira mensagem; zero integração."],
      ["nao_sei", "Não sei, preciso de orientação"]]},
    F6: { t: "choice", o: [["contador_nf", "Tenho contador que emite a nota"], ["eu", "Eu mesma emito"], ["nao_emito", "Hoje não emito nota"], ["auto", "Quero emissão automática", "Integração fiscal: custo e prazo extras."]] },
    F9: { t: "choice", o: [["pix", "Desconto no Pix"], ["cupom", "Cupons de desconto"], ["ambos", "Os dois"], ["nao", "Não"]] },

    // ---------- C. Parcerias ----------
    C1: { t: "choice", o: [
      ["divulgacao", "Só divulgação (capa, sinopse e link)", "Páginas de apresentação; sem repasse."],
      ["venda", "Vendo e repasso o valor ao autor", "Exige contrato, repasse e fiscal: mudança grande."],
      ["nao_agora", "Nenhuma parceria no começo"]]},
    C2: { t: "choice", o: [["comissao", "Comissão por venda"], ["consignacao", "Consignação"], ["revenda", "Compro e revendo"], ["nao_aplica", "Não se aplica"]] },
    C3: { t: "choice", o: [["nenhum", "Nenhum no começo"], ["ate3", "Até 3 autores"], ["ate10", "Até 10 autores"], ["mais", "Mais de 10"]] },
    C4: { t: "choice", o: [["autor", "O próprio autor"], ["eu", "Eu"], ["editora", "A editora"], ["nao_aplica", "Não se aplica"]] },
    C5: { t: "choice", o: [["escrito", "Sim, por escrito"], ["verbal", "Só combinado verbalmente"], ["nao", "Ainda não pedi"]] },
    C7: { t: "choice", o: YN.slice() },
    C8: { t: "choice", o: YN.slice() },

    // ---------- E. Operação ----------
    E1: { t: "choice", o: [["eu", "Eu mesma atendo"], ["assistente", "Uma assistente atende"], ["agencia", "A agência de marketing"], ["comercial", "Tenho número comercial separado"]] },
    E2: { t: "choice", o: [
      ["manual", "Eu envio manualmente (e-mail ou WhatsApp)", "Sem automação: simples, mas depende da Martha a cada venda."],
      ["link_auto", "Link automático após o pagamento", "Exige pagamento online integrado."],
      ["area", "Área do comprador (login para baixar)", "Contas de usuário, mais manutenção e suporte."]]},
    E4: { t: "choice", o: [["correios", "Correios"], ["transportadora", "Transportadora"], ["propria", "Entrega própria/mão"], ["editora", "A editora envia"]] },
    E5: { t: "choice", o: [["brasil_frete", "Brasil todo, frete cobrado à parte", "Cálculo de frete no pedido."], ["embutido", "Brasil todo, frete já no preço"], ["fixo", "Valor fixo de frete"], ["regional", "Só região (combinar valor)"]] },
    E8: { t: "choice", o: [["zap", "WhatsApp e planilha bastam"], ["lista", "Quero ver pedidos em lista no painel", "Painel com cadastro de pedidos."]] },
    E10: { t: "choice", o: [["link", "Link direto para conversa"], ["business", "WhatsApp Business com catálogo"]] },

    // ---------- G. Marca ----------
    G1: { t: "choice", o: [["nova", "Logo nova"], ["atual", "Partir do cofo e do selo atuais"], ["refinar", "Manter o cofo, refinando o desenho"], ["nao_sei", "Prefiro que me sugiram"]] },
    G2: { t: "choice", o: [["ia", "Foi feito com inteligência artificial"], ["designer", "Foi feito por um designer"], ["eu", "Fiz eu mesma"], ["nao_sei", "Não sei / não lembro"]] },
    G4: { t: "multi", o: [["ludica", "Lúdica"], ["acolhedora", "Acolhedora"], ["educacional", "Educacional"], ["regional", "Regional (cultura maranhense)"], ["artesanal", "Artesanal"], ["moderna", "Moderna"]] },
    G5: { t: "multi", o: [["fotos", "Fotos profissionais"], ["capas", "Capas em alta resolução"], ["videos", "Vídeos"], ["nada", "Quase nada"]] },
    G6: { t: "choice", o: [["eu", "Só eu"], ["marketing", "Eu e a agência de marketing"], ["mais", "Mais gente opina"]] },
    G7: { t: "choice", o: YN.slice() },
    G8: { t: "multi", o: [["animacoes", "Animações"], ["materiais", "Materiais infantis"], ["produtos", "Produtos (camisa, caderno)"], ["nao", "Só no site e redes"]] },

    // ---------- H. Conteúdo e painel ----------
    H1: { t: "multi", o: [["inicio", "Início"], ["sobre", "Sobre a autora"], ["livros", "Livros"], ["sequencias", "Sequências didáticas"], ["cursos", "Cursos"], ["palestras", "Palestras e formação"], ["agenda", "Agenda"], ["videos", "Vídeos"], ["textos", "Textos (blog)"], ["contato", "Contato"]] },
    H2: { t: "multi", o: [["produtos", "Produtos e preços"], ["estoque", "Estoque"], ["textos", "Textos do site"], ["videos", "Vídeos"], ["banners", "Banners"], ["depoimentos", "Depoimentos"], ["blog", "Textos do blog"]] },
    H3: { t: "choice", o: [["eu", "Eu mesma"], ["assistente", "Uma assistente"], ["agencia", "A agência de marketing"], ["varios", "Mais de uma pessoa"]] },
    H4: { t: "multi", o: [["canva", "Canva"], ["planilhas", "Planilhas"], ["wordpress", "WordPress"], ["nenhum", "Nenhum, uso só celular"]] },
    H5: { t: "choice", o: [
      ["sem_login", "Não, envio o material depois da compra", "Sem contas de usuário."],
      ["login", "Sim, quero que baixem na área deles", "Login de comprador e área restrita."],
      ["nao_sei", "Não sei"]]},
    H6: { t: "choice", o: [["nao", "Não precisa, são poucos itens"], ["busca", "Só busca por nome"], ["filtros", "Filtros por etapa, disciplina e tema", "Catálogo organizado por etiquetas."]] },
    H7: { t: "choice", o: [["tenho", "Tenho, com autorização"], ["sem_aut", "Tenho, mas sem autorização"], ["nao", "Não tenho"]] },
    H8: { t: "choice", o: [["sim_aut", "Sim, com autorização"], ["sem_aut", "Sim, mas não tenho autorização"], ["nao", "Não quero galeria"]] },
    H9: { t: "choice", o: YN.slice() },
    H10: { t: "choice", o: [["sim", "Sim, quero um blog/área de textos", "Entra o ramo de textos próprios."], ["depois", "Depois do lançamento"], ["nao", "Não"]] },
    H11: { t: "choice", o: YN.slice() },
    H12: { t: "choice", o: [["pt", "Só em português"], ["ingles", "Português e inglês"], ["outras", "Outros idiomas"]] },
    H13: { t: "choice", o: [["ate10", "Até 10 produtos"], ["10a30", "De 10 a 30 produtos"], ["30mais", "Mais de 30 produtos"]] },
    H15: { t: "choice", o: [["so_eu", "Só eu"], ["assistente", "Uma assistente"], ["agencia", "A agência de marketing"], ["varios", "Mais de uma pessoa", "Painel com vários logins."]] },

    // ---------- O. Textos próprios, alunos e interação ----------
    O2: { t: "choice", o: [
      ["reservados", "Leitura livre, todos os direitos reservados", "Aviso legal de direitos autorais no rodapé de cada texto."],
      ["cc_by_nc", "Pode copiar e compartilhar, citando a autoria, sem uso comercial (Creative Commons)", "Selo de licença aberta em cada texto."],
      ["cc_by", "Aberto, até uso comercial, citando a autoria (Creative Commons)"],
      ["nao_sei", "Preciso entender melhor antes"]]},
    O3: { t: "choice", o: [["eu", "Só eu, quando der"], ["eu_agenda", "Só eu, com rascunho e agendamento", "Painel com rascunho/agendamento."], ["assistente", "Eu e uma assistente"], ["agencia", "A agência de marketing"]] },
    O4: { t: "multi", o: [["tema", "Por tema"], ["etapa", "Por etapa/idade"], ["serie", "Por série"], ["data", "Por data"], ["busca", "Quero busca"], ["etiquetas", "Quero etiquetas"]] },
    O5: { t: "choice", o: [
      ["pagina", "Ler na própria página"],
      ["pdf", "Só PDF para baixar"],
      ["ambos", "Ler na página e baixar em PDF", "Cada texto vira página e PDF."],
      ["midia", "Ler, baixar e ter áudio/imagens", "Mais arquivos para hospedar e cadastrar."]]},
    O6: { t: "choice", o: [["sim", "Sim, cada texto indica livros e sequências relacionados", "Cada texto liga ao catálogo."], ["pouco", "Só uma chamada geral"], ["nao", "Não, os textos ficam à parte"]] },
    O8: { t: "choice", o: [
      ["fora", "Só leem no site e entregam o resumo fora", "O site só publica textos; sem envio de aluno."],
      ["privado", "Enviam pelo site e só eu vejo", "Formulário de envio e fila privada: exige moderação e proteção de dados."],
      ["publico", "Enviam pelo site e os resumos ficam públicos", "Exige moderação e atenção à LGPD/ECA para menores."]]},
    O9: { t: "choice", o: [["eu", "Eu confiro e marco os pontos"], ["comprovante", "O aluno mostra o envio e eu marco"], ["auto", "O site registra que o aluno leu e enviou", "Controle de turma e relatório de envios."]] },
    O10: { t: "choice", o: [
      ["nome_turma", "Nome e turma", "Formulário simples; sem conta."],
      ["codigo", "Código da turma que eu entrego", "Códigos por turma, revogáveis."],
      ["menores", "Há alunos com menos de 12 anos", "Exige consentimento do responsável e cuidado extra com dados."],
      ["nao_sei", "Ainda não defini"]]},
    O11: { t: "choice", o: [["so_eu", "Só eu vejo"], ["turma", "Visível para a turma"], ["publico", "Visível para todos"], ["selecionados", "Só os selecionados por mim"]] },
    O12: { t: "choice", o: [["sem", "Sem curtir"], ["curtir", "Curtir sem cadastro, com contador visível", "Curtir simples, com proteção contra abuso."], ["curtir_oculto", "Curtir sem mostrar o número", "Só eu vejo o total."]] },
    O13: { t: "choice", o: [
      ["sem", "Sem comentários", "Fora de escopo: sem moderação e sem LGPD extra."],
      ["aprovacao", "Qualquer pessoa, mas só aparece depois da minha aprovação", "Fila de moderação e proteção contra spam."],
      ["turma", "Só alunos da turma (com código)", "Código de turma e moderação mais leve."],
      ["aberto", "Qualquer pessoa, aparece na hora", "Alto risco de spam e conteúdo impróprio; não recomendado."]]},
    O14: { t: "choice", o: [["eu", "Eu mesma, todo dia"], ["semana", "Eu mesma, algumas vezes por semana"], ["assistente", "Uma assistente"], ["nao_sei", "Ainda não sei"]] },
    O15: { t: "choice", o: [
      ["apelido", "(a) Sem cadastro: apelido, com aprovação", "Sem contas; moderação alta."],
      ["codigo", "(b) Código da turma que eu entrego", "Sem contas individuais; alinhado à atividade."],
      ["login", "(c) Login com e-mail ou Google", "Contas de usuário e regras para menores."],
      ["nao_sei", "Ainda não sei, preciso de ajuda para decidir"]]},
    O16: { t: "choice", o: [["sim_aut", "Sim, com autorização da escola ou dos pais"], ["so_eu", "Não, só eu leio o que eles enviarem"], ["nao_menores", "Não terão acesso a comentários"], ["nao_sei", "Não sei"]] },
    O17: { t: "choice", o: [["email", "Por e-mail"], ["whatsapp", "Por WhatsApp"], ["nao", "Não precisa; eu olho no painel"]] },
    O18: { t: "choice", o: [["sim", "Sim, quero abrir para outras professoras"], ["depois", "Talvez no futuro"], ["nao", "Não"]] },
    O19: { t: "choice", o: [["avalio", "Prefiro avaliar tudo pessoalmente"], ["regra", "Quero uma regra clara para os alunos"], ["nao_preocupa", "Não me preocupa"]] },
    O20: { t: "choice", o: [["sim", "Sim, aceito política de privacidade"], ["minimo", "Só o mínimo (apelido, sem e-mail)"], ["nao", "Prefiro não guardar nada"]] },

    // ---------- I. Redes ----------
    I1: { t: "choice", o: [["eu", "Eu administro"], ["agencia", "A agência administra"], ["ambos", "Eu e a agência"]] },
    I2: { t: "choice", o: [["publicos", "Públicos"], ["ocultos", "Ocultos (só quem tem o link)"], ["pagos", "Só para quem pagou"], ["nao_ha", "Ainda não há vídeos"]] },
    I3: { t: "choice", o: [["existe", "Já existe"], ["breve", "Vou abrir em breve"], ["depois", "Só depois do site"], ["nao", "Não pretendo"]] },
    I4: { t: "choice", o: [["email", "Tenho lista de e-mails"], ["whatsapp", "Tenho lista de WhatsApp"], ["ambas", "Tenho as duas"], ["nenhuma", "Não tenho"]] },
    I5: { t: "choice", o: YN.slice() },
    I6: { t: "multi", o: [["facebook", "Facebook"], ["tiktok", "TikTok"], ["linkedin", "LinkedIn"], ["youtube", "YouTube"], ["nenhuma", "Nenhuma outra"]] },
    I7: { t: "choice", o: [["sim", "Sim, quero acompanhar visitas e vendas", "Ferramenta de análise e aviso de cookies."], ["nao", "Não por enquanto"], ["nao_sei", "Não sei"]] },

    // ---------- J. Domínio e hospedagem ----------
    J1: { t: "choice", o: [["cpf", "No meu CPF"], ["cnpj", "No meu CNPJ"], ["nao_sei", "Não sei"]] },
    J2: { t: "choice", o: [["nada", "Não tenho nada"], ["dominio", "Tenho domínio"], ["site", "Tenho site/blog para migrar"], ["email", "Tenho e-mail profissional"]] },
    J3: { t: "choice", o: [["ate30", "Até R$ 30 por mês"], ["30a80", "De R$ 30 a R$ 80 por mês"], ["80a200", "De R$ 80 a R$ 200 por mês"], ["200mais", "Mais de R$ 200 por mês"], ["nao_sei", "Não sei"]] },
    J4: { t: "choice", o: [["eu", "Tudo no meu nome"], ["voce", "Fica no seu nome por enquanto"], ["nao_sei", "Não sei"]] },
    J5: { t: "choice", o: [["voce", "Você (mensalidade de manutenção)"], ["eu", "Eu mesma"], ["agencia", "A agência"], ["nao_sei", "Não sei"]] },
    J6: { t: "choice", o: YN.slice() },
    J7: { t: "choice", o: [["dolar", "Tenho cartão que aceita dólar"], ["reais", "Prefiro pagar em reais (Pix/boleto)", "Escolha de serviços que cobram em reais."], ["nao_sei", "Não sei"]] },

    // ---------- K. Orçamento e prazo ----------
    K1: { t: "choice", o: [["ate1", "Até R$ 1.500"], ["1a3", "De R$ 1.500 a R$ 3.000"], ["3a6", "De R$ 3.000 a R$ 6.000"], ["6mais", "Mais de R$ 6.000"], ["definir", "Preciso ver propostas"]] },
    K2: { t: "choice", o: [["sim", "Sim, vitrine primeiro e a loja depois", "MVP: vitrine, textos e formulários."], ["nao", "Não, quero tudo de uma vez", "Escopo e prazo maiores."], ["nao_sei", "Preciso conversar sobre isso"]] },
    K3: { t: "choice", o: [["1h", "Até 1 hora por semana"], ["2a4", "De 2 a 4 horas por semana"], ["5mais", "Mais de 5 horas por semana"]] },
    K4: { t: "multi", o: [["feira", "Feira do livro"], ["lancamento", "Lançamento de livro"], ["aulas", "Início das aulas"], ["nenhuma", "Sem data importante"]] },
    K5: { t: "choice", o: [["etapas", "Por etapa"], ["parcelado", "Parcelado"], ["avista", "À vista"]] },
    K6: { t: "choice", o: [["eu", "Só eu"], ["com_agencia", "Eu e a agência de marketing"], ["familia", "Eu e a família"], ["editora", "Eu e a editora"]] },
    K7: { t: "multi", o: [["produtos", "Atualizar produtos"], ["correcoes", "Corrigir problemas"], ["suporte", "Suporte por WhatsApp"], ["backup", "Backup e segurança"], ["melhorias", "Melhorias novas"]] },
    K8: { t: "choice", o: YN.slice() },
    K9: { t: "choice", o: [["whatsapp", "WhatsApp"], ["video", "Videochamada"], ["presencial", "Presencial"], ["email", "E-mail"]] },
    K11: { t: "choice", o: [["pf", "Eu, pessoa física"], ["cnpj", "Meu CNPJ"], ["nao_sei", "Não sei"]] },
    K13: { t: "choice", o: [["direto", "Direto ao provedor"], ["mensalidade", "Incluído na mensalidade"], ["nao_sei", "Não sei"]] },

    // ---------- L. Privacidade ----------
    L1: { t: "multi", o: [["contato", "Formulário de contato"], ["pedidos", "Pedidos"], ["newsletter", "Newsletter"], ["analise", "Análise de visitas"], ["alunos", "Dados de alunos (nome/turma)"]] },
    L2: { t: "choice", o: [["adultos", "Adultos (professores, pais)"], ["criancas", "Crianças também usarão", "Regras rígidas de privacidade infantil."], ["ambos", "Os dois, com mediação de adultos"]] },
    L3: { t: "choice", o: [["sim_aut", "Sim, com autorização"], ["sem_aut", "Sim, sem autorização formal"], ["nao", "Não vou publicar"]] },
    L4: { t: "choice", o: [["advogado", "Advogado"], ["contador", "Contador"], ["modelo", "Modelo pronto"], ["nao_sei", "Não sei"]] },
    L5: { t: "choice", o: [["7dias", "Arrependimento em 7 dias (digital e físico)"], ["fisico", "Troca só para livro físico"], ["nao_sei", "Preciso definir"]] },
    L6: { t: "choice", o: YN.slice() },
    L7: { t: "multi", o: [["leitor", "Leitor de tela"], ["contraste", "Alto contraste"], ["legenda", "Legendas nos vídeos"], ["nenhuma", "Nenhuma necessidade especial"]] }
  };

  // Novas perguntas (não vieram do docx). `after` indica a pergunta que ela deve seguir na seção.
  window.NEW_QUESTIONS = [
    { sec: "G", after: "G9", inTab: "marca", id: "G10", q: "Qual destas direções mais combina com você e com o seu público?", why: "Define o estilo geral de logo, cores e tipografia", prio: "Bloqueia", ans: "",
      t: "choice", o: [["artesanal", "Artesanal e acolhedora", "Visual de cesto, texturas feitas à mão e cores terrosas."], ["ludica", "Lúdica e infantil", "Cores fortes e mascote em destaque: fala direto com crianças."], ["editorial", "Editorial e institucional", "Sóbrio e clássico: passa credibilidade a escolas e secretarias."], ["organico", "Moderno orgânico", "Linhas limpas com calor artesanal."], ["nao_sei", "Ainda não sei"]] },
    { sec: "G", after: "G10", inTab: "marca", id: "G11", q: "O que você quer fazer com o personagem (mascote)?", why: "Mascote é arte original que ainda não está registrada", prio: "Bloqueia", ans: "",
      t: "choice", o: [["manter", "Manter o personagem como está", "Mascote aparece no site e nos materiais; vale conferir autoria e registrar a marca mista."], ["simplificar", "Manter, mas simplificado", "Mascote menor e mais limpo; funciona melhor em tamanho pequeno."], ["sem", "Sem personagem: só o cofo", "Menos arte para produzir e menos risco de direitos."], ["nao_sei", "Ainda não sei"]] },
    { sec: "G", after: "G11", inTab: "marca", id: "G12", q: "Qual deve ser a cara principal da marca no site?", why: "Decide o que vai no topo do site e nas redes", prio: "Importante", ans: "",
      t: "choice", o: [["mascote", "O mascote com o nome"], ["cofo", "O cesto (cofo) com livros e o nome"], ["nome", "Só o nome, em letras"], ["nao_sei", "Ainda não sei"]] },
    { sec: "G", after: "G12", inTab: "marca", id: "G13", q: "O que não pode mudar de jeito nenhum na marca?", why: "Limites para o trabalho de design", prio: "Importante", ans: "" },
    { sec: "G", after: "G13", inTab: "marca", id: "G14", q: "Outras ideias, cores ou referências que você gostaria de ver?", why: "Sugestões livres", prio: "Depois", ans: "" },
    { sec: "O", after: "O2", id: "O21", q: "Quando alguém ler um texto seu, o que você quer que aconteça depois?", why: "Ligação do texto livre com o resto do site", prio: "Importante", ans: "",
      t: "multi", o: [["catalogo", "Ver livros e sequências relacionados"], ["newsletter", "Deixar o e-mail para receber novidades"], ["compartilhar", "Compartilhar nas redes"], ["nada", "Nada, só ler"]] },
    { sec: "O", after: "O12", id: "O22", q: "Se houver curtidas, devem aparecer no texto, só para você, ou em um ranking dos mais curtidos?", why: "Prova social vs. privacidade", prio: "Depois", ans: "",
      t: "choice", o: [["texto", "Aparecer em cada texto"], ["so_eu", "Só eu vejo"], ["ranking", "Ranking dos mais curtidos"]] },
    { sec: "O", after: "O16", id: "O23", q: "Os alunos podem enviar o resumo sem avisar os pais? Ou você precisa de um aviso/autorização antes da atividade?", why: "Consentimento de responsáveis (LGPD/ECA)", prio: "Importante", ans: "",
      t: "choice", o: [["sem_aviso", "Pode enviar sem aviso"], ["aviso_escola", "Aviso pela escola"], ["autorizacao", "Autorização por escrito dos responsáveis"], ["nao_sei", "Não sei"]] }
  ];
})();
