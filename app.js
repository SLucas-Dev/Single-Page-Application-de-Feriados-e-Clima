$(document).ready(function(){

    
    function diaSemana(dataStr){
        const diasDaSemana = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
        
        
        const partes = dataStr.trim().split('-'); 
        if(partes.length !== 3) return 'Data inválida';

        const ano = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10) - 1; 
        const dia = parseInt(partes[2], 10);

        const data = new Date(ano, mes, dia);
        return diasDaSemana[data.getDay()];
    }

    
    $('#btnFeriados').click(function(){
        const ano = $('#idAno').val();
        if(!ano){
            alert('Informe um ano válido!');
            return;
        }

        const url = `https://brasilapi.com.br/api/feriados/v1/${ano}`;
        $('#resultadoFeriados').html('Carregando...');

        $.ajax({
            url: url,
            method: 'GET',
            success: function(data){
                if(data.length === 0){
                    $('#resultadoFeriados').html('Nenhum feriado encontrado.');
                    return;
                }

                let html = '';
                data.forEach(f => {
                    html += `<div class="result-item">
                        <strong>${f.nome}</strong><br>
                        Data: ${f.date} (${diaSemana(f.date)})
                    </div>`;
                });

                $('#resultadoFeriados').html(html);
            },
            error: function(){
                $('#resultadoFeriados').html('Erro ao consultar feriados. Tente novamente.');
            }
        });
    });


    
    
    $('#btnClima').click(function(){
        const cidade = $('#cidade').val();
        if(!cidade){
            alert('Informe uma cidade!');
            return;
        }

        const chave = 'f0f39a4d7e15ef8bf34eaf529728d14d'; 
        const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&units=metric&lang=pt_br`;

        $('#resultadoClima').html('Carregando...');

        $.ajax({
            url: apiurl,
            method: 'GET',
            success: function(data){
                const html = `<div class="result-item">
                    <strong>${data.name}, ${data.sys.country}</strong><br>
                    Temperatura atual: ${data.main.temp.toFixed(1)}°C<br>
                    Mínima: ${data.main.temp_min.toFixed(1)}°C<br>
                    Máxima: ${data.main.temp_max.toFixed(1)}°C<br>
                    Umidade: ${data.main.humidity}%<br>
                    Vento: ${(data.wind.speed * 3.6).toFixed(1)} km/h
                </div>`;
                $('#resultadoClima').html(html);
            },
            error: function(){
                $('#resultadoClima').html('Erro ao consultar o clima. Verifique se a cidade está correta.');
            }
        });
    });

});
