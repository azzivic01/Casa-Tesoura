export interface NavItem {
  label: string;
  href: string;
}

export interface ActionLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: string;
}

export interface TeamMember {
  id: string;
  photoPlaceholder: string;
  name: string;
  specialty: string;
}

export interface WorkItem {
  id: string;
  title: string;
  category: 'Cortes' | 'Barbas' | 'Ambiente';
  image: string;
  alt: string;
  aspect: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteContent {
  header: {
    enabled: boolean;
    brand: string;
    nav: NavItem[];
    primaryAction: ActionLink;
  };
  hero: {
    enabled: boolean;
    kicker: string;
    title: string;
    description: string;
    primaryAction: ActionLink;
    secondaryAction: ActionLink;
    image: {
      src: string;
      alt: string;
    };
  };
  servicos: {
    enabled: boolean;
    title: string;
    description: string;
    caption: string;
    items: ServiceItem[];
    note: string;
  };
  equipe: {
    enabled: boolean;
    title: string;
    description: string;
    items: TeamMember[];
  };
  trabalhos: {
    enabled: boolean;
    title: string;
    description: string;
    categories: Array<'Todos' | 'Cortes' | 'Barbas' | 'Ambiente'>;
    items: WorkItem[];
  };
  agendar: {
    enabled: boolean;
    title: string;
    description: string;
    whatsappAction: ActionLink;
    notice: string;
    days: string[];
    slotsPerDay: Record<string, string[]>;
  };
  visite: {
    enabled: boolean;
    title: string;
    description: string;
    address: string;
    hours: string[];
    payment: string;
    mapPlaceholder: string;
  };
  faq: {
    enabled: boolean;
    title: string;
    description: string;
    items: FaqItem[];
  };
  rodape: {
    enabled: boolean;
    brand: string;
    tagline: string;
    cnpj: string;
    social: string;
    navLinks: NavItem[];
    reduceMotionLabel: string;
  };
  depoimentos: {
    enabled: boolean;
    items: unknown[];
  };
}

export const siteContent: SiteContent = {
  header: {
    enabled: true,
    brand: 'Casa Tesoura',
    nav: [
      { label: 'Serviços', href: '#servicos' },
      { label: 'Equipe', href: '#equipe' },
      { label: 'Trabalhos', href: '#trabalhos' },
      { label: 'Agendar', href: '#agendar' },
      { label: 'Perguntas', href: '#faq' },
    ],
    primaryAction: {
      label: 'Agendar',
      href: '[link do WhatsApp]',
    },
  },

  hero: {
    enabled: true,
    kicker: '[bairro, cidade]',
    title: 'OFÍCIO, NAVALHA E HORA MARCADA',
    description: 'Sem fila de espera, sem conversa fiada. A cadeira é sua no minuto combinado. Toalha quente, tesoura afiada e navalha no ponto.',
    primaryAction: {
      label: 'Agendar horário',
      href: '[link do WhatsApp]',
    },
    secondaryAction: {
      label: 'Ver serviços',
      href: '#servicos',
    },
    image: {
      src: '/src/assets/images/hero.jpg',
      alt: 'Ferramentas de aço sobre bancada de azulejo escuro com luz quente',
    },
  },

  servicos: {
    enabled: true,
    title: 'TABELA DE SERVIÇOS',
    description: 'Atendimento direto de balcão. Você escolhe o serviço e nós cuidamos do tempo na cadeira.',
    caption: 'Tabela oficial de serviços e estimativas de atendimento',
    items: [
      { id: 'srv-1', name: 'Corte', duration: '[duração]', price: '[R$ —]' },
      { id: 'srv-2', name: 'Barba', duration: '[duração]', price: '[R$ —]' },
      { id: 'srv-3', name: 'Corte + barba', duration: '[duração]', price: '[R$ —]' },
      { id: 'srv-4', name: 'Sobrancelha', duration: '[duração]', price: '[R$ —]' },
      { id: 'srv-5', name: 'Pigmentação', duration: '[duração]', price: '[R$ —]' },
      { id: 'srv-6', name: 'Hidratação', duration: '[duração]', price: '[R$ —]' },
    ],
    note: '[valores sujeitos a confirmação]',
  },

  equipe: {
    enabled: true,
    title: 'QUEM ESTÁ NA BANCADA',
    description: 'Profissionais dedicados ao ofício tradicional de barbearia.',
    items: [
      {
        id: 'eq-1',
        photoPlaceholder: '[foto]',
        name: '[nome do profissional]',
        specialty: '[especialidade]',
      },
      {
        id: 'eq-2',
        photoPlaceholder: '[foto]',
        name: '[nome do profissional]',
        specialty: '[especialidade]',
      },
      {
        id: 'eq-3',
        photoPlaceholder: '[foto]',
        name: '[nome do profissional]',
        specialty: '[especialidade]',
      },
    ],
  },

  trabalhos: {
    enabled: true,
    title: 'TRABALHOS DA CASA',
    description: 'Registros do cotidiano na bancada: cortes, navalha e ambiente de trabalho.',
    categories: ['Todos', 'Cortes', 'Barbas', 'Ambiente'],
    items: [
      {
        id: 'trab-1',
        title: 'Corte na tesoura e acabamento',
        category: 'Cortes',
        image: '/src/assets/images/corte.jpg',
        alt: 'Detalhe em close de tesoura de aço e pente em corte de cabelo',
        aspect: '4/3',
      },
      {
        id: 'trab-2',
        title: 'Barba tradicional e toalha quente',
        category: 'Barbas',
        image: '/src/assets/images/barba.jpg',
        alt: 'Navalha de aço, espuma densa e toalha quente sobre bancada',
        aspect: '4/3',
      },
      {
        id: 'trab-3',
        title: 'Bancada e espelho de trabalho',
        category: 'Ambiente',
        image: '/src/assets/images/ambiente.jpg',
        alt: 'Bancada de azulejo escuro com espelho e iluminação pontual de ofício',
        aspect: '4/3',
      },
    ],
  },

  agendar: {
    enabled: true,
    title: 'RESERVE SUA CADEIRA',
    description: 'Atendimento estritamente por hora marcada. Você agenda com antecedência e não fica esperando na calçada.',
    whatsappAction: {
      label: 'Agendar pelo WhatsApp',
      href: '[link do WhatsApp]',
    },
    notice: 'Exemplo visual. Os horários reais serão combinados pelo WhatsApp.',
    days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    slotsPerDay: {
      Seg: ['[horário]', '[horário]', '[horário]', '[horário]'],
      Ter: ['[horário]', '[horário]', '[horário]', '[horário]'],
      Qua: ['[horário]', '[horário]', '[horário]', '[horário]'],
      Qui: ['[horário]', '[horário]', '[horário]', '[horário]'],
      Sex: ['[horário]', '[horário]', '[horário]', '[horário]'],
      Sáb: ['[horário]', '[horário]', '[horário]', '[horário]'],
    },
  },

  visite: {
    enabled: true,
    title: 'ONDE ESTAMOS',
    description: 'Fácil acesso no bairro, portas abertas nos horários de atendimento.',
    address: '[endereço]',
    hours: [
      '[dia] — [horário]',
      '[dia] — [horário]',
      '[dia] — [horário]',
      '[dia] — [horário]',
    ],
    payment: '[forma de pagamento]',
    mapPlaceholder: '[mapa]',
  },

  faq: {
    enabled: true,
    title: 'PERGUNTAS FREQUENTES',
    description: 'Tire suas dúvidas antes de vir para a barbearia.',
    items: [
      {
        id: 'faq-1',
        question: 'Precisa agendar com antecedência?',
        answer: 'Sim, trabalhamos exclusivamente com hora marcada para respeitar o tempo de cada cliente e evitar filas na porta.',
      },
      {
        id: 'faq-2',
        question: 'Qual é o tempo médio de cada serviço?',
        answer: 'Cada serviço possui sua previsão informada na tabela. Chegue com 5 minutos de antecedência para acomodação.',
      },
      {
        id: 'faq-3',
        question: 'Como funciona se eu precisar cancelar?',
        answer: 'Avisos de cancelamento ou remarcação seguem a nossa regra: [política].',
      },
      {
        id: 'faq-4',
        question: 'Quais são as formas de pagamento aceitas?',
        answer: 'Aceitamos as opções disponíveis no balcão: [forma de pagamento].',
      },
      {
        id: 'faq-5',
        question: 'Quais produtos e cosméticos são utilizados?',
        answer: 'Utilizamos produtos e lâminas selecionadas da linha [marca], com higiene individual em cada atendimento.',
      },
    ],
  },

  rodape: {
    enabled: true,
    brand: 'Casa Tesoura',
    tagline: 'Barbearia de bairro com atendimento por hora marcada.',
    cnpj: '[CNPJ]',
    social: '[redes sociais]',
    navLinks: [
      { label: 'Serviços', href: '#servicos' },
      { label: 'Equipe', href: '#equipe' },
      { label: 'Trabalhos', href: '#trabalhos' },
      { label: 'Agendar', href: '#agendar' },
      { label: 'Perguntas', href: '#faq' },
    ],
    reduceMotionLabel: 'Reduzir animações',
  },

  depoimentos: {
    enabled: false,
    items: [],
  },
};
