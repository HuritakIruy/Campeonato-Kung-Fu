import React, { useState } from 'react'

// Single-file React component for a tournament site + registration form.
// TailwindCSS is used for styling (assume Tailwind is configured in the project).
// Place these images in your public folder and update paths if needed:
// - /assets/hero-photo.png  (use the first uploaded photo)
// - /assets/logo.png        (use the logo image)

export default function KungFuRegistration() {
  const [form, setForm] = useState({
    nome: '',
    idade: '',
    dataNascimento: '',
    rg: '',
    cpf: '',
    academia: '',
    telefone: '',
    email: '',
    tempoPratica: '',
    professor: '',
    sexo: '',
    peso: '',
    nivel: '',
    modalidades: [],
    covidVacinado: '',
    vacina: '',
    doses: '',
    termoAssinatura: ''
  })

  const modalidadesList = [
    'Kuoshu',
    'Kuoshu Light',
    'Shuai Chiao',
    'Cassetete',
    'Guardas e Esquivas'
  ]

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox' && name === 'modalidades') {
      setForm(prev => {
        const set = new Set(prev.modalidades)
        if (checked) set.add(value)
        else set.delete(value)
        return { ...prev, modalidades: Array.from(set) }
      })
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    // For demo: create printable view in new tab with the filled data
    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Ficha de Inscrição - ${form.nome}</title>
          <style>body{font-family:Arial,Helvetica,sans-serif;padding:20px}</style>
        </head>
        <body>
          <h1>Ficha de Inscrição - ${form.nome}</h1>
          <pre>${JSON.stringify(form, null, 2)}</pre>
          <p>Assinatura: ___________________________</p>
        </body>
      </html>
    `
    const w = window.open('', '_blank')
    w.document.write(html)
    w.document.close()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-yellow-400 to-orange-400 shadow">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* SUA LOGO - substitua pelo caminho correto */}
            <div className="h-16 w-16 bg-white flex items-center justify-center rounded-lg border">
              <span className="text-orange-600 font-bold text-sm">LOGO</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Super Liga Acreana - Kung Fu</h1>
              <p className="text-sm text-gray-700">Inscrições e Regulamento</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <a href="#regulamento" className="text-gray-800 hover:underline">Regulamento</a>
            <a href="#inscricao" className="text-gray-800 hover:underline">Inscrição</a>
            <a href="/assets/ficha-modelo.pdf" className="text-gray-800 hover:underline">Baixar Ficha (PDF)</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hero / Photo */}
        <section className="lg:col-span-2 bg-white rounded-xl p-6 shadow">
          {/* SUA FOTO - substitua pelo caminho correto */}
          <div className="w-full rounded-lg object-cover h-64 bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">🥋 FOTO DE KUNG FU AQUI 🥋</span>
          </div>

          <h2 id="regulamento" className="mt-6 text-xl font-semibold">Regulamento (resumo)</h2>
          <p className="mt-2 text-gray-700 leading-relaxed">
            Este site é um modelo inspirado no regulamento oficial de campeonatos de Kung-Fu. As principais regras e formatos (divisão por sexo, idade, níveis e categorias de peso) seguem o padrão de fichas de inscrição utilizadas por organizações regionais.
          </p>

          <div className="mt-4">
            <h3 className="font-semibold">Divisões e categorias (exemplo)</h3>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Divisão por sexo: Masculino / Feminino</li>
              <li>Faixas etárias: Infantil, Infanto-Juvenil, Juvenil, Adulto, Sênior</li>
              <li>Categorias de peso: ex. Até 50kg, 50,1-55kg, ... Acima de 94,1kg</li>
              <li>Níveis: Iniciante (≤1 ano), Intermediário (1-2 anos), Avançado (&gt;2 anos)</li>
            </ul>
          </div>

          <p className="mt-4 text-sm text-gray-600">Fontes: modelo de ficha de inscrição e ficha PDF da organização. (Ficha padrão e PDF de inscrição consultados.)</p>
        </section>

        {/* Registration form */}
        <aside id="inscricao" className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-lg font-bold">Ficha de Inscrição</h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-medium">Nome</label>
              <input name="nome" value={form.nome} onChange={handleChange} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Idade</label>
                <input name="idade" value={form.idade} onChange={handleChange} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="text-sm">Data de Nasc.</label>
                <input type="date" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">RG</label>
                <input name="rg" value={form.rg} onChange={handleChange} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="text-sm">CPF</label>
                <input name="cpf" value={form.cpf} onChange={handleChange} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
              </div>
            </div>

            <div>
              <label className="text-sm">Academia</label>
              <input name="academia" value={form.academia} onChange={handleChange} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Telefone</label>
                <input name="telefone" value={form.telefone} onChange={handleChange} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="text-sm">E-mail</label>
                <input name="email" value={form.email} onChange={handleChange} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
              </div>
            </div>

            <div>
              <label className="text-sm">Tempo de prática</label>
              <input name="tempoPratica" value={form.tempoPratica} onChange={handleChange} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
            </div>

            <div>
              <label className="text-sm">Professor</label>
              <input name="professor" value={form.professor} onChange={handleChange} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
            </div>

            <div>
              <label className="text-sm">Sexo</label>
              <select name="sexo" value={form.sexo} onChange={handleChange} className="block mt-1 w-full rounded border border-gray-300 px-3 py-2">
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>

            <div>
              <label className="text-sm">Peso (kg)</label>
              <input name="peso" value={form.peso} onChange={handleChange} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
            </div>

            <div>
              <label className="text-sm">Nível</label>
              <select name="nivel" value={form.nivel} onChange={handleChange} className="block mt-1 w-full rounded border border-gray-300 px-3 py-2">
                <option value="">Selecione</option>
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediario">Intermediário</option>
                <option value="Avancado">Avançado</option>
              </select>
            </div>

            <div>
              <label className="text-sm">Modalidades</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {modalidadesList.map(m => (
                  <label key={m} className="flex items-center gap-2">
                    <input type="checkbox" name="modalidades" value={m} onChange={handleChange} className="rounded border-gray-300" />
                    <span className="text-sm">{m}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm">Vacinado contra COVID?</label>
              <div className="mt-1 flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="covidVacinado" value="Sim" onChange={handleChange} className="text-orange-500" /> Sim
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="covidVacinado" value="Nao" onChange={handleChange} className="text-orange-500" /> Não
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm">Se sim, qual vacina?</label>
              <input name="vacina" value={form.vacina} onChange={handleChange} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
            </div>

            <div>
              <label className="text-sm">Quantas doses?</label>
              <input name="doses" value={form.doses} onChange={handleChange} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
            </div>

            <div>
              <label className="text-sm">Termo de responsabilidade (assinatura)</label>
              <textarea name="termoAssinatura" value={form.termoAssinatura} onChange={handleChange} rows={3} className="block w-full mt-1 rounded border border-gray-300 px-3 py-2"></textarea>
            </div>

            <div className="flex gap-2 justify-end">
              <button type="submit" className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-medium">Gerar Ficha</button>
            </div>
          </form>

          <p className="mt-4 text-xs text-gray-500">Dados de exemplo e campos inspirados nas fichas de inscrição padrão (divisões, categorias de peso e termo de responsabilidade).</p>
        </aside>
      </main>

      <footer className="bg-white border-t py-6">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-600">
          Modelo de site para inscrição em campeonatos de Kung-Fu — adapte regulamento e contratos conforme sua organização.
        </div>
      </footer>
    </div>
  )
}