interface EnergyBillParams {
    state: string;            // Estado do usuário
    kwhConsumed: number;     // Consumo em kWh
    additionalFlag: number;  // Valor adicional por kWh da bandeira tarifária
}

type StateEnergyRates = {
    [key: string]: {
        tusdRate: number;  // Tarifa TUSD
        teRate: number;    // Tarifa TE
        cosip: number;     // Valor fixo da COSIP
    };
};

export const calculateEnergyBill = ({
    state,
    kwhConsumed,
    additionalFlag,
}: EnergyBillParams): string => {
    const stateRates: StateEnergyRates = {
        "São Paulo": { tusdRate: 0.48245, teRate: 0.34009, cosip: 11.07 },
        "Rio de Janeiro": { tusdRate: 0.45000, teRate: 0.33000, cosip: 10.50 },
        "Minas Gerais": { tusdRate: 0.47000, teRate: 0.32000, cosip: 11.00 },
        "Bahia": { tusdRate: 0.55000, teRate: 0.37000, cosip: 12.00 },
        "Distrito Federal": { tusdRate: 0.47000, teRate: 0.33000, cosip: 11.50 },
        "Pernambuco": { tusdRate: 0.49500, teRate: 0.34500, cosip: 10.80 },
        "Paraná": { tusdRate: 0.44500, teRate: 0.30000, cosip: 9.90 },
        "Santa Catarina": { tusdRate: 0.43000, teRate: 0.31000, cosip: 10.20 },
        "Goiás": { tusdRate: 0.46000, teRate: 0.32000, cosip: 11.10 },
        "Amazonas": { tusdRate: 0.55000, teRate: 0.40000, cosip: 12.50 },
        "Ceará": { tusdRate: 0.46500, teRate: 0.34000, cosip: 11.30 },
        "Espírito Santo": { tusdRate: 0.44000, teRate: 0.31000, cosip: 10.60 },
        "Maranhão": { tusdRate: 0.50000, teRate: 0.33000, cosip: 11.00 },
        "Pará": { tusdRate: 0.54000, teRate: 0.38000, cosip: 12.00 },
        "Rio Grande do Sul": { tusdRate: 0.47000, teRate: 0.32000, cosip: 11.20 },
        "Alagoas": { tusdRate: 0.48000, teRate: 0.33000, cosip: 10.70 },
        "Piauí": { tusdRate: 0.46000, teRate: 0.31000, cosip: 10.90 },
        "Sergipe": { tusdRate: 0.46000, teRate: 0.32000, cosip: 10.50 },
        "Rondônia": { tusdRate: 0.55000, teRate: 0.37000, cosip: 11.80 },
        "Acre": { tusdRate: 0.56000, teRate: 0.38000, cosip: 12.00 },
        "Tocantins": { tusdRate: 0.48000, teRate: 0.33000, cosip: 10.60 },
        "Mato Grosso": { tusdRate: 0.49000, teRate: 0.34000, cosip: 11.00 },
        "Mato Grosso do Sul": { tusdRate: 0.47000, teRate: 0.32000, cosip: 10.80 },
        "Roraima": { tusdRate: 0.56000, teRate: 0.38000, cosip: 12.30 },
        "default": { tusdRate: 0.50000, teRate: 0.35000, cosip: 12.00 }, // Valores padrão
    };
    
    // Se o estado não for encontrado, usa os valores padrão
    const rates = stateRates[state] || stateRates["default"];
    
    if (kwhConsumed <= 0) {
        return "Insira um valor válido para o consumo de kWh.";
    }

    const tusdCost = rates.tusdRate * kwhConsumed;
    const teCost = rates.teRate * kwhConsumed;
    const flagCost = additionalFlag * kwhConsumed;
    const totalCost = tusdCost + teCost + flagCost + rates.cosip;

    return `- Approximate Total: R$ ${totalCost.toFixed(2)}`;

    /*
    `Detalhamento:
        - TUSD: R$ ${tusdCost.toFixed(2)}
        - TE: R$ ${teCost.toFixed(2)}
        - Adicional Bandeira: R$ ${flagCost.toFixed(2)}
        - COSIP: R$ ${rates.cosip.toFixed(2)}
        - Total: R$ ${totalCost.toFixed(2)}`;
    */
};
