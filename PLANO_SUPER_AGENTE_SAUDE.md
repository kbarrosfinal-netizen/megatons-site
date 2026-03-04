# Playbook Executável — Super Agente 24/7 para Unificação de Dados em Saúde (Brasil)

## 0) Objetivo de negócio (direto ao ponto)
Criar uma operação escalável (SaaS + serviços) que unifique dados públicos e dados locais de saúde, gere diagnóstico contínuo por território e entregue integrações com sistemas existentes — com rastreabilidade total e base em fontes públicas auditáveis.

**Tese de valor:** reduzir tempo de decisão, aumentar eficiência do gasto público e melhorar desempenho assistencial com evidência verificável.

---

## 1) Escopo realista do “super agente”
Em vez de um único agente, use uma **orquestra de agentes especializados**:

1. **Agente de Coleta**: captura fontes públicas e internas.
2. **Agente de Qualidade**: valida consistência, completude e duplicidade.
3. **Agente Semântico**: padroniza códigos, entidades e séries temporais.
4. **Agente de Auditoria**: guarda linhagem completa por indicador.
5. **Agente de Diagnóstico**: produz scorecards por estado/município.
6. **Agente de Integração**: sincroniza com sistemas locais via API/FHIR.
7. **Agente de Operações**: monitora SLAs, custo, falhas e segurança.

---

## 2) Arquitetura técnica (MVP → Escala Nacional)

### 2.1 Camadas de dados
- **Bronze (Raw):** dado bruto, imutável, com hash do arquivo/conjunto.
- **Silver (Curado):** limpeza, padronização, deduplicação e chaves conformadas.
- **Gold (Métricas):** indicadores prontos para gestão e comparação territorial.

### 2.2 Padrões obrigatórios
- Identificadores territoriais unificados (UF, IBGE município, estabelecimento).
- Controle de versão de pipelines e modelos de transformação.
- Catálogo de dados com owner, periodicidade e política de qualidade.
- Linhagem ponta a ponta (fonte → transformação → indicador).

### 2.3 Stack sugerida (referência)
- **Ingestão/Orquestração:** Airflow/Prefect + filas.
- **Armazenamento:** Lakehouse (Parquet/Delta/Iceberg) + DW analítico.
- **Transformação:** dbt + testes de qualidade.
- **APIs e integração:** REST + FHIR (quando aplicável).
- **Observabilidade:** logs estruturados, métricas, alertas e tracing.
- **Segurança:** IAM por domínio, criptografia em trânsito e em repouso.

---

## 3) Fontes públicas prioritárias (fase inicial)
> Use somente fontes oficiais e com metadados verificáveis.

1. DATASUS (subconjuntos conforme casos de uso).
2. CNES (estrutura de rede e recursos).
3. IBGE (denominadores populacionais e território).
4. SIOPS (financiamento e execução).
5. Portais estaduais/municipais com publicação formal.

**Regra de produção:** nenhum indicador entra em dashboard sem referência explícita de fonte, versão, data de coleta e regra de cálculo.

---

## 4) Modelo de auditoria 100% rastreável
Para cada indicador, armazenar:
- `source_name`
- `source_url_or_uri`
- `captured_at`
- `content_hash`
- `pipeline_version`
- `transformation_sql_or_code_ref`
- `quality_score`
- `published_at`

### 4.1 Exemplo de tabela de linhagem (conceito)
```sql
CREATE TABLE metric_lineage (
  metric_id STRING,
  territory_id STRING,
  period STRING,
  source_name STRING,
  source_uri STRING,
  captured_at TIMESTAMP,
  content_hash STRING,
  pipeline_version STRING,
  transform_ref STRING,
  quality_score DECIMAL(5,2),
  published_at TIMESTAMP,
  PRIMARY KEY (metric_id, territory_id, period)
);
```

---

## 5) Catálogo de indicadores núcleo (primeiros 20)
Organize em 5 blocos (4 indicadores por bloco):
1. **Acesso e cobertura** (APS, consultas, exames essenciais).
2. **Capacidade instalada** (leitos, equipes, profissionais por habitante).
3. **Fluxo assistencial** (fila, regulação, tempo porta-atendimento).
4. **Eficiência econômica** (custo por linha de cuidado, glosas, desperdícios).
5. **Desfechos críticos** (eventos evitáveis, mortalidade ajustada, reinternação).

Cada indicador deve ter ficha técnica:
- nome;
- objetivo de gestão;
- fórmula;
- fonte primária e secundária;
- frequência de atualização;
- limitações conhecidas;
- responsável técnico.

---

## 6) Plano de execução (90 dias, realmente executável)

### Sprint 1–2 (semanas 1–4)
- Definir modelo semântico mínimo.
- Publicar dicionário de entidades (território, estabelecimento, período).
- Subir ingestão de 3 fontes prioritárias.
- Implantar testes de qualidade base (completude + duplicidade).

### Sprint 3–4 (semanas 5–8)
- Entregar camada Silver com padronização territorial.
- Gerar os 10 primeiros indicadores Gold.
- Criar tela de auditoria por indicador (fonte, hash, versão).
- Definir API inicial para consumo externo.

### Sprint 5–6 (semanas 9–12)
- Completar 20 indicadores núcleo.
- Publicar scorecards para 1 estado piloto + 3 municípios.
- Configurar alertas automáticos de variação crítica.
- Entregar relatório executivo com baseline + oportunidades.

---

## 7) Operação 24/7 com SLA

### SLAs mínimos
- Disponibilidade API: **99,5%**.
- Atualização de indicadores críticos: **D+1** (quando fonte permitir).
- MTTR de falha crítica: **< 2h**.
- Tempo de onboarding de novo município: **< 15 dias úteis**.

### SLOs de qualidade de dado
- Completude mínima por tabela crítica: **98%**.
- Taxa máxima de duplicidade: **< 0,5%**.
- Percentual de indicadores com linhagem completa: **100%**.

---

## 8) Produto e monetização (escalável)

### 8.1 Ofertas
1. **Diagnóstico Executivo 90 dias** (ticket de entrada).
2. **Plataforma de Monitoramento** (assinatura anual).
3. **Integração com sistemas locais** (setup + recorrência).
4. **Módulos avançados** (previsão de demanda, otimização de rede, auditoria inteligente).

### 8.2 Unit economics (modelo simples)
- Receita recorrente por território + usuários + módulos.
- Margem aumenta com conectores reutilizáveis e onboarding padronizado.
- CAC reduz com casos públicos de ROI e referências institucionais.

### 8.3 Proposta de valor financeira ao gestor
- Menor tempo de decisão.
- Melhor alocação de recursos.
- Redução de ineficiência operacional.
- Monitoramento contínuo com evidência auditável.

---

## 9) Go-to-market (Brasil)
1. **Estado âncora** com dor clara e patrocinador executivo.
2. **3 municípios vitrine** com diferentes perfis de rede.
3. Prova de resultado em até 6 meses com indicadores econômicos e assistenciais.
4. Transformação em playbook replicável para novas UFs.

---

## 10) Governança, segurança e confiança institucional
- Controle de acesso por função e trilha de auditoria imutável.
- Segregação de ambientes (dev/hml/prod).
- Política formal de gestão de incidentes.
- Revisões periódicas de qualidade e conformidade.
- Documentação técnica pronta para auditorias externas e órgãos de controle.

---

## 11) Riscos principais e mitigação
1. **Heterogeneidade de fontes** → camada semântica forte + regras explícitas.
2. **Baixa qualidade de origem** → score de confiança + fallback entre fontes.
3. **Integração com legados** → conectores padrão + contratos de API estáveis.
4. **Dependência comercial de poucos clientes** → estratégia multi-território por ondas.

---

## 12) Checklist para começar agora (próximos 14 dias)
- [ ] Escolher estado e municípios piloto.
- [ ] Definir 20 indicadores com ficha técnica completa.
- [ ] Implementar pipelines Bronze/Silver para 3 fontes.
- [ ] Publicar 10 indicadores Gold com auditoria.
- [ ] Apresentar relatório executivo com oportunidades de ganho.

---

## 13) Resultado esperado (realista)
Você pode construir um negócio altamente lucrativo e defensável se focar em:
1. evidência auditável;
2. integração rápida;
3. entrega contínua de valor ao gestor;
4. escala operacional com padrão nacional e customização local.

Sem governança e execução disciplinada, não escala. Com isso, vira plataforma de referência.
