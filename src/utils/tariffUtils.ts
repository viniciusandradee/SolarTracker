type StateTariffMap = {
    [key: string]: { flag: string; color: string };
};

export const getTariffFlag = (state: string): { flag: string; color: string } => {
    const tariffFlags: StateTariffMap = {
        "São Paulo": { flag: "Red", color: "#D9534F" },
        "Rio de Janeiro": { flag: "Yellow", color: "#FFB83A" },
        "Acre": { flag: "Green", color: "#5BBF6B" },
        "Alagoas": { flag: "Yellow", color: "#FFB83A" },
        "Amapá": { flag: "Yellow", color: "#FFB83A" },
        "Amazonas": { flag: "Yellow", color: "#FFB83A" },
        "Bahia": { flag: "Yellow", color: "#FFB83A" },
        "Ceará": { flag: "Yellow", color: "#FFB83A" },
        "Distrito Federal": { flag: "Yellow", color: "#FFB83A" },
        "Espírito Santo": { flag: "Yellow", color: "#FFB83A" },
        "Goiás": { flag: "Yellow", color: "#FFB83A" },
        "Maranhão": { flag: "Yellow", color: "#FFB83A" },
        "Mato Grosso": { flag: "Yellow", color: "#FFB83A" },
        "Mato Grosso do Sul": { flag: "Yellow", color: "#FFB83A" },
        "Minas Gerais": { flag: "Yellow", color: "#FFB83A" },
        "Pará": { flag: "Yellow", color: "#FFB83A" },
        "Paraíba": { flag: "Yellow", color: "#FFB83A" },
        "Paraná": { flag: "Yellow", color: "#FFB83A" },
        "Pernambuco": { flag: "Yellow", color: "#FFB83A" },
        "Piauí": { flag: "Yellow", color: "#FFB83A" },
        "Roraima": { flag: "Yellow", color: "#FFB83A" },
        "Rondônia": { flag: "Yellow", color: "#FFB83A" },
        "Rio Grande do Norte": { flag: "Yellow", color: "#FFB83A" },
        "Rio Grande do Sul": { flag: "Yellow", color: "#FFB83A" },
        "Santa Catarina": { flag: "Yellow", color: "#FFB83A" },
        "Sergipe": { flag: "Yellow", color: "#FFB83A" },
        "Tocantins": { flag: "Yellow", color: "#FFB83A" },
    };

    return tariffFlags[state] || { flag: "Unknown", color: "#000000" };
};
