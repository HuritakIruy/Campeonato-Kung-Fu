const http = require('http');
const fs = require('fs');    // <-- NOVO: Para leitura de arquivos
const path = require('path');  // <-- NOVO: Para manipular caminhos de arquivo
const port = 3000;

// Página do Regulamento
const paginaRegulamento = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Regulamento - Super Liga Acreana</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .print-only { display: none; }
        @media print {
            .no-print { display: none !important; }
            .print-only { display: block !important; }
            body { font-size: 12px; }
        }
        .section-title {
            background: linear-gradient(90deg, #d97706, #eab308);
            color: white;
            padding: 10px 15px;
            margin: 20px 0 10px 0;
            border-radius: 5px;
            font-weight: bold;
        }
        .dark-mode {
            background-color: #1f2937;
            color: #f9fafb;
        }
        .dark-mode .bg-white {
            background-color: #374151;
        }
        .dark-mode .text-gray-700, .dark-mode .text-gray-800 {
            color: #f9fafb;
        }
        .dark-mode .text-gray-600 {
            color: #d1d5db;
        }
        .dark-mode .border-gray-200 {
            border-color: #4b5563;
        }
        .dark-mode .bg-gray-50 {
            background-color: #4b5563;
        }
    </style>
</head>
<body class="bg-gray-50 font-sans">
    <!-- CABEÇALHO -->
    <header class="bg-gray-900 text-white p-4 relative overflow-hidden">
        
        <div class="absolute inset-0 bg-cover bg-center opacity-30" style="background-image: url('/professor.png');"></div>
        
        <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between relative z-20 no-print">
            <div class="flex items-center gap-3">
                <img src="/logo.png.jpg" alt="Logo SLAKF" class="w-12 h-12 object-contain">
                <div>
                    <h1 class="text-lg font-bold text-white">Super Liga Acreana de Kung Fu</h1>
                    <p class="text-xs text-gray-300">Organização Oficial</p>
                </div>
            </div>
            <nav class="flex gap-6 text-sm">
                <a href="/" class="text-white hover:text-yellow-400 font-semibold">📜 Regulamento</a>
                <a href="/ficha" class="text-white hover:text-yellow-400">📝 Ficha de Inscrição</a>
                <button onclick="toggleDarkMode()" class="text-white hover:text-yellow-400" title="Modo Escuro">
                    🌙
                </button>
            </nav>
        </div>

        <div class="relative z-10 text-center py-16 px-4 max-w-4xl mx-auto">
            <h1 class="text-3xl font-extrabold leading-tight tracking-tight mb-2 uppercase text-yellow-500">
                XXIII Campeonato Estadual de Kung Fu
            </h1>
            <p class="text-2xl font-bold text-white mb-2">
                da Super Liga Acreana de Kung Fu
            </p>
            <p class="text-lg text-yellow-500 font-semibold mt-2">
                Dia 02 de novembro de 2025
            </p>
            <p class="text-md text-gray-300 mt-1">
                Centro de Iniciação Esportiva de Rio Branco – CIE
            </p>
            <p class="text-4xl font-extrabold text-white mt-8">REGULAMENTO</p>
        </div>

        <div class="absolute top-0 right-0 w-48 h-full bg-yellow-600 transform skew-x-[-20deg] origin-top-right z-0"></div>
    </header>

    <!-- CONTEÚDO PRINCIPAL -->
    <main class="max-w-4xl mx-auto px-4 py-8">
                <!-- TÍTULO PRINCIPAL -->
        <div class="text-center mb-8 no-print">
            <h1 class="text-3xl font-bold text-yellow-700 mb-2">
                XXIII Campeonato Estadual de Kung Fu
            </h1>
            <p class="text-3xl font-bold text-yellow-700">
                da Super Liga Acreana de Kung Fu
            </p>
            <p class="text-md text-gray-600 font-semibold mt-2">
                Dia 02 de novembro de 2025
            </p>
            <p class="text-sm text-gray-500 mt-1">
                Centro de Iniciação Esportiva de Rio Branco – CIE
            </p>
            <p class="text-2xl font-bold text-yellow-700 mt-4">REGULAMENTO</p>
        </div>

        <!-- BOTÃO IMPRIMIR -->
        <div class="text-center mb-8 no-print">
            <button onclick="imprimirRegulamento()" class="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-semibold">
                🖨 Imprimir Regulamento
            </button>
            <p class="text-sm text-gray-600 mt-2">Só imprime o regulamento</p>
        </div>

        <!-- REGULAMENTO -->
        <section id="regulamento" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="section-title">1. TAOLUS</div>
            
            <div class="mb-6">
                <h3 class="font-semibold text-gray-800 mb-2 dark:text-white">1.1 Tempo de prática dos competidores</h3>
                <ul class="list-disc ml-6 text-gray-700 space-y-1 dark:text-gray-300">
                    <li>Iniciante: até 1 ano de prática</li>
                    <li>Intermediário: 1 a 3 anos de prática</li>
                    <li>Avançado: mais de 3 anos de prática</li>
                </ul>
            </div>

                        <div class="mb-6">
                <h3 class="font-semibold text-gray-800 mb-2 dark:text-white">1.2 Categorias e divisão de idade</h3>
                <ul class="list-disc ml-6 text-gray-700 space-y-1 dark:text-gray-300">
                    <li>Infantil: 4 a 12 anos</li>
                    <li>Infanto-Juvenil: 13-15 anos</li>
                    <li>Juvenil: 16-17 anos</li>
                    <li>Adulto: 18-35 anos</li>
                    <li>Sênior: +36 anos</li>
                </ul>
            </div>

            <!-- NOVO CONTEÚDO ADICIONADO -->
            <div class="mb-6">
                <h3 class="font-semibold text-gray-800 mb-2 dark:text-white">TAOLUS TRADICIONAIS DE MÃOS LIVRES</h3>
                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 dark:bg-yellow-900 dark:border-yellow-600">
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Atenção:</strong> A fim de receber a melhor pontuação possível, a forma (Taolu) deve ser demonstrada sem interrupção, com força e foco (concentração), tanto para mãos livres como para armas. O uniforme do competidor também será levado em conta. A organização do evento se reserva ao direito de combinar ou separar categorias, se necessário.
                    </p>
                </div>

                <div class="mb-4">
                    <h4 class="font-semibold text-gray-800 mb-2 dark:text-white">Taolu estilo do sul:</h4>
                    <p class="text-gray-700 dark:text-gray-300">
                        É a divisão da modalidade de mãos livres em que os atletas realizam as formas com as características tradicionais dos estilos do Sul. Sendo assim o atleta deverá se inscrever na categoria que corresponde às características de seu estilo. Por exemplo, Hung Gar, Choy Lay Fut, Pak Hok (garça branca), Fu Jow Pai (garra de tigre), Fei Hok Phay, Dragão, Shaolin do Sul, Serpente, Leopardo, Louva-a-Deus do Sul etc.;
                    </p>
                </div>

                <div class="mb-4">
                    <h4 class="font-semibold text-gray-800 mb-2 dark:text-white">Taolu estilo do norte:</h4>
                    <p class="text-gray-700 dark:text-gray-300">
                        É a divisão da modalidade de mãos livres em que os atletas realizam as formas com as características tradicionais dos estilos do norte. Sendo assim o atleta deverá se inscrever na categoria que corresponde às características de seu estilo. Por exemplo, Louva-a-Deus (Tan Lan), Shaolin do Norte (Bak Sil Lum), Garra de Águia, Lohan (18 Mãos de Buda) etc.;
                    </p>
                </div>

                <div class="mb-4">
                    <h4 class="font-semibold text-gray-800 mb-2 dark:text-white">Outros Taolus (especiais e livres):</h4>
                    <p class="text-gray-700 dark:text-gray-300">
                        Incluirá todas aquelas formas com características não tradicionais, além das formas tradicionais tais como BÊBADO E MACACO, e as formas que possuem acrobacias e deslocamentos similares ao Wushu Moderno bem como aquelas formas criadas sem características definidas do Kung Fu Chinês. Os atletas que competirão com formas iguais ou semelhantes às descritas anteriormente devem ser inscritos na categoria OUTROS TAOLUS (LIVRES);
                    </p>
                </div>
            </div>

                                  <div class="mb-6">
                <h3 class="font-semibold text-gray-800 mb-2 dark:text-white">TAOLUS TRADICIONAIS COM ARMAS</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-semibold text-gray-700 mb-2 dark:text-gray-300">Armas longas:</h4>
                        <p class="text-gray-700 dark:text-gray-300">Bastão e Lança;</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-700 mb-2 dark:text-gray-300">Armas curtas:</h4>
                        <p class="text-gray-700 dark:text-gray-300">Facão e Espada reta;</p>
                        <h4 class="font-semibold text-gray-700 mb-2 dark:text-gray-300 mt-4">Armas articuladas:</h4>
                        <p class="text-gray-700 dark:text-gray-300">Corrente, Chicote, Nunchaku;</p>
                    </div>
                    <div class="md:col-span-2">
                        <h4 class="font-semibold text-gray-700 mb-2 dark:text-gray-300">Outras armas (especiais e livres):</h4>
                        <p class="text-gray-700 dark:text-gray-300 text-sm">
                            Kwan Dao, Tridente (Garfo de três pontas), Pu Dao, Kau Wan Tou, Pá com meia lua, Punhal simples, Faca de borboleta simples, Estilete, Gancho garra de tigre simples, Leque, Banco, Bengala, Flauta, Lança de duas pontas, Tonfa simples, Lan Tin Kwan (Nunchaku simples), San Tin Kwan (Nunchaku triplo), Corrente, Chicote, Bastão longo com nunchaku, Espada dupla, Facão duplo, Punhal duplo, Faca de borboleta dupla, Facão e escudo, Gancho garra de tigre, Faca rabo de peixe, Nunchaku duplo, Tonfa dupla, etc.
                        </p>
                    </div>
                </div>
            </div>

                        <div class="mb-6">
                <h3 class="font-semibold text-gray-800 mb-2 dark:text-white">CRITÉRIOS DE NOTAS</h3>
                <ul class="list-disc ml-6 text-gray-700 space-y-1 dark:text-gray-300">
                    <li>Iniciante: 6,00 a 7,00;</li>
                    <li>Intermediário: 7,00 a 8,00;</li>
                    <li>Avançado: 9,00 a 10,00.</li>
                </ul>
            </div>

            <div class="mb-6">
                <h3 class="font-semibold text-gray-800 mb-2 dark:text-white">CRITÉRIOS DE DESEMPATE DOS TAOLUS</h3>
                <ul class="list-disc ml-6 text-gray-700 space-y-1 dark:text-gray-300">
                    <li>Havendo 5 árbitros a nota mais alta e a mais baixa serão desconsideradas sendo então feita a média das três restantes;</li>
                    <li>Havendo 3 árbitros será considerada apenas a média aritmética entre as três notas;</li>
                    <li>No caso do primeiro empate, havendo 5 árbitros será considerada a média aritmética entre as 5 notas;</li>
                    <li>No caso do primeiro empate, havendo 3 árbitros, será considerada a média aritmética entre as 2 notas mais altas;</li>
                    <li>No caso do segundo empate, havendo 3 ou 5 árbitros, as duas maiores notas serão somadas;</li>
                    <li>No caso do terceiro empate, havendo 3 ou 5 árbitros, o atleta deverá repetir a mesma forma;</li>
                    <li>Persistindo o empate, havendo 3 ou 5 árbitros, considera-se o atleta com maior número de inscrições no evento.</li>
                </ul>
            </div>

            <div class="mb-6">
                <h3 class="font-semibold text-gray-800 mb-2 dark:text-white">CRITÉRIOS PARA AVALIAÇÃO DOS TAOLUS</h3>
                <ul class="list-disc ml-6 text-gray-700 space-y-1 dark:text-gray-300">
                    <li>Velocidade;</li>
                    <li>Equilíbrio;</li>
                    <li>Concentração;</li>
                    <li>Dificuldade;</li>
                    <li>Esquecimento;</li>
                    <li>Falha (arma quebrar, cair, bater no chão etc.);</li>
                    <li>Olhar, a direção correta dos olhares;</li>
                    <li>Os atletas deverão entrar na área de competição pelo lado direito da mesa examinadora e sair pelo lado esquerdo.</li>
                </ul>
            </div>

            <div class="mb-6">
                <h3 class="font-semibold text-gray-800 mb-2 dark:text-white">PONTOS PERDIDOS NA EXECUÇÃO DOS TAOLUS</h3>
                <ul class="list-disc ml-6 text-gray-700 space-y-1 dark:text-gray-300">
                    <li>Entrar pelo lado errado na área de competição: menos 0,04 pontos na média final;</li>
                    <li>Postura dos pés e pernas executada inadequadamente: menos 0,02 pontos na média final;</li>
                    <li>Perda momentânea de equilíbrio: menos 0,03 pontos na média final;</li>
                    <li>Perda de equilíbrio e/ou queda ao chão incluindo tocar o chão com as mãos: menos 0,06 pontos na média final;</li>
                    <li>Pausa momentânea involuntária (esquecimento): menos 0,02 pontos na média final;</li>
                    <li>Se a arma tocar o chão ou o corpo do atleta acidentalmente: menos 0,05 pontos na média final;</li>
                    <li>Deformação de armas: perda de 0,03 pontos na média final;</li>
                    <li>Quebrar a arma ou deixar cair no chão: perda de 0,05 pontos na média final;</li>
                    <li>Começar ou terminar o Taolu virado de costas para a mesa central de arbitragem: menos 0,06 pontos na média final;</li>
                    <li>Erro: no caso do atleta errar a forma ele será automaticamente desclassificado, não tendo direito a uma nova tentativa.</li>
                </ul>
            </div>

            <div class="section-title">2. SANDA/SANSHOU</div>

            <div class="mb-6">
                <h3 class="font-semibold text-gray-800 mb-2 dark:text-white">2.1 Categorias de idade</h3>
                <ul class="list-disc ml-6 text-gray-700 space-y-1 dark:text-gray-300">
                    <li>Infantil: 4 a 12 anos</li>
                    <li>Juvenil: 16-17 anos</li>
                    <li>Adulto: 18-35 anos</li>
                    <li>Sênior: +36 anos</li>
                </ul>
            </div>

            <div class="mb-6">
                <h3 class="font-semibold text-gray-800 mb-2 dark:text-white">2.2 Categorias de peso</h3>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-semibold text-gray-700 mb-2 dark:text-gray-300">Masculino</h4>
                        <ul class="list-disc ml-6 text-gray-700 text-sm space-y-1 dark:text-gray-300">
                            <li>Até 56kg</li>
                            <li>56.1 - 60kg</li>
                            <li>60.1 - 65kg</li>
                            <li>65.1 - 70kg</li>
                            <li>70.1 - 75kg</li>
                            <li>75.1 - 80kg</li>
                            <li>80.1 - 85kg</li>
                            <li>Acima de 85kg</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-700 mb-2 dark:text-gray-300">Feminino</h4>
                        <ul class="list-disc ml-6 text-gray-700 text-sm space-y-1 dark:text-gray-300">
                            <li>Até 48kg</li>
                            <li>48.1 - 52kg</li>
                            <li>52.1 - 56kg</li>
                            <li>56.1 - 60kg</li>
                            <li>60.1 - 65kg</li>
                            <li>Acima de 65kg</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="font-semibold text-gray-800 mb-2 dark:text-white">2.3 Equipamentos obrigatórios</h3>
                <ul class="list-disc ml-6 text-gray-700 space-y-1 dark:text-gray-300">
                    <li>Protetor bucal</li>
                    <li>Luvas apropriadas</li>
                    <li>Capacete</li>
                    <li>Coquilha (obrigatório para homens)</li>
                    <li>Protetor de tórax (obrigatório para mulheres)</li>
                    <li>Caneleiras</li>
                </ul>
            </div>

            <div class="mb-6">
                <h3 class="font-semibold text-gray-800 mb-2 dark:text-white">2.4 Critérios de pontuação</h3>
                <ul class="list-disc ml-6 text-gray-700 space-y-1 dark:text-gray-300">
                    <li>Golpe válido no corpo: 1 ponto</li>
                    <li>Golpe válido na cabeça: 2 pontos</li>
                    <li>Queda técnica: 2 pontos</li>
                    <li>Queda fora do ringue: 1 ponto</li>
                    <li>Aviso do árbitro: -1 ponto</li>
                </ul>
            </div>

            <div class="section-title">3. INFORMAÇÕES ADICIONAIS</div>
            <div class="mb-6 text-gray-700 space-y-2 dark:text-gray-300">
                <p><strong>Local:</strong> Centro de Iniciação Esportiva de Rio Branco – CIE</p>
                <p><strong>Data:</strong> 02 de novembro de 2025</p>
                <p><strong>Horário:</strong> 08:00 às 18:00 horas</p>
                <p><strong>Inscrições:</strong> Até 25 de outubro de 2025</p>
                <p><strong>Documentação necessária:</strong> RG ou certidão de nascimento, atestado médico recente</p>
            </div>

        </section>

        <!-- BOTÃO PARA FICHA -->
        <div class="text-center mt-8 no-print">
            <a href="/ficha" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold inline-block">
                📝 Ir para Ficha de Inscrição
            </a>
        </div>
    </main>

    <!-- RODAPÉ -->
    <footer class="bg-gray-800 text-white py-6 mt-8 no-print dark:bg-gray-900">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <p class="text-lg font-semibold">Super Liga Acreana de Kung Fu - SLAKF</p>
            <p class="text-gray-400 text-sm mt-1">Organização Oficial de Campeonatos no Estado do Acre</p>
        </div>
    </footer>

    <script>
        function imprimirRegulamento() {
            window.print();
        }

        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            // Salvar preferência
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        }

        // Verificar preferência salva
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
        }
    </script>
</body>
</html>
`;

// Página da Ficha de Inscrição (mantida igual)
const paginaFicha = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ficha de Inscrição - Super Liga Acreana</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .print-only { display: none; }
        @media print {
            .no-print { display: none !important; }
            .print-only { display: block !important; }
            body { font-size: 11px; }
            .form-input { border: 1px solid #000 !important; background: white !important; }
        }
        .form-input {
            border: 1px solid #d1d5db;
            border-radius: 0.25rem;
            padding: 0.25rem 0.5rem;
            width: 100%;
            background: white;
        }
        .section-border {
            border: 1px solid #d1d5db;
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 0.375rem;
        }
        .dark-mode {
            background-color: #1f2937;
            color: #f9fafb;
        }
        .dark-mode .bg-white {
            background-color: #374151;
        }
        .dark-mode .text-gray-700, .dark-mode .text-gray-800 {
            color: #f9fafb;
        }
        .dark-mode .text-gray-600 {
            color: #d1d5db;
        }
        .dark-mode .border-gray-200 {
            border-color: #4b5563;
        }
        .dark-mode .bg-gray-50 {
            background-color: #4b5563;
        }
        .dark-mode .form-input {
            background-color: #4b5563;
            border-color: #6b7280;
            color: #f9fafb;
        }
    </style>
</head>
<body class="bg-gray-50 font-sans">
    <!-- CABEÇALHO -->
    <header class="bg-white border-b border-gray-200 no-print dark:bg-gray-800 dark:border-gray-700">
        <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <!-- SÍMBOLO DA LIGA -->
                <img src="/logo.png.jpg" alt="Logo SLAKF" class="w-12 h-12 object-contain">
                <div>
                    <h1 class="text-lg font-bold text-gray-800 dark:text-white">Super Liga Acreana de Kung Fu</h1>
                    <p class="text-xs text-gray-600 dark:text-gray-300">Organização Oficial</p>
                </div>
            </div>
            <nav class="flex gap-6 text-sm">
                <a href="/" class="text-gray-700 hover:text-yellow-600 dark:text-gray-300">📜 Regulamento</a>
                <a href="/ficha" class="text-gray-700 hover:text-yellow-600 font-semibold dark:text-gray-300">📝 Ficha de Inscrição</a>
                <button onclick="toggleDarkMode()" class="text-gray-700 hover:text-yellow-600 dark:text-gray-300" title="Modo Escuro">
                    🌙
                </button>
            </nav>
        </div>
    </header>

    <!-- CONTEÚDO PRINCIPAL -->
    <main class="max-w-4xl mx-auto px-4 py-8">
        <!-- TÍTULO -->
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-yellow-700">FICHA DE INSCRIÇÃO</h1>
            <p class="text-lg text-gray-700 dark:text-gray-300">XXIII Campeonato Estadual de Kung Fu</p>
            <p class="text-md text-gray-600 dark:text-gray-400">Super Liga Acreana de Kung Fu - SLAKF</p>
            <p class="text-sm text-gray-500 dark:text-gray-500">02 de novembro de 2025 - CIE Rio Branco</p>
        </div>

        <!-- BOTÃO IMPRIMIR -->
        <div class="text-center mb-8 no-print">
            <button onclick="imprimirFicha()" class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg">
                🖨 Imprimir Ficha de Inscrição
            </button>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Preencha a ficha e clique para imprimir (só imprime a ficha)</p>
        </div>

        <!-- FICHA DE INSCRIÇÃO -->
        <section id="ficha" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
            <form id="formInscricao">
                <!-- DADOS PESSOAIS -->
                <div class="section-border dark:border-gray-600">
                    <h3 class="font-bold text-gray-800 mb-3 border-b pb-1 text-lg dark:text-white dark:border-gray-500">DADOS PESSOAIS</h3>
                    <div class="grid grid-cols-2 gap-4 mb-3">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Nome Completo</label>
                            <input type="text" name="nome" class="form-input dark:bg-gray-700 dark:text-white">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Data Nascimento</label>
                            <input type="date" name="dataNascimento" class="form-input dark:bg-gray-700 dark:text-white">
                        </div>
                    </div>
                    <div class="grid grid-cols-3 gap-4 mb-3">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Idade</label>
                            <input type="number" name="idade" class="form-input dark:bg-gray-700 dark:text-white">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Sexo</label>
                            <select name="sexo" class="form-input dark:bg-gray-700 dark:text-white">
                                <option value="">Selecione</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Peso (kg)</label>
                            <input type="number" step="0.1" name="peso" class="form-input dark:bg-gray-700 dark:text-white">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">RG</label>
                            <input type="text" name="rg" class="form-input dark:bg-gray-700 dark:text-white">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">CPF</label>
                            <input type="text" name="cpf" class="form-input dark:bg-gray-700 dark:text-white">
                        </div>
                    </div>
                </div>

                <!-- DADOS DA ACADEMIA -->
                <div class="section-border dark:border-gray-600">
                    <h3 class="font-bold text-gray-800 mb-3 border-b pb-1 text-lg dark:text-white dark:border-gray-500">DADOS DA ACADEMIA</h3>
                    <div class="grid grid-cols-2 gap-4 mb-3">
                        <div class="col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Nome da Academia/Escola</label>
                            <input type="text" name="academia" class="form-input dark:bg-gray-700 dark:text-white">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Professor</label>
                            <input type="text" name="professor" class="form-input dark:bg-gray-700 dark:text-white">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Tempo de Prática</label>
                            <input type="text" name="tempoPratica" class="form-input dark:bg-gray-700 dark:text-white">
                        </div>
                    </div>
                </div>

                <!-- CONTATO -->
                <div class="section-border dark:border-gray-600">
                    <h3 class="font-bold text-gray-800 mb-3 border-b pb-1 text-lg dark:text-white dark:border-gray-500">CONTATO</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Telefone</label>
                            <input type="tel" name="telefone" class="form-input dark:bg-gray-700 dark:text-white">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">E-mail</label>
                            <input type="email" name="email" class="form-input dark:bg-gray-700 dark:text-white">
                        </div>
                    </div>
                </div>

                                                <!-- MODALIDADES -->
                <div class="section-border dark:border-gray-600">
                    <h3 class="font-bold text-gray-800 mb-3 border-b pb-1 text-lg dark:text-white dark:border-gray-500">MODALIDADES</h3>
                    <div class="space-y-4">
                        <div class="grid grid-cols-3 gap-2">
                            <label class="flex items-center gap-2">
                                <input type="checkbox" name="modalidades" value="Maos do Sul" class="rounded dark:bg-gray-700">
                                <span class="text-sm dark:text-gray-300">Mãos do Sul</span>
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="checkbox" name="modalidades" value="Maos do Norte" class="rounded dark:bg-gray-700">
                                <span class="text-sm dark:text-gray-300">Mãos do Norte</span>
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="checkbox" name="modalidades" value="Maos Especiais Livres" class="rounded dark:bg-gray-700">
                                <span class="text-sm dark:text-gray-300">Mãos especiais e livres</span>
                            </label>
                        </div>
                        
                        <div class="grid grid-cols-3 gap-2">
                            <label class="flex items-center gap-2">
                                <input type="checkbox" name="modalidades" value="Armas Longas" class="rounded dark:bg-gray-700">
                                <span class="text-sm dark:text-gray-300">Armas longas</span>
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="checkbox" name="modalidades" value="Armas Curtas" class="rounded dark:bg-gray-700">
                                <span class="text-sm dark:text-gray-300">Armas curtas</span>
                            </label>
                            <label class="flex items-center gap-2">
                                <input type="checkbox" name="modalidades" value="Armas Articuladas" class="rounded dark:bg-gray-700">
                                <span class="text-sm dark:text-gray-300">Armas articuladas</span>
                            </label>
                        </div>
                        
                        <div>
                            <label class="flex items-center gap-2">
                                <input type="checkbox" name="modalidades" value="Sanda" class="rounded dark:bg-gray-700">
                                <span class="text-sm dark:text-gray-300">Sanda/Sanshou</span>
                            </label>
                        </div>
                    </div>
                </div>
                            <h4 class="font-semibold text-gray-700 mb-2 dark:text-gray-300">SANDA</h4>
                            <div class="space-y-2">
                                <label class="flex items-center gap-2">
                                    <input type="checkbox" name="modalidades" value="Sanda" class="rounded dark:bg-gray-700">
                                    <span class="text-sm dark:text-gray-300">Sanda/Sanshou</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                            <h4 class="font-semibold text-gray-700 mb-2 dark:text-gray-300">SANDA</h4>
                            <div class="space-y-2">
                                <label class="flex items-center gap-2">
                                    <input type="checkbox" name="modalidades" value="Sanda" class="rounded dark:bg-gray-700">
                                    <span class="text-sm dark:text-gray-300">Sanda/Sanshou</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                                <!-- TERMO DE RESPONSABILIDADE E ASSINATURAS -->
                <div class="section-border dark:border-gray-600">
                    <h3 class="font-bold text-gray-800 mb-3 border-b pb-1 text-lg dark:text-white dark:border-gray-500">TERMO DE RESPONSABILIDADE</h3>
                    <div class="bg-gray-50 p-4 rounded text-sm text-gray-700 mb-4 dark:bg-gray-700 dark:text-gray-300">
                        <p class="mb-3">Eu, <strong class="underline font-normal text-lg px-8">                                                                           </strong>, inscrito(a) neste campeonato, declaro estar ciente e de acordo com as normas estabelecidas neste regulamento.</p>
                        <p class="mb-3">Assumo total responsabilidade por minha integridade física durante toda a competição, isentando os organizadores, Super Liga Acreana de Kung Fu (SLAKF), árbitros, juízes e demais envolvidos de qualquer responsabilidade por eventuais acidentes ou lesões que venham a ocorrer.</p>
                        <p class="mb-3">Comprometo-me a seguir as regras estabelecidas, respeitar árbitros, juízes, adversários e toda a organização do evento.</p>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-6 mt-6">
                        <div>
                            <p class="text-sm text-gray-600 mb-1 dark:text-gray-400">Assinatura do Atleta</p>
                            <div class="border-t border-gray-400 mt-12 pt-1 dark:border-gray-500"></div>
                            <p class="text-xs text-gray-500 mt-1 dark:text-gray-500">Data: ____ / ____ / ____</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-1 dark:text-gray-400">Assinatura do Responsável (menor de 18 anos)</p>
                            <div class="border-t border-gray-400 mt-12 pt-1 dark:border-gray-500"></div>
                            <p class="text-xs text-gray-500 mt-1 dark:text-gray-500">Data: ____ / ____ / ____</p>
                        </div>
                    </div>
                </div>
            </form>
        </section>

        <!-- BOTÃO PARA REGULAMENTO -->
        <div class="text-center mt-8 no-print">
            <a href="/" class="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold inline-block">
                📜 Voltar para Regulamento
            </a>
        </div>
    </main>

    <!-- RODAPÉ -->
    <footer class="bg-gray-800 text-white py-6 mt-8 no-print dark:bg-gray-900">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <p class="text-lg font-semibold">Super Liga Acreana de Kung Fu - SLAKF</p>
            <p class="text-gray-400 text-sm mt-1">Organização Oficial de Campeonatos no Estado do Acre</p>
        </div>
    </footer>

    <script>
        function imprimirFicha() {
            window.print();
        }

        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            // Salvar preferência
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        }

        // Verificar preferência salva
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
        }

        // Prevenir envio do formulário (só para impressão)
        document.getElementById('formInscricao').addEventListener('submit', function(e) {
            e.preventDefault();
            imprimirFicha();
        });
    </script>
</body>
</html>
`;

// Servidor com múltiplas rotas
// Servidor com múltiplas rotas
const server = http.createServer((req, res) => {
    
    // ROTA PARA SERVIR ARQUIVOS ESTÁTICOS (IMAGEM)
    if (req.url === '/logo.png.jpg') {
        const filePath = path.join(__dirname, 'public', 'logo.png.jpg');
        
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error("Erro ao carregar a imagem:", err.message);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found - Imagem não encontrada');
                return;
            }
            // Content-Type: Usamos image/jpeg, pois a imagem é um JPG
            res.writeHead(200, { 'Content-Type': 'image/jpeg' }); 
            res.end(data);
        });
        return; // IMPORTANTE: Encerra a execução após servir (ou tentar servir) a imagem.
    }

    if (req.url === '/' || req.url === '/regulamento') {
    // ... (restante do seu código)
    // Página do Regulamento
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(paginaRegulamento);
  } else if (req.url === '/ficha') {
    // Página da Ficha de Inscrição
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(paginaFicha);
  } else {
    // Página não encontrada - redireciona para regulamento
    res.writeHead(302, { 'Location': '/' });
    res.end();
  }
});

server.listen(port, () => {
  console.log('🎉 SITE OFICIAL SLAKF ATUALIZADO!');
  console.log('📜 Regulamento: http://localhost:' + port);
  console.log('📝 Ficha: http://localhost:' + port + '/ficha');
  console.log('🌙 Modo escuro adicionado!');
  console.log('🖨 Impressão inteligente ativada');
});