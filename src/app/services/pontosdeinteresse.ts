export interface Pontodeinteresse{
    
    ponto_id?:number;
    roteiro_id:number;
    nome_local: string;
    endereco_local: string;
    custo_acesso: number;
    custo_transporte: number;
    curiosidade: string;
    sujestao: string;
    fotografia?: string;

}