--
-- Banco de Dados: `overtech`
--

CREATE DATABASE overtech;
USE overtech;

-- --------------------------------------------------------

--
-- Estrutura da tabela `answers`
--

CREATE TABLE IF NOT EXISTS `answers` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `id_user` int(255) NOT NULL,
  `id_question` int(255) NOT NULL,
  `user_name` text NOT NULL,
  `answer` text NOT NULL,
  `creation_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `course` int(3) NOT NULL,
  `semester` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=280 ;

--
-- Extraindo dados da tabela `categories`
--

INSERT INTO `categories` (`id`, `name`, `course`, `semester`) VALUES
(1, 'Programação em Microinformática', 1, 1),
(2, 'Algorítmos e Lógica de Programação', 1, 1),
(3, 'Arquitetura e Organização de Computadores', 1, 1),
(4, 'Sistemas de Informação', 1, 1),
(5, 'Administração Geral\r\n', 1, 1),
(6, 'Matemática Discreta', 1, 1),
(7, 'Comunicação e Expressão', 1, 1),
(8, 'Inglês I', 1, 1),
(9, 'Engenharia de Software I', 1, 2),
(10, 'Linguagem de Programação', 1, 2),
(11, 'Laboratório de Hardware', 1, 2),
(12, 'Sistemas Operacionais I', 1, 2),
(13, 'Eletiva I: Programação de Scripts', 1, 2),
(14, 'Contabilidade', 1, 2),
(15, 'Estatística aplicada', 1, 2),
(16, 'Cálculo', 1, 2),
(17, 'Inglês II', 1, 2),
(18, 'Engenharia de Software II', 1, 3),
(19, 'Interação Humano Computador', 1, 3),
(20, 'Estruturas de Dados', 1, 3),
(21, 'Sistemas Operacionais II', 1, 3),
(22, 'Banco de Dados', 1, 3),
(23, 'Eletiva II: Linguagem de Programação IV', 1, 3),
(24, 'Economia e Finanças', 1, 3),
(25, 'Programação Linear e Aplicações', 1, 3),
(26, 'Inglês III', 1, 3),
(27, 'Engenharia de Software III', 1, 4),
(28, 'Programação Orientada a Objetos', 1, 4),
(29, 'Redes de Computadores', 1, 4),
(30, 'Segurança da Informação', 1, 4),
(31, 'Escolha I: Laboratório de Banco de Dados', 1, 4),
(32, 'Gestão de Projetos', 1, 4),
(33, 'Sociedade e Tecnologia', 1, 4),
(34, 'Inglês IV', 1, 4),
(35, 'Laboratório de Engenharia de Software', 1, 5),
(36, 'Gestão de Equipes', 1, 5),
(37, 'Escolha II: Tópicos Especiais em Informática', 1, 5),
(38, 'Empreendedorismo', 1, 5),
(39, 'Metodologia da Pesquisa Científico-Tecnológica', 1, 5),
(40, 'Inglês V', 1, 5),
(41, 'Gestão e Governança de Tecnologia da Informação', 1, 6),
(42, 'Escolha III: Inteligência Artificial', 1, 6),
(43, 'Ética e Responsabilidade Profissional', 1, 6),
(44, 'Inglês VI', 1, 6),
(45, 'Algoritmos', 2, 1),
(46, 'Fundamentos da Tecnologia da Informação', 2, 1),
(47, 'Processos Gerenciais', 2, 1),
(48, 'Matemática Discreta', 2, 1),
(49, 'Comunicação e Expressão', 2, 1),
(50, 'Atividades Acadêmico Científico-culturais I', 2, 1),
(51, 'Inglês I', 2, 1),
(52, 'Atividades de Projetos I(Modelagem de Processos)', 2, 2),
(53, 'Linguagens de Programação', 2, 2),
(54, 'Laboratório de Hardware', 2, 2),
(55, 'Gestão de Sistemas Operacionais', 2, 2),
(56, 'Matemática Financeira', 2, 2),
(57, 'Metodologia da Pesquisa Científico-Tecnológica', 2, 2),
(58, 'Atividades Acadêmico Científico-culturais II', 2, 2),
(59, 'Modelagem de Processos', 2, 2),
(60, 'Inglês II', 2, 2),
(61, 'Atividade de Projetos II(Engenharia de Software e Aplicações)', 2, 3),
(62, 'Atividade de Projetos III(Banco de dados e Aplicações)', 2, 3),
(63, 'Engenharia de Software e Aplicações', 2, 3),
(64, 'Banco de dados e Aplicações', 2, 3),
(65, 'Gestão de Pessoas', 2, 3),
(66, 'Estatística', 2, 3),
(67, 'Contabilidade', 2, 3),
(68, 'Gestão Ambiental', 2, 3),
(69, 'Inglês III', 2, 3),
(70, 'Atividade de Projetos IV(Programação para a Internet)', 2, 4),
(71, 'Programação para a Internet', 2, 4),
(72, 'Redes de Computadores', 2, 4),
(73, 'Gestão Financeira', 2, 4),
(74, 'Gestão da Produção', 2, 4),
(75, 'Fundamentos de Marketing', 2, 4),
(76, 'Inglês IV', 2, 4),
(77, 'Atividade de Projetos V(Sistemas Integrados da Informação)', 2, 5),
(78, 'Gestão da Tecnologia da Informação', 2, 5),
(79, 'Sistemas Integrados de Informação', 2, 5),
(80, 'Gestão de Projetos', 2, 5),
(81, 'Planejamento e Gestão Estratégica', 2, 5),
(82, 'Projetos de Tecnologia da Informação I', 2, 5),
(83, 'Inglês V', 2, 5),
(84, 'Atividade de Projetos VI(Projetos de Tecnologia da Informação II)', 2, 6),
(85, 'Tópicos Avançados em Tecnologia da Informação', 2, 6),
(86, 'Inteligência de Negócios', 2, 6),
(87, 'Inteligência de Negócios', 2, 6),
(88, 'Negócios Eletrônicos', 2, 6),
(89, 'Gestão Econômica', 2, 6),
(90, 'Legislação Aplicada a Tecnologia da Informação', 2, 6),
(91, 'Projetos de Tecnologia da Informação II', 2, 6),
(92, 'Inglês VI', 2, 6),
(93, 'Ecologia', 3, 1),
(94, 'Estratégia e Planejamento Energético', 3, 1),
(95, 'Gestão Ambiental e Sistemas de Qualidade', 3, 1),
(96, 'Administração Geral', 3, 1),
(97, 'Cálculo', 3, 1),
(98, 'Leitura e Produção de Texto', 3, 1),
(99, 'Inglês I', 3, 1),
(100, 'Química Ambiental', 3, 2),
(101, 'Poluição Ambiental I', 3, 2),
(102, 'Economia dos Recursos Naturais e Sustentabilidade', 3, 2),
(103, 'Estatística', 3, 2),
(104, 'Informática', 3, 2),
(105, 'Direito Ambiental', 3, 2),
(106, 'Metodologia da Pesquisa Científico-Tecnológica', 3, 2),
(107, 'Inglês II', 3, 2),
(108, 'Climatologia e Meteorologia', 3, 3),
(109, 'Poluição Ambiental II', 3, 3),
(110, 'Gerenciamento de Resíduos', 3, 3),
(111, 'Planejamento Ambiental', 3, 3),
(112, 'Custos Ambientais', 3, 3),
(113, 'Otimização dos Recursos Ambientais', 3, 3),
(114, 'Sistema de Informação Geográfica', 3, 3),
(115, 'Inglês III', 3, 3),
(116, 'Estudo de Impacto Ambiental', 3, 4),
(117, 'Poluição Ambiental III', 3, 4),
(118, 'Saneamento Ambiental', 3, 4),
(119, 'EIA – RIMA', 3, 4),
(120, 'Modelagem de Sistemas Ambientais', 3, 4),
(121, 'Saúde e segurança Ocupacional', 3, 4),
(122, 'Inglês IV', 3, 4),
(123, 'Toxicologia Ambiental', 3, 5),
(124, 'Microbiologia Ambiental', 3, 5),
(125, 'Monitoramento da Qualidade Ambiental', 3, 5),
(126, 'Educação e Ética Ambiental', 3, 5),
(127, 'Saúde Pública e Meio Ambiente', 3, 5),
(128, 'Auditoria Ambiental', 3, 5),
(129, 'Gestão de Áreas Naturais', 3, 5),
(130, 'Projeto de graduação I', 3, 5),
(131, 'Inglês V', 3, 5),
(132, 'Recuperação de Áreas Degradadas', 3, 6),
(133, 'Projetos de Responsabilidade Sócioambientais', 3, 6),
(134, 'Licenciamento Ambiental', 3, 6),
(135, 'Gestão de Recursos Hídricos', 3, 6),
(136, 'Logística Ambiental', 3, 6),
(137, 'Sistemas Agro Industriais', 3, 6),
(138, 'Projeto de Graduação II', 3, 6),
(139, 'Inglês VI', 3, 6),
(140, 'Contabilidade', 4, 1),
(141, 'Administração Geral', 4, 1),
(142, 'Matemática', 4, 1),
(143, 'Informática Aplicada a Gestão', 4, 1),
(144, 'Sociedade, Internacionais Tecnologia e Inovação', 4, 1),
(145, 'Atividades Acadêmico-Científico-Culturais I', 4, 1),
(146, 'Comunicação e Expressão', 4, 1),
(147, 'Inglês I', 4, 1),
(148, 'Comportamento Organizacional', 4, 2),
(149, 'Sociologia das Organizações', 4, 2),
(150, 'Gestão Ambiental', 4, 2),
(151, 'Economia', 4, 2),
(152, 'Estatística Aplicada a Gestão', 4, 2),
(153, 'Métodos para a Produção do Conhecimento', 4, 2),
(154, 'Inglês II', 4, 2),
(155, 'Organização, Sistemas e Métodos', 4, 3),
(156, 'Gestão de Marketing', 4, 3),
(157, 'Gestão de Pessoas', 4, 3),
(158, 'Matemática Financeira', 4, 3),
(159, 'Sistemas de Informação', 4, 3),
(160, 'Inglês III', 4, 3),
(161, 'Planejamento de Marketing', 4, 4),
(162, 'Gestão Financeira', 4, 4),
(163, 'Logística', 4, 4),
(164, 'Direito Empresarial', 4, 4),
(165, 'Comunicação Empresarial Geral', 4, 4),
(166, 'Inglês IV', 4, 4),
(167, 'Gestão de Projetos Empresariais', 4, 5),
(168, 'Análise de Investimentos', 4, 5),
(169, 'Gestão da Produção', 4, 5),
(170, 'Fundamentos da Gestão da Qualidade', 4, 5),
(171, 'Projeto de Trabalho de Graduação', 4, 5),
(172, 'Espanhol I', 4, 5),
(173, 'Inglês V', 4, 5),
(174, 'Desenvolvimento de Negócios', 4, 6),
(175, 'Planejamento e Gestão Estratégica', 4, 6),
(176, 'Negócios Internacionais', 4, 6),
(177, 'Sistemas Integrados de Gestão', 4, 6),
(178, 'Espanhol II', 4, 6),
(179, 'Inglês VI', 4, 6),
(180, 'Projeto Integrador de Eventos I', 5, 1),
(181, 'Introdução a Eventos e Hospitalidade', 5, 1),
(182, 'Relações do Espaço Geográfico', 5, 1),
(183, 'Métod. p/ Produção do Conhecimento', 5, 1),
(184, 'Tecnologia da Informação', 5, 1),
(185, 'Leitura e Produção de Textos', 5, 1),
(186, 'Espanhol I', 5, 1),
(187, 'Inglês I', 5, 1),
(188, 'Projeto Integrador de Eventos II', 5, 2),
(189, 'Gestão do Patrimônio Cultural', 5, 2),
(190, 'Planejamento e Organização de Eventos', 5, 2),
(191, 'Cerimonial', 5, 2),
(192, 'Sociedade, Tecnologia e Inovação', 5, 2),
(193, 'Fund. de Administração Geral', 5, 2),
(194, 'Fund. Matemática Financeira', 5, 2),
(195, 'Espanhol II', 5, 2),
(196, 'Inglês II', 5, 2),
(197, 'Projeto Integrador de Eventos III', 5, 3),
(198, 'Alimentos e Bebidas', 5, 3),
(199, 'Fund. de Gestão de Pessoas', 5, 3),
(200, 'Gestão de Marketing de Serviços', 5, 3),
(201, 'Relações Internacionais - Geopolítica', 5, 3),
(202, 'Fundamentos de Economia', 5, 3),
(203, 'Estatística Descritiva', 5, 3),
(204, 'Estatística Descritiva', 5, 3),
(205, 'Espanhol III', 5, 3),
(206, 'Inglês III', 5, 3),
(207, 'Projeto Integrador de Eventos IV', 5, 4),
(208, 'Ambientação de Espaços Físicos', 5, 4),
(209, 'Contabilidade Gerencial', 5, 4),
(210, 'Gestão de Projetos', 5, 4),
(211, 'Design Gráfico', 5, 4),
(212, 'Espanhol IV', 5, 4),
(213, 'Inglês IV', 5, 4),
(214, 'Projeto Integrador de Eventos V', 5, 5),
(215, 'Captação de Eventos e Recursos', 5, 5),
(216, 'Políticas Pùblicas, Eventos e Hospitalidade', 5, 5),
(217, 'Técnicas de Oratória ', 5, 5),
(218, 'Plano de Negócio', 5, 5),
(219, 'Fundamentos de Logística Aplicada', 5, 5),
(220, 'Direito aplicado a Eventos', 5, 5),
(221, 'Italiano I', 5, 5),
(222, 'Inglês V', 5, 5),
(223, 'Projeto Integrador de Eventos VI', 5, 6),
(224, 'Gestão Ambiental em Eventos', 5, 6),
(225, 'Relações Públicas', 5, 6),
(226, 'Planejamento de Atividades de Lazer', 5, 6),
(227, 'Produção Audiovisual', 5, 6),
(228, 'Ergonomia Aplicada ao Trabalho', 5, 6),
(229, 'Italiano II', 5, 6),
(230, 'Inglês VI', 5, 6),
(231, 'Inglês I', 6, 1),
(232, 'Comunicação e Expressão', 6, 1),
(233, 'Métodos para a Produção de Conhecimento', 6, 1),
(234, 'Administração Geral', 6, 1),
(235, 'Logística', 6, 1),
(236, 'Calculo I', 6, 1),
(237, 'Informática Básica', 6, 1),
(238, 'Projeto Interdisciplinar I', 6, 1),
(239, 'Inglês II', 6, 2),
(240, 'Espanhol I', 6, 2),
(241, 'Fundamentos da Gestão da Qualidade', 6, 2),
(242, 'Contabilidade', 6, 2),
(243, 'Matemática Financeira', 6, 2),
(244, 'Calculo Diferencial e Integral', 6, 2),
(245, 'Estatística Aplicada à Gestão', 6, 2),
(246, 'Modalidade e Intermodalidade', 6, 2),
(247, 'Projeto Interdisciplinar II', 6, 2),
(248, 'Inglês III', 6, 3),
(249, 'Espanhol II', 6, 3),
(250, 'Gestão de Produção e Operações', 6, 3),
(251, 'Gestão de Equipes', 6, 3),
(252, 'Economia e Finanças Empresariais', 6, 3),
(253, 'Gestão Tributária nas Operações Logísticas', 6, 3),
(254, 'Pesquisa Operacional', 6, 3),
(255, 'Projeto Interdisciplinar III', 6, 3),
(256, 'Inglês IV', 6, 4),
(257, 'Eletiva I', 6, 4),
(258, 'Fundamentos de Marketing', 6, 4),
(259, 'Gestão de Estoques', 6, 4),
(260, 'Custos e Tarifas Logísticos', 6, 4),
(261, 'Sistemas de Movimentação e Transporte', 6, 4),
(262, 'Métodos Quantitativos de Gestão', 6, 4),
(263, 'Projeto Interdisciplinar IV', 6, 4),
(264, 'Inglês V', 6, 5),
(265, 'Inovação e Empreendedorismo', 6, 5),
(266, 'Projeto Aplicado à Logística', 6, 5),
(267, 'Gestão da Cadeia de Suprimentos', 6, 5),
(268, 'Embalagens e Unitização', 6, 5),
(269, 'Movimentação e Armazenagem', 6, 5),
(270, 'Simulação em Logística', 6, 5),
(271, 'Projeto Interdisciplinar V', 6, 5),
(272, 'Inglês VI', 6, 6),
(273, 'Comércio Exterior e Logística', 6, 6),
(274, 'Gestão de Transporte de Carga e Roteirização', 6, 6),
(275, 'Tecnologia de Transportes', 6, 6),
(276, 'Transportes de Cargas Especiais', 6, 6),
(277, 'Eletiva II', 6, 6),
(278, 'Informação Aplicada à Logística', 6, 6),
(279, 'Projeto Interdisciplinar VI', 6, 6);

-- --------------------------------------------------------

--
-- Estrutura da tabela `courses`
--

CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Extraindo dados da tabela `courses`
--

INSERT INTO `courses` (`id`, `name`) VALUES
(1, 'Análise e Desenvolvimento de Sistemas'),
(2, 'Gestão de Tecnologia da Informação'),
(3, 'Gestão Ambiental'),
(4, 'Gestão Empresarial (EaD)'),
(5, 'Eventos'),
(6, 'Logística');

-- --------------------------------------------------------

--
-- Estrutura da tabela `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `id_category` int(255) NOT NULL,
  `id_user` int(255) NOT NULL,
  `user_name` text NOT NULL,
  `title` text NOT NULL,
  `body` text NOT NULL,
  `image_path` text,
  `creation_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `uploads`
--

CREATE TABLE IF NOT EXISTS `uploads` (
  `id_user` int(255) NOT NULL,
  `id_category` int(255) NOT NULL,
  `name` text CHARACTER SET utf8 NOT NULL,
  `matter` text NOT NULL,
  `type` text NOT NULL,
  `path` text NOT NULL,
  `creation_date` date NOT NULL,
  `id` int(255) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `course` int(200) NOT NULL,
  `semester` int(3) NOT NULL,
  `age` int(3) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `creation_date` date NOT NULL,
  `last_login` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `users_categories`
--

CREATE TABLE IF NOT EXISTS `users_categories` (
  `id_category` int(255) NOT NULL,
  `id_user` int(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;