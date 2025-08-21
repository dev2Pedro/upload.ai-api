# 📡 API de Processamento de Vídeos com IA

Esta API permite o upload de vídeos, transcrição automática com o **Whisper Large v3** e aplicação de prompts de IA para gerar resumos, títulos, descrições, sugestões e muito mais — tudo via **requisições HTTP**. Ideal para integrações com frontends ou automações via scripts.

---

### 🚀 Tecnologias Utilizadas

<p align="left">
  <img src="https://skillicons.dev/icons?i=nodejs,fastify,prisma" />
</p>

#### 🤖 IA & Processamento de Linguagem

<p align="left">
  🟢 Groq API <br />
  🦙 LLaMA <br />
  🎤 Whisper Large v3
</p>

---

## 📥 Como clonar o projeto

```bash
# Clonar o repositório
git clone https://github.com/SEU_USUARIO/sua-api.git

# Entrar na pasta do projeto
cd sua-api

# Instalar dependências
npm install
```

▶️ Como rodar o projeto
```bash
# Iniciar o servidor em modo desenvolvimento
npm run dev
```
A API estará disponível em: http://localhost:3000

📡 Principais Endpoints

`POST /upload`
Faz o upload de um vídeo para transcrição e processamento.

Body: `multipart/form-data` com arquivo de vídeo.

Retorno: ID do processamento iniciado.

`GET /transcription/:id`
Retorna a transcrição do vídeo processado com Whisper Large v3.

Params: `id` — ID do vídeo.

Retorno: Texto transcrito.

`POST /generate`
Gera uma resposta com base no prompt e transcrição do vídeo.

Body:

```json
{
  "transcriptionId": "abc123",
  "prompt": "Resuma o vídeo e sugira 3 livros.",
  "temperature": 0.7
}
```
Retorno: Texto gerado pela IA.

🛠️ Configuração
Você pode ajustar a temperatura do modelo para controlar a criatividade da resposta:

Temperatura baixa (ex: 0.3): Respostas mais precisas e diretas.

Temperatura alta (ex: 0.9): Respostas mais criativas e variadas.

💡 Variáveis Úteis no Prompt
Você pode usar a variável `{{transcription}}` dentro do seu prompt personalizado. Exemplo:

```arduino
"Crie um título criativo para o vídeo com base no seguinte conteúdo: {{transcription}}"
```
📚 Exemplo de Uso
Envie um vídeo com `POST /upload`.

Aguarde o processamento e pegue o texto com `GET /transcription/:id`.

Envie um prompt com `POST /generate` para gerar título, resumo ou outra informação baseada na transcrição.

✅ Status
✅ Upload de vídeo
✅ Transcrição automática
✅ Geração de conteúdo com IA
✅ Controle de temperatura
✅ API REST pronta para integração

📌 Observações Finais
A IA utilizada é baseada no modelo LLaMA via Groq API, garantindo velocidade e qualidade.

O sistema de transcrição utiliza Whisper Large v3, oferecendo alta precisão em diversos idiomas.

Integração com Prisma para persistência dos dados.

🔒 Autenticação (Opcional)
<!-- Se sua API tiver autenticação, você pode adicionar aqui -->


