/**
 * Exemplo de como usar a API Subject EduQi no Frontend
 * 
 * Este arquivo demonstra como fazer chamadas para a API
 * com autenticação JWT e CORS configurado.
 */

// Configuração base da API
const API_BASE_URL = 'http://localhost:8080';

// Classe para gerenciar a API
class SubjectEduQiAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('jwt_token') || null;
  }

  // Headers padrão para requisições
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // === AUTENTICAÇÃO ===

  // Registrar novo usuário
  async register(userData) {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(false),
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    const data = await response.json();
    this.token = data.access_token;
    localStorage.setItem('jwt_token', this.token);
    return data;
  }

  // Fazer login
  async login(credentials) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(false),
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    const data = await response.json();
    this.token = data.access_token;
    localStorage.setItem('jwt_token', this.token);
    return data;
  }

  // Fazer logout
  logout() {
    this.token = null;
    localStorage.removeItem('jwt_token');
  }

  // === SUBJECTS ===

  // Buscar todos os assuntos com hierarquia
  async getSubjects() {
    const response = await fetch(`${this.baseURL}/subjects`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch subjects: ${response.statusText}`);
    }

    return response.json();
  }

  // Buscar assunto por ID
  async getSubject(id) {
    const response = await fetch(`${this.baseURL}/subjects/${id}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch subject: ${response.statusText}`);
    }

    return response.json();
  }

  // Criar novo assunto
  async createSubject(subjectData) {
    const response = await fetch(`${this.baseURL}/subjects`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(subjectData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create subject: ${response.statusText}`);
    }

    return response.json();
  }

  // === SUBTOPICS ===

  // Buscar hierarquia completa de um assunto
  async getSubjectHierarchy(subjectId) {
    const response = await fetch(`${this.baseURL}/subtopics/hierarchy/${subjectId}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch hierarchy: ${response.statusText}`);
    }

    return response.json();
  }

  // Criar novo subtópico
  async createSubtopic(subtopicData) {
    const response = await fetch(`${this.baseURL}/subtopics`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(subtopicData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create subtopic: ${response.statusText}`);
    }

    return response.json();
  }
}

// === EXEMPLOS DE USO ===

// Criar instância da API
const api = new SubjectEduQiAPI();

// Exemplo de registro
async function exemploRegistro() {
  try {
    const userData = {
      email: 'usuario@exemplo.com',
      password: 'senha123',
      name: 'João Silva'
    };

    const result = await api.register(userData);
    console.log('Usuário registrado:', result);
  } catch (error) {
    console.error('Erro no registro:', error);
  }
}

// Exemplo de login
async function exemploLogin() {
  try {
    const credentials = {
      email: 'usuario@exemplo.com',
      password: 'senha123'
    };

    const result = await api.login(credentials);
    console.log('Login realizado:', result);
  } catch (error) {
    console.error('Erro no login:', error);
  }
}

// Exemplo de criação de estrutura hierárquica
async function exemploEstrutura() {
  try {
    // 1. Criar assunto
    const subject = await api.createSubject({
      name: 'Matemática',
      description: 'Assuntos de matemática do ensino médio'
    });

    // 2. Criar subtópico principal
    const algebra = await api.createSubtopic({
      name: 'Álgebra',
      description: 'Operações algébricas',
      subjectId: subject.id
    });

    // 3. Criar subtópico filho
    const equacoes = await api.createSubtopic({
      name: 'Equações',
      description: 'Equações de 1º e 2º grau',
      subjectId: subject.id,
      parentId: algebra.id
    });

    // 4. Buscar hierarquia completa
    const hierarchy = await api.getSubjectHierarchy(subject.id);
    console.log('Hierarquia criada:', hierarchy);

  } catch (error) {
    console.error('Erro na criação da estrutura:', error);
  }
}

// === HOOKS PARA REACT (OPCIONAL) ===

// Hook personalizado para autenticação (React)
function useAuth() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      // Aqui você pode validar o token ou buscar dados do usuário
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const result = await api.login(credentials);
      setUser(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    api.logout();
    setUser(null);
  };

  return { user, login, logout, loading };
}

// Hook para buscar assuntos (React)
function useSubjects() {
  const [subjects, setSubjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchSubjects() {
      try {
        const data = await api.getSubjects();
        setSubjects(data);
      } catch (error) {
        console.error('Erro ao buscar assuntos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSubjects();
  }, []);

  return { subjects, loading, refetch: () => fetchSubjects() };
}

// Exportar para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SubjectEduQiAPI, useAuth, useSubjects };
}