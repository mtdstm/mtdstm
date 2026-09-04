-- Rode isto no SQL Editor do Supabase (Project > SQL Editor > New query).

create table if not exists public.codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  used boolean not null default false,
  used_at timestamptz,
  buyer_email text,
  order_id text,
  created_at timestamptz not null default now()
);

-- Acelera a busca pelo próximo código livre.
create index if not exists codes_used_idx on public.codes (used) where used = false;

-- RLS ligado: só o back-end (service role key) pode ler/escrever.
-- O front-end nunca deve enxergar essa tabela.
alter table public.codes enable row level security;

-- Nenhuma policy criada de propósito: com RLS ligado e sem policies,
-- só a service role key (que ignora RLS) consegue acessar a tabela.

-- Exemplo de como importar seu estoque de códigos existente:
-- insert into public.codes (code) values
--   ('CODIGO-0001'),
--   ('CODIGO-0002');
