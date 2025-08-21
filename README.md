 # 📡 API de Processamento de Vídeos com IA

Esta API permite o upload de vídeos, transcrição automática com o **Whisper Large v3** e aplicação de prompts de IA para gerar resumos, títulos, descrições, sugestões e muito mais — tudo via **requisições HTTP**. Ideal para integrações com frontends ou automações via scripts.

## 🚀 Tecnologias Utilizadas

<p align="left">
  <img src="https://skillicons.dev/icons?i=nodejs,fastify,prisma" />
</p>

### 🤖 IA & Processamento de Linguagem
- 🟢 **Groq API** - Para processamento rápido de IA
- 🦙 **LLaMA** - Modelo de linguagem avançado
- 🎤 **Whisper Large v3** - Transcrição de alta precisão

## 📥 Instalação

```bash
# Clonar o repositório
git clone https://github.com/dev2Pedro/upload.ai-api

# Entrar na pasta do projeto
cd upload.ai-api

# Instalar dependências
npm install
```

## ▶️ Como executar

```bash
# Iniciar o servidor em modo desenvolvimento
npm run dev
```

A API estará disponível em: **http://localhost:3000**

## 📡 Endpoints da API

### `POST /upload`
Faz o upload de um vídeo para transcrição e processamento.

- **Body**: `multipart/form-data` com arquivo de vídeo
- **Retorno**: ID do processamento iniciado

**Exemplo:**
```bash
curl -X POST http://localhost:3000/upload \
  -F "video=@meu-video.mp4"
```

### `GET /transcription/:id`
Retorna a transcrição do vídeo processado com Whisper Large v3.

- **Parâmetros**: `id` — ID do vídeo
- **Retorno**: Texto transcrito

**Exemplo:**
```bash
curl http://localhost:3000/transcription/abc123
```

### `POST /generate`
Gera uma resposta com base no prompt e transcrição do vídeo.

- **Body**: JSON com configurações do prompt

```json
{
  "transcriptionId": "abc123",
  "prompt": "Resuma o vídeo e sugira 3 livros relacionados ao tema.",
  "temperature": 0.7
}
```

**Exemplo de resposta:**
```json
{
  "result": "Este vídeo aborda conceitos de machine learning..."
}
```

## 🛠️ Configuração Avançada

### Controle de Temperatura
Ajuste a criatividade das respostas da IA:

- **Temperatura baixa (0.1-0.3)**: Respostas mais precisas e diretas
- **Temperatura média (0.4-0.7)**: Equilíbrio entre precisão e criatividade
- **Temperatura alta (0.8-1.0)**: Respostas mais criativas e variadas

### Variáveis no Prompt
Use a variável `{{transcription}}` em seus prompts personalizados:

```json
{
  "prompt": "Crie um título criativo para o vídeo: {{transcription}}"
}
```

## 📚 Exemplo de Uso Completo

1. **Upload do vídeo:**
   ```bash
   curl -X POST http://localhost:3000/upload -F "video=@apresentacao.mp4"
   # Retorna: {"id": "video_123"}
   ```

2. **Obter transcrição:**
   ```bash
   curl http://localhost:3000/transcription/video_123
   # Retorna: {"transcription": "Bem-vindos à apresentação..."}
   ```

3. **Gerar conteúdo com IA:**
   ```bash
   curl -X POST http://localhost:3000/generate \
     -H "Content-Type: application/json" \
     -d '{
       "transcriptionId": "video_123",
       "prompt": "Resuma os principais pontos em tópicos",
       "temperature": 0.5
     }'
   ```

## ✅ Funcionalidades Implementadas

- ✅ Upload de vídeo em múltiplos formatos
- ✅ Transcrição automática com alta precisão
- ✅ Geração de conteúdo personalizada com IA
- ✅ Controle de temperatura para ajuste de criatividade
- ✅ API REST completa e documentada
- ✅ Persistência de dados com Prisma

## 🔧 Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Configurações do banco de dados
DATABASE_URL="file:./dev.db"

# Chave da API Groq
GROQ_API_KEY="sua-chave-aqui"

# Configurações do servidor
PORT=3000
NODE_ENV=development
```

## 📋 Pré-requisitos

- Node.js 18+ 
- NPM ou Yarn
- Conta na Groq API
- Espaço em disco para armazenamento de vídeos

**Desenvolvido com ❤️ durante o evento nlw da rockeatseat**
