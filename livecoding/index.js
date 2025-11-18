const readline = require("readline");
function esperarEnter(message = "Pressione ENTER para continuar...") {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(message, () => {
            rl.close();
            resolve();
        });
    });
}

const RISCOS = ["Baixo", "Médio", "Alto", "Crítico"];

var riscoAtual = 0;
var respostas = {};
var razoes = [];
var recomendacoes = [];

function Resetar() {
    riscoAtual = 0;
    razoes = [];
    recomendacoes = [];
}

//#REGION TRATAMENTOS
function TipoDeCarga() {
    switch (respostas["cargo_type"]) {
        case "Produtos Químicos Perigosos":
            riscoAtual = 3;
            razoes.push("Tipo de Carga, aumentou o risco em '1', por: 'Produtos Químicos Perigosos'");
            recomendacoes.push("Contratar escolta de segurança");
            return;
        case "Alimentos Perecíveis":
            riscoAtual++;
            razoes.push("Tipo de Carga, aumentou o risco em '1', por: 'Alimentos Perecíveis'");
            if (parseInt(respostas["total_distance_km"]) > 300) {
                riscoAtual++;
                razoes.push("Tipo de Carga, aumentou o risco em '1', por: 'total_distance_km' ser maior que 300");
                recomendacoes.push("Use uma carga com suporte a freezer");
            }
            return;
        case "Eletrônicos Sensíveis":
            riscoAtual++;
            razoes.push("Tipo de Carga, aumentou o risco em '1', por: 'Eletrônicos Sensíveis'");
            if (parseInt(respostas["total_cargo_value"]) > 50000) {
                riscoAtual++;
                razoes.push("Tipo de Carga, aumentou o risco em '1', por: 'total_cargo_value' ser maior que 300");
                recomendacoes.push("Contratar escolta armada");
            }
            return;
    }
}

function CondicoesClimaticas() {
    switch (respostas["route_weather_forecast"]) {
        case "Chuva Forte com Ventos":
            riscoAtual++;
            razoes.push("Condicoes Climaticas, aumentou o risco em '1', por: 'Chuva Forte com Ventos'");
            recomendacoes.push("Considere trocar a data de envio");
            return;
        case "Neve/Gelo":
            riscoAtual++;
            razoes.push("Condicoes Climaticas, aumentou o risco em '1', por: 'Neve/Gelo'");
            recomendacoes.push("Considere trocar a data de envio");
            return;
    }
}

function HistoricoDaTransportadora() {
    if (parseInt(respostas["traffic_accident_year_history"]) > 10) {
        riscoAtual += 2;
        razoes.push("Historico da Transportadora, aumentou o risco em '2', por: 'traffic_accident_year_history' ser maior que 10");
        recomendacoes.push("Re-avaliar roda de envio");
    } else if (parseInt(respostas["traffic_accident_year_history"]) > 5) {
        riscoAtual++;
        razoes["traffic_accident_year_history"] = 1;
        razoes.push("Historico da Transportadora, aumentou o risco em '1', por: 'traffic_accident_year_history' ser maior que 5");
        recomendacoes.push("Re-avaliar roda de envio");
    }
}

function ValorDaCargaSeguro() {
    if (parseInt(respostas["total_cargo_value"]) > 200000 && respostas["has_insurance"] == "false") {
        riscoAtual = 4;
        razoes.push("Valor da Carga Seguro, alterou o risco para '3', por: 'total_cargo_value' ser maior que 200000 e não ter seguro");
        recomendacoes.push("Considere comprar um seguro");
    }
}
//#ENDREGION

async function main() {
    respostas = {
        "operation_id": "OP_20250910_001",
        "origin": "São Paulo",
        "destiny": "Rio de Janeiro",
        "total_distance_km": "430",
        "cargo_type": "Produtos Químicos Perigosos",
        "total_cargo_value": "75000.50",
        "traffic_accident_year_history": "2",
        "route_weather_forecast": "Estável",
        "has_insurance": "true"
    };

    Resetar();
    TipoDeCarga();
    CondicoesClimaticas();
    HistoricoDaTransportadora();
    ValorDaCargaSeguro();

    console.log("RISCO ALTO CARGA PERIGOSA");
    console.log({
        "final_risk_score": RISCOS[riscoAtual - 1],
        "reasons": razoes,
        "recommendations": recomendacoes
    });

    await esperarEnter();

    respostas = {
        "operation_id": "OP_20250910_002",
        "origin": "Porto Alegre",
        "destiny": "Curitiba",
        "total_distance_km": '700',
        "cargo_type": "Eletrônicos Sensíveis",
        "total_cargo_value": '65000.00',
        "traffic_accident_year_history": '7',
        "route_weather_forecast": "Chuva Forte com Ventos",
        "has_insurance": 'false'
    };

    Resetar();
    TipoDeCarga();
    CondicoesClimaticas();
    HistoricoDaTransportadora();
    ValorDaCargaSeguro();

    console.log("RISCO CRITICO COM FATORES MULTIPLOS");
    console.log({
        "final_risk_score": RISCOS[riscoAtual - 1],
        "reasons": razoes,
        "recommendations": recomendacoes
    });

    await esperarEnter();
    
    respostas = {
        "operation_id": "OP_20250910_003",
        "origin": "Belo Horizonte",
        "destiny": "Salvador",
        "total_distance_km": '1500',
        "cargo_type": "Carga Geral Seca",
        "total_cargo_value": '250000.00',
        "traffic_accident_year_history": '3',
        "route_weather_forecast": "Estável",
        "has_insurance": 'false'
    };

    Resetar();
    TipoDeCarga();
    CondicoesClimaticas();
    HistoricoDaTransportadora();
    ValorDaCargaSeguro();

    console.log("RISCO CRITICO FALTA DE SEGURO");
    console.log({
        "final_risk_score": RISCOS[riscoAtual - 1],
        "reasons": razoes,
        "recommendations": recomendacoes
    });

    await esperarEnter();

    respostas = {
        "operation_id": "OP_20250910_004",
        "origin": "Joinville",
        "destiny": "Blumenau",
        "total_distance_km": 50,
        "cargo_type": "Alimentos Perecíveis",
        "total_cargo_value": 25000.00,
        "traffic_accident_year_history": 0,
        "route_weather_forecast": "Estável",
        "has_insurance": true
    };

    Resetar();
    TipoDeCarga();
    CondicoesClimaticas();
    HistoricoDaTransportadora();
    ValorDaCargaSeguro();

    console.log("RISCO BAIXO CENARIO IDEAL");
    console.log({
        "final_risk_score": RISCOS[riscoAtual - 1],
        "reasons": razoes,
        "recommendations": recomendacoes
    });

    await esperarEnter();
}

main();