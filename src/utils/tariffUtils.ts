type StateTariffMap = {
    [key: string]: string;
};

export const getTariffFlag = (state: string): string => {
    const tariffFlags: StateTariffMap = {
        "São Paulo": "Yellow",
        "Rio de Janeiro": "Yellow",
        "Acre": "Yellow",
        "Alagoas": "Yellow",
        "Amapá": "Yellow",
        "Amazonas": "Yellow",
        "Bahia": "Yellow",
        "Ceará": "Yellow",
        "Distrito Federal": "Yellow",
        "Espírito Santo": "Yellow",
        "Goiás": "Yellow",
        "Maranhão": "Yellow",
        "Mato Grosso": "Yellow",
        "Mato Grosso do Sul": "Yellow",
        "Minas Gerais": "Yellow",
        "Pará": "Yellow",
        "Paraíba": "Yellow",
        "Paraná": "Yellow",
        "Pernambuco": "Yellow",
        "Piauí": "Yellow",
        "Roraima": "Yellow",
        "Rondônia": "Yellow",
        "Rio Grande do Norte": "Yellow",
        "Rio Grande do Sul": "Yellow",
        "Santa Catarina": "Yellow",
        "Sergipe": "Yellow",
        "Tocantins": "Yellow",
    };

    return tariffFlags[state] || "Unknown";
};
